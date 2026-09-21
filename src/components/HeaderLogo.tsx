import { useEffect, useState } from 'react'
import Logo from './Logo'

/**
 * The client's own logo reveal clip, played once at the top of the header on
 * every fresh page load, then left resting on its final frame (the same
 * lockup <Logo> shows). Falls back to the plain static logo outright for
 * reduced-motion visitors, and the moment playback can't happen for any
 * reason — an unsupported format, a failed load — so the header logo is
 * never at risk of coming up blank.
 */
export default function HeaderLogo() {
  const [src, setSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

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
      setFailed(true)
    }
  }, [])

  if (failed || !src) return <Logo />

  return (
    <video
      key={src}
      src={src}
      autoPlay
      muted
      playsInline
      onError={() => setFailed(true)}
      aria-label="Little Nap Subhav India Pvt. Ltd."
      className="h-12 w-auto rounded-lg border border-ink-100 object-contain"
    />
  )
}
