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
 * Falls back to the plain static <Logo> outright when webm/vp9 isn't
 * supported (older Safari) rather than ever showing the clip without its
 * transparency — a plain video fallback here would mean a black box.
 */
export default function HeaderLogo() {
  const [supported, setSupported] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const replayTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const probe = document.createElement('video')
    if (probe.canPlayType('video/webm; codecs="vp9"')) {
      setSupported(true)
    }
  }, [])

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

  if (!supported) return <Logo />

  return (
    <span className="inline-flex h-12 w-auto cursor-pointer" onClick={replay}>
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}videos/header-logo.webm`}
        autoPlay
        muted
        playsInline
        onEnded={scheduleReplay}
        onError={() => setSupported(false)}
        aria-label="Little Nap Subhav India Pvt. Ltd. — click to replay"
        className="h-12 w-auto object-contain"
      />
    </span>
  )
}
