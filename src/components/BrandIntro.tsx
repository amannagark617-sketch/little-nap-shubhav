import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'lns.brandIntro.seen'
/** Failsafe in case the video never fires `ended` (a slow load, a stalled decode). */
const FAILSAFE_MS = 12_000

/**
 * A one-time brand reveal, the client's own logo animation, played in full
 * before the homepage appears. Shows once per session, only when landing
 * directly on the homepage, and is always skippable — it never gates access
 * to the site.
 */
export default function BrandIntro() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // Private browsing — treat as unseen for this visit, nothing to persist.
    }

    if (reduced || seen || window.location.pathname !== '/') return

    const base = `${import.meta.env.BASE_URL}videos/brand-intro`
    const probe = document.createElement('video')
    if (probe.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      setSrc(`${base}.mp4`)
    } else if (probe.canPlayType('video/webm; codecs="vp9"')) {
      setSrc(`${base}.webm`)
    } else {
      return
    }

    setVisible(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Nothing to persist to — it may play again next load, which is fine.
    }
  }, [])

  const finish = () => {
    setClosing(true)
    window.setTimeout(() => setVisible(false), 500)
  }

  useEffect(() => {
    if (!visible) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const failsafe = window.setTimeout(finish, FAILSAFE_MS)
    return () => {
      document.body.style.overflow = previous
      window.clearTimeout(failsafe)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  if (!visible || !src) return null

  return (
    <div
      role="dialog"
      aria-label="Little Nap Subhav"
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-[#d3d3d3]
                  transition-opacity duration-500 ${closing ? 'opacity-0' : 'opacity-100'}`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        onEnded={finish}
        onError={finish}
        className="h-full w-full object-contain"
      />
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 right-6 inline-flex min-h-[44px] items-center rounded-full
                   border border-ink-900/15 bg-white/70 px-5 text-sm font-semibold text-ink-700
                   backdrop-blur-sm transition-colors hover:bg-white sm:bottom-8 sm:right-8"
      >
        Skip
      </button>
    </div>
  )
}
