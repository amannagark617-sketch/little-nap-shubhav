import { useEffect, useState } from 'react'

type Props = {
  /**
   * Base filename (no extension) under public/videos/, e.g. 'hero-loop'.
   * Looks for both `${base}.mp4` (H.264, plays everywhere real browsers
   * ship) and `${base}.webm` (VP9, for the Linux/Chromium builds that skip
   * H.264 over licensing) and picks whichever this browser can decode.
   */
  videoBase: string
  /** Still photo shown as the video's poster, and as the fallback if neither video plays. */
  fallbackSrc: string
  alt: string
  className?: string
}

/**
 * A muted, looping background video with a graceful photo fallback.
 *
 * Tries the real video first (see public/videos/README.md); if neither
 * format is playable, or the file 404s, falls back to the still photo with
 * a slow, continuous zoom so the hero still reads as "in motion" until real
 * footage is supplied — no broken video tag, no static dead frame.
 *
 * Picks a single source via `canPlayType` rather than nested <source> tags:
 * React re-rendering a <video> with <source> children can transiently leave
 * it with no attached sources and fire a spurious, no-op error event, which
 * this sidesteps entirely.
 *
 * Reduced-motion visitors get the plain still photo either way: no video
 * playback, no zoom.
 */
export default function HeroMedia({ videoBase, fallbackSrc, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const base = `${import.meta.env.BASE_URL}videos/${videoBase}`
    const probe = document.createElement('video')
    if (probe.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      setSrc(`${base}.mp4`)
    } else if (probe.canPlayType('video/webm; codecs="vp9"')) {
      setSrc(`${base}.webm`)
    } else {
      setFailed(true)
    }
  }, [videoBase])

  if (!failed && !reduced && src) {
    return (
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackSrc}
        onError={() => setFailed(true)}
        className={className}
      />
    )
  }

  return (
    <img
      src={fallbackSrc}
      alt={alt}
      fetchPriority="high"
      className={`${className} ${reduced ? '' : 'animate-kenburns'}`}
    />
  )
}
