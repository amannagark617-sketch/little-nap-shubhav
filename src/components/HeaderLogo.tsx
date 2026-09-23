import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

/** How long the header logo sits still before it replays on its own. */
const REPLAY_DELAY_MS = 20_000
/** How long the zoom-to-mark (and zoom back out) transition takes. */
const SETTLE_TRANSITION_MS = 700
/** A short beat after the clip finishes before it eases into the zoomed mark. */
const SETTLE_DELAY_MS = 350

const ALPHA_SRC = `${import.meta.env.BASE_URL}videos/header-logo.webm`
const COMPOSITED_SRC = `${import.meta.env.BASE_URL}videos/header-logo-composited.webm`

type Source = 'alpha' | 'composited'
type Phase = 'probing' | 'playing' | 'settling' | 'settled' | 'unsettling' | 'static'
type Rect = { x: number; y: number; w: number; h: number }

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

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
 *    decode (with no alpha involved) is otherwise solid. Made by rendering
 *    file 1 in a real Chromium (which decodes its alpha correctly) over a
 *    white background and capturing the composited frames — this
 *    project's own ffmpeg can't read file 1's alpha channel at all, so it
 *    never touches it; only the already-flattened frames get encoded.
 *
 * Tries file 1 first. Decides from its very first frame: draws it to an
 * offscreen canvas and checks a corner pixel's actual alpha, rather than
 * trusting `canPlayType('video/webm; codecs="vp9"')` — that check is not
 * enough, as above. If that frame isn't genuinely transparent (or the file
 * errors outright), switches this same video element over to file 2
 * instead of giving up on animation entirely. Only if file 2 also fails
 * does it fall back to the plain static <Logo>.
 *
 * Once playback ends, the zoom-to-mark effect (see component doc below for
 * why it exists) is drawn on a <canvas>, not applied to the <video> itself
 * via a CSS transform. An element with `overflow: hidden` should clip a
 * transformed child, but Safari has a long-documented bug where it
 * sometimes doesn't — confirmed on an actual iPhone even after also trying
 * clip-path and a forced stacking context, the usual workarounds for that
 * exact bug. A canvas can't have this problem: whatever is drawn to it is
 * cropped to its own pixel dimensions by definition, in every browser,
 * with no CSS clipping involved at all. The video keeps playing/pausing
 * normally throughout and is simply hidden once the canvas takes over, so
 * there's no visible seam at the swap — both are showing the identical
 * frame at that instant.
 *
 * Plays regardless of prefers-reduced-motion, by deliberate choice.
 */
