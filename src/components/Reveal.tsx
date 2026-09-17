import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Nothing stays hidden longer than this, whatever the observer does. */
const FAILSAFE_MS = 2000

/**
 * Fades content up the first time it scrolls into view.
 *
 * Content being visible is never allowed to depend on the animation working.
 * Three guarantees, in order:
 *   1. It renders visible and only hides once we know an observer is attached.
 *   2. Anything already within the viewport on mount is shown immediately —
 *      above-the-fold content never waits for a scroll event.
 *   3. A failsafe timer reveals anything the observer has not reported, so a
 *      missed callback (fast scrolling, an odd browser) can never leave a
 *      section permanently blank.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') return

    const el = ref.current
    if (!el) return

    // Already on screen — show it now, no animation, no observer.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    setShown(false)
    setAnimate(true)

    const reveal = () => setShown(true)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)

    const failsafe = window.setTimeout(reveal, FAILSAFE_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={
        animate
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(18px)',
              transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </Tag>
  )
}
