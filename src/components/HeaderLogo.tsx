import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Logo from './Logo'

/** How long the header logo sits still before it replays on its own. */
const REPLAY_DELAY_MS = 20_000
/** How long the zoom-to-mark (and zoom back out) transition takes. */
const SETTLE_TRANSITION_MS = 700
/** A short beat after the clip finishes before it eases into the zoomed mark. */
const SETTLE_DELAY_MS = 350

const ALPHA_SRC = `${import.meta.env.BASE_URL}videos/header-logo.webm`
const COMPOSITED_SRC = `${import.meta.env.BASE_URL}videos/header-logo-composited.webm`

type Phase = 'probe-alpha' | 'probe-composited' | 'alpha' | 'composited' | 'static'
type ContentBox = { x: number; y: number; w: number; h: number }

/**
 * The client's own logo reveal clip. There are two versions of it:
 *
 * 1. `header-logo.webm` — the original, genuinely transparent (VP9 with an
 *    alpha channel), untouched: any re-encode/crop pass through this
 *    project's ffmpeg strips the alpha channel (verified — the encoder here
 *    can tag a stream "alpha_mode" without actually writing decodable alpha
 *    data), so this file ships byte-for-byte as supplied. Sits directly on
 *    the header with no background box, on any browser that actually
 *    renders VP9 alpha.
 * 2. `header-logo-composited.webm` — the same animation, but with every
 *    transparent pixel replaced by solid white to match the header's own
 *    background, and encoded as an ordinary opaque VP9 file (no alpha
 *    channel at all this time). This is for browsers that decode file 1's
 *    format but not its transparency — recent iOS/Safari (and everything
 *    on iOS is forced onto WebKit underneath, even Chrome there) can play
 *    file 1 and still composite it fully opaque, which showed up as a
 *    solid black box behind the logo, even though Safari's plain VP9
 *    decode (with no alpha involved) is otherwise solid. Real device
 *    testing is what caught the alpha gap — `canPlayType` and even a
 *    decoded frame both looked fine in this environment's own tooling,
 *    which doesn't reproduce it. Made by rendering file 1 in a real
 *    Chromium (which decodes its alpha correctly) over a white background
 *    and capturing the composited frames — this project's own ffmpeg can't
 *    read file 1's alpha channel at all, so it never touches it; only the
 *    already-flattened frames get encoded.
 *
 * Tries file 1 first. Decides from its very first frame: draws it to an
 * offscreen canvas and checks a corner pixel's actual alpha, rather than
 * trusting `canPlayType('video/webm; codecs="vp9"')` — that check is not
 * enough, as above. If that frame isn't genuinely transparent (or the file
 * errors outright), switches this same video element over to file 2
 * instead of giving up on animation entirely. Only if file 2 also fails
 * does it fall back to the plain static <Logo>.
 *
 * Whichever file ends up playing, once it finishes, a CSS transform
 * smoothly zooms the still-paused video in on just the mark (found by
 * scanning the paused final frame for its content's bounding box), so it
 * reads like a proper right-sized logo rather than a small shape adrift in
 * a wide frame. Replaying — by click or the automatic timer — eases back
 * out to the full frame first, then restarts the clip, so every cycle runs
 * the same wide-to-settled transition.
 *
 * Plays regardless of prefers-reduced-motion, by deliberate choice.
 */
