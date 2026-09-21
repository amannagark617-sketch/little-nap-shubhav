import { useEffect, useState } from 'react'
import Logo from './Logo'

/**
 * The client's own logo reveal clip, played once at the top of the header on
 * every fresh page load. The clip's own background is a light gray, visibly
 * boxy against the header's white bar, so the moment it finishes playing —
 * or fails to play at all — this swaps over to the plain static <Logo>,
 * which has a real transparent background. The video is only ever the
 * transient few seconds before that; the resting state is always the clean
 * static lockup, never a frozen video frame.
 */
export default function HeaderLogo() {
  const [src, setSrc] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const base = `${import.meta.env.BASE_URL}videos/header-logo`
    const probe = document.createElement('video')
    if (probe.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      setSrc(`${base}.mp4`)
    } else if (probe.canPlayType('video/webm; codecs="vp9"')) {
      setSrc(`${base}.webm`)
    } else {
      setDone(true)
    }
  }, [])

  if (!src) return <Logo />

  return (
    <span className="relative inline-flex h-12 w-auto">
      <Logo className={`transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`} />
      <video
        src={src}
        autoPlay
        muted
        playsInline
        onEnded={() => setDone(true)}
        onError={() => setDone(true)}
        aria-label="Little Nap Subhav India Pvt. Ltd."
        className={`absolute inset-0 h-12 w-auto object-contain transition-opacity duration-500 ${
          done ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      />
    </span>
  )
}
