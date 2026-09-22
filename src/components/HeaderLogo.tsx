import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Logo from './Logo'

/** How long the header logo sits still before it replays on its own. */
const REPLAY_DELAY_MS = 20_000
/** How long the zoom-to-mark (and zoom back out) transition takes. */
const SETTLE_TRANSITION_MS = 700
/** A short beat after the clip finishes before it eases into the zoomed mark. */
const SETTLE_DELAY_MS = 350

type ContentBox = { x: number; y: number; w: number; h: number }

/**
 * The client's own logo reveal clip — a genuine transparent WebM (VP9 with
 * an alpha channel), so it sits directly on the header bar with no
 * background box. Autoplays on load, replays itself automatically after a
 * pause, and replays again on demand when the logo is clicked.
 *
 * Left completely unprocessed: any re-encode/crop pass through this
 * project's ffmpeg strips the alpha channel (verified — the encoder here
 * can tag a stream "alpha_mode" without actually writing decodable alpha
 * data), so the file the client supplied ships byte-for-byte. That rules
 * out trimming the clip's own footage to make its settled mark read bigger
 * — instead, once the clip finishes playing, a CSS transform smoothly
 * zooms the still-paused video in on just the mark (found by scanning its
 * last frame's alpha channel for the bounding box of non-transparent
 * pixels), so it reads like a proper static logo rather than a small
 * shape adrift in a wide frame. Replaying — by click or on the automatic
 * timer — eases back out to the full frame first, then restarts the clip,
 * so the wide-to-settled transition always runs the same way.
 *
 * The static <Logo> is what every visitor sees first. The clip loads
 * invisibly alongside it (opacity: 0, out of layout flow — never
 * display:none, which some browsers use to stop decoding a hidden video)
 * and only swaps in once its first real frame proves genuinely
 * transparent: draws that frame to an offscreen canvas and checks a
 * corner pixel's alpha channel, rather than trusting
 * `canPlayType('video/webm; codecs="vp9"')`. That check is not enough —
 * recent iOS/Safari can decode this exact file, report it playable, and
 * still composite it fully opaque, since WebKit has never rendered VP9
 * alpha. Testing the actual decoded pixels is what catches that instead
 * of showing a black box behind the logo. If it never proves transparent
 * (or errors, or the format isn't supported at all), the static logo just
 * keeps showing — one video element, one fetch, either way.
 *
 * Plays regardless of prefers-reduced-motion, by deliberate choice.
 */
export default function HeaderLogo() {
  const [videoOk, setVideoOk] = useState(false)
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

  const checkAlpha = () => {
    const video = videoRef.current
    if (!video) return
    try {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 1
      canvas.height = video.videoHeight || 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(video, 0, 0)
      const [, , , alpha] = ctx.getImageData(0, 0, 1, 1).data
      if (alpha < 250) setVideoOk(true)
    } catch {
      // Stays on the static logo.
    }
  }

  /** Bounding box of the mark's non-transparent pixels in the paused final
   *  frame, in the video's own pixel coordinates — sampled on a stride
   *  since the frame is a full 1280x720. Computed once and cached. */
  const findContentBox = (): ContentBox | null => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return null
    const w = video.videoWidth
    const h = video.videoHeight
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
          if (data[(y * w + x) * 4 + 3] > 20) {
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

  const videoStyle: CSSProperties | undefined = videoOk
    ? {
        transform,
        transformOrigin: '0 0',
        transition: `transform ${SETTLE_TRANSITION_MS}ms cubic-bezier(.22,1,.36,1)`,
      }
    : undefined

  return (
    <span className="relative inline-flex h-16 cursor-pointer items-center" onClick={videoOk ? replay : undefined}>
      {!videoOk && <Logo />}
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}videos/header-logo.webm`}
        autoPlay
        muted
        playsInline
        onLoadedData={checkAlpha}
        onEnded={handleEnded}
        onError={() => setVideoOk(false)}
        aria-label="Little Nap Subhav India Pvt. Ltd. — click to replay"
        style={videoStyle}
        // Shown at full size the instant transparency is confirmed; kept
        // decoding but invisible and out of flow until then. object-contain
        // shows the clip's full 1280x720 frame during playback, not cropped
        // to the settled lockup's bounds — the animation moves elements
        // through a much wider range than that final position, including a
        // brief glitch-style flash right at the start, so a tight crop
        // clipped those earlier moments instead of just trimming empty
        // margin. The zoom-in only ever applies after playback ends.
        className={
          videoOk
            ? 'h-16 w-auto object-contain'
            : 'absolute h-px w-px overflow-hidden opacity-0'
        }
      />
    </span>
  )
}
