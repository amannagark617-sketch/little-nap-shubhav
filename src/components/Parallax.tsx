import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Pixels of travel across the full scroll through the viewport. */
  strength?: number
  className?: string
}

/** Drifts its contents against the scroll for a shallow sense of depth. */
export default function Parallax({ children, strength = 40, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const el = ref.current
    if (!el) return

    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      // -1 when the element is just below the fold, +1 when just above it.
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      setOffset(Math.max(-1.5, Math.min(1.5, progress)) * strength)
    }

    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update)
    }

    // Only listen while the element is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) update()
      },
      { rootMargin: '100px' },
    )
    io.observe(el)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
