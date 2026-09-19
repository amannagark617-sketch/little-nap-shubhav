import { useEffect, useState } from 'react'

type Props = {
  /** Filename under public/videos/, e.g. 'hero-loop.mp4'. */
  videoFile: string
  /** Still photo shown as the video's poster, and as the fallback if the video is missing. */
  fallbackSrc: string
  alt: string
  className?: string
}

/**
 * A muted, looping background video with a graceful photo fallback.
 *
 * Tries the real video first (see public/videos/README.md); if it 404s, or
 * the browser can't play it, falls back to the still photo with a slow,
 * continuous zoom so the hero still reads as "in motion" until real footage
 * is supplied — no broken video tag, no static dead frame.
 *
 * Reduced-motion visitors get the plain still photo either way: no video
 * playback, no zoom.
 */
export default function HeroMedia({ videoFile, fallbackSrc, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (!failed && !reduced) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackSrc}
        onError={() => setFailed(true)}
        className={className}
      >
        <source src={`${import.meta.env.BASE_URL}videos/${videoFile}`} type="video/mp4" />
      </video>
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
