import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

/** How long the header logo sits still before it replays on its own. */
const REPLAY_DELAY_MS = 20_000

/**
 * The client's own logo reveal clip — a genuine transparent WebM (VP9 with
 * an alpha channel), so it sits directly on the header bar with no
 * background box. Autoplays on load, replays itself automatically after a
 * pause, and replays again on demand when the logo is clicked.
 *
 * Left completely unprocessed: any re-encode/crop pass through this
 * project's ffmpeg strips the alpha channel (verified — the encoder here
 * can tag a stream "alpha_mode" without actually writing decodable alpha
 * data), so the file the client supplied ships byte-for-byte.
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const replayTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(replayTimer.current), [])

  const replay = () => {
    const video = videoRef.current
    if (!video) return
    window.clearTimeout(replayTimer.current)
    video.currentTime = 0
    video.play().catch(() => {})
  }

  const scheduleReplay = () => {
    window.clearTimeout(replayTimer.current)
    replayTimer.current = window.setTimeout(replay, REPLAY_DELAY_MS)
  }

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
        onEnded={scheduleReplay}
        onError={() => setVideoOk(false)}
        aria-label="Little Nap Subhav India Pvt. Ltd. — click to replay"
        // Shown at full size the instant transparency is confirmed; kept
        // decoding but invisible and out of flow until then. object-contain
        // shows the clip's full 1280x720 frame, not cropped to the settled
        // lockup's bounds — the animation moves elements through a much
        // wider range than that final position, including a brief
        // glitch-style flash right at the start, so a tight crop clipped
        // those earlier moments instead of just trimming empty margin.
        className={
          videoOk
            ? 'h-16 w-auto object-contain'
            : 'absolute h-px w-px overflow-hidden opacity-0'
        }
      />
    </span>
  )
}