export default function HeaderLogo() {
  const [phase, setPhase] = useState<Phase>('probe-alpha')
  const [transform, setTransform] = useState('none')
  const videoRef = useRef<HTMLVideoElement>(null)
  const replayTimer = useRef<number | undefined>(undefined)
  const settleTimer = useRef<number | undefined>(undefined)
  const restartTimer = useRef<number | undefined>(undefined)
  const contentBox = useRef<ContentBox | null>(null)

  useEffect(
    () => () => {
      window.clearTimeout(replayTimer.current)
      window.clearTimeout(settleTimer.current)
      window.clearTimeout(restartTimer.current)
    },
    [],
  )

  // (Re)loads the right source whenever a probe stage begins — including
  // the very first mount, since a plain `src` attribute alone doesn't
  // reliably kick off loading a video that's still styled invisible.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (phase === 'probe-alpha') {
      video.src = ALPHA_SRC
    } else if (phase === 'probe-composited') {
      contentBox.current = null // a different clip, so any cached box is stale
      video.src = COMPOSITED_SRC
    } else {
      return
    }
    video.load()
    video.play().catch(() => {})
  }, [phase])

  const sampleAlpha = () => {
    const video = videoRef.current
    if (!video) return false
    try {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 1
      canvas.height = video.videoHeight || 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return false
      ctx.drawImage(video, 0, 0)
      const [, , , alpha] = ctx.getImageData(0, 0, 1, 1).data
      return alpha < 250
    } catch {
      return false
    }
  }

  const handleLoadedData = () => {
    if (phase === 'probe-alpha') {
      setPhase(sampleAlpha() ? 'alpha' : 'probe-composited')
    } else if (phase === 'probe-composited') {
      setPhase('composited')
    }
  }

  const handleError = () => {
    setPhase((p) => (p === 'probe-composited' || p === 'composited' ? 'static' : 'probe-composited'))
  }

  /** Bounding box of the mark's content in the paused final frame, in the
   *  video's own pixel coordinates — sampled on a stride since the frame
   *  is a full-size decode. "Content" means non-transparent for the real
   *  alpha clip, or simply non-white for the white-composited one. Cached
   *  per clip since it never changes once computed. */
  const findContentBox = (): ContentBox | null => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return null
    const w = video.videoWidth
    const h = video.videoHeight
    const isAlpha = phase === 'alpha'
    try {
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return null
      ctx.drawImage(video, 0, 0)
      const { data } = ctx.getImageData(0, 0, w, h)
      const stride = 3
      let minX = w
      let minY = h
      let maxX = 0
      let maxY = 0
      let found = false
      for (let y = 0; y < h; y += stride) {
        for (let x = 0; x < w; x += stride) {
          const i = (y * w + x) * 4
          const isContent = isAlpha
            ? data[i + 3] > 20
            : data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250
          if (isContent) {
            found = true
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }
      return found ? { x: minX, y: minY, w: Math.max(1, maxX - minX), h: Math.max(1, maxY - minY) } : null
    } catch {
      return null
    }
  }

  /** The CSS transform that zooms the displayed box in on `box`, keeping it
   *  centred (the same maths as object-fit: contain, just cropped to a
   *  sub-region instead of the whole frame). */
  const settleTransformFor = (box: ContentBox) => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return 'none'
    const rect = video.getBoundingClientRect()
    if (!rect.width || !rect.height) return 'none'
    const k = rect.height / video.videoHeight
    const scale = Math.min(rect.width / (box.w * k), rect.height / (box.h * k))
    const tx = (rect.width - box.w * k * scale) / 2 - box.x * k * scale
    const ty = (rect.height - box.h * k * scale) / 2 - box.y * k * scale
    return `translate(${tx}px, ${ty}px) scale(${scale})`
  }

  const goSettled = () => {
    if (!contentBox.current) contentBox.current = findContentBox()
    if (!contentBox.current) return
    setTransform(settleTransformFor(contentBox.current))
  }

  const handleEnded = () => {
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(goSettled, SETTLE_DELAY_MS)
    scheduleReplay()
  }

  const replay = () => {
    const video = videoRef.current
    if (!video) return
    window.clearTimeout(replayTimer.current)
    window.clearTimeout(settleTimer.current)
    window.clearTimeout(restartTimer.current)
    setTransform('none')
    restartTimer.current = window.setTimeout(() => {
      video.currentTime = 0
      video.play().catch(() => {})
    }, SETTLE_TRANSITION_MS)
  }

  const scheduleReplay = () => {
    window.clearTimeout(replayTimer.current)
    replayTimer.current = window.setTimeout(replay, REPLAY_DELAY_MS)
  }

  const visible = phase === 'alpha' || phase === 'composited'

  const videoStyle: CSSProperties | undefined = visible
    ? {
        transform,
        transformOrigin: '0 0',
        transition: `transform ${SETTLE_TRANSITION_MS}ms cubic-bezier(.22,1,.36,1)`,
      }
    : undefined

  return (
    // clipPath (not just overflow-hidden) clips the zoomed video to this
    // box: WebKit has a long-documented bug where overflow-hidden alone
    // doesn't reliably clip a transformed child, which let the settled
    // zoom spill out over whatever sat below the header on a real iPhone
    // despite clipping correctly in every other engine tested.
    <span
      className="relative inline-flex h-16 cursor-pointer items-center overflow-hidden"
      style={{ clipPath: 'inset(0)', isolation: 'isolate' }}
      onClick={visible ? replay : undefined}
    >
      {!visible && <Logo />}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        onError={handleError}
        aria-label="Little Nap Subhav India Pvt. Ltd. — click to replay"
        style={videoStyle}
        // Shown at full size once a playable source is confirmed; kept
        // decoding but invisible and out of flow until then. object-contain
        // shows the clip's full frame during playback, not cropped to the
        // settled lockup's bounds — the animation moves elements through a
        // much wider range than that final position, including a brief
        // glitch-style flash right at the start, so a tight crop clipped
        // those earlier moments instead of just trimming empty margin. The
        // zoom-in only ever applies after playback ends.
        className={visible ? 'h-16 w-auto object-contain' : 'absolute h-px w-px overflow-hidden opacity-0'}
      />
    </span>
  )
}