export default function HeaderLogo() {
  const [source, setSource] = useState<Source>('alpha')
  const [phase, setPhase] = useState<Phase>('probing')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const replayTimer = useRef<number | undefined>(undefined)
  const settleTimer = useRef<number | undefined>(undefined)
  const rafRef = useRef<number | undefined>(undefined)
  const contentBox = useRef<Rect | null>(null)
  // The logo's on-screen box, measured once from the video while it's still
  // visible and reused for every canvas draw in a settle/unsettle cycle —
  // measuring it live would go straight to zero the instant the video
  // switches to its invisible, collapsed state, corrupting the canvas size
  // mid-transition (it settled as a small square instead of the correct
  // 16:9 shape the first time this shipped).
  const displayBox = useRef<{ width: number; height: number } | null>(null)

  useEffect(
    () => () => {
      window.clearTimeout(replayTimer.current)
      window.clearTimeout(settleTimer.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  // (Re)loads the right source whenever it changes — including the very
  // first mount, since a plain `src` attribute alone doesn't reliably kick
  // off loading a video that's still styled invisible.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    contentBox.current = null // a different clip, so any cached box is stale
    video.src = source === 'alpha' ? ALPHA_SRC : COMPOSITED_SRC
    video.load()
    video.play().catch(() => {})
  }, [source])

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
    if (phase !== 'probing') return
    if (source === 'alpha') {
      if (sampleAlpha()) setPhase('playing')
      else setSource('composited')
    } else {
      setPhase('playing')
    }
  }

  const handleError = () => {
    if (source === 'alpha') setSource('composited')
    else setPhase('static')
  }

  /** Bounding box of the mark's content in the paused final frame, in the
   *  video's own pixel coordinates — sampled on a stride since the frame
   *  is a full-size decode. "Content" means non-transparent for the real
   *  alpha clip, or simply non-white for the white-composited one. Cached
   *  per clip since it never changes once computed. */
  const findContentBox = (): Rect | null => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return null
    const w = video.videoWidth
    const h = video.videoHeight
    const isAlpha = source === 'alpha'
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

  const fullFrameRect = (): Rect | null => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return null
    return { x: 0, y: 0, w: video.videoWidth, h: video.videoHeight }
  }

  /** Draws the video, cropped to `rect` (in its own pixel coordinates), so
   *  it fills the canvas — the same maths as object-fit: contain, just
   *  cropped to a sub-region instead of the whole frame. Sized off
   *  `displayBox`, not a live measurement (see its own comment). */
  const drawCropped = (rect: Rect) => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const box = displayBox.current
    if (!video || !canvas || !box || !box.width || !box.height) return
    const dpr = window.devicePixelRatio || 1
    const cw = Math.max(1, Math.round(box.width * dpr))
    const ch = Math.max(1, Math.round(box.height * dpr))
    if (canvas.width !== cw) canvas.width = cw
    if (canvas.height !== ch) canvas.height = ch
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, cw, ch)
    try {
      ctx.drawImage(video, rect.x, rect.y, rect.w, rect.h, 0, 0, cw, ch)
    } catch {
      // Video not in a drawable state this frame — next tick tries again.
    }
  }

  const animateCrop = (from: Rect, to: Rect, onDone: () => void) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / SETTLE_TRANSITION_MS)
      const e = ease(t)
      drawCropped({
        x: from.x + (to.x - from.x) * e,
        y: from.y + (to.y - from.y) * e,
        w: from.w + (to.w - from.w) * e,
        h: from.h + (to.h - from.h) * e,
      })
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = undefined
        onDone()
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  const handleEnded = () => {
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const video = videoRef.current
      if (!video) return
      // Measured now, while still in the 'playing' phase and genuinely
      // visible — the box this settle/unsettle cycle uses throughout.
      const box = video.getBoundingClientRect()
      displayBox.current = { width: box.width, height: box.height }
      if (!contentBox.current) contentBox.current = findContentBox()
      const full = fullFrameRect()
      if (!contentBox.current || !full) return
      drawCropped(full) // seed the canvas with the current frame before the swap
      setPhase('settling')
      animateCrop(full, contentBox.current, () => setPhase('settled'))
    }, SETTLE_DELAY_MS)
    scheduleReplay()
  }

  const replay = () => {
    const video = videoRef.current
    if (!video) return
    window.clearTimeout(replayTimer.current)
    window.clearTimeout(settleTimer.current)

    const restart = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    const full = fullFrameRect()
    if (phase === 'settled' && contentBox.current && full) {
      setPhase('unsettling')
      animateCrop(contentBox.current, full, () => {
        setPhase('playing')
        restart()
      })
      return
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setPhase('playing')
    restart()
  }

  const scheduleReplay = () => {
    window.clearTimeout(replayTimer.current)
    replayTimer.current = window.setTimeout(replay, REPLAY_DELAY_MS)
  }

  const mediaActive = phase !== 'probing' && phase !== 'static'
  const canvasActive = phase === 'settling' || phase === 'settled' || phase === 'unsettling'

  return (
    <span
      className="relative inline-flex h-12 cursor-pointer items-center"
      onClick={mediaActive ? replay : undefined}
    >
      {!mediaActive && <Logo />}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        onError={handleError}
        aria-label="Little Nap Subhav India Pvt. Ltd. — click to replay"
        // Shown at full size only while actually playing; the settle/
        // unsettle zoom is drawn on the canvas below instead (see the
        // component doc for why). Kept decoding but invisible and out of
        // flow the rest of the time, never display:none, which some
        // browsers use to stop decoding a hidden video. object-contain
        // shows the clip's full frame during playback, not cropped to the
        // settled lockup's bounds — the animation moves elements through a
        // much wider range than that final position, including a brief
        // glitch-style flash right at the start, so a tight crop clipped
        // those earlier moments instead of just trimming empty margin.
        className={
          phase === 'playing' ? 'h-12 w-auto object-contain' : 'absolute h-px w-px overflow-hidden opacity-0'
        }
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={canvasActive ? 'h-12 w-auto' : 'absolute h-px w-px overflow-hidden opacity-0'}
      />
    </span>
  )
}
