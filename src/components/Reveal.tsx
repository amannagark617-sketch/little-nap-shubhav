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
 * Fades content up — immediately on load for anything already on screen,
 * on scroll-into-view for everything below the fold.
 *
 * Content being visible is never allowed to depend on the animation working:
 *   1. It renders visible by default and only hides once JS has confirmed it
 *      can reveal it again (IntersectionObserver exists).
 *   2. Above-the-fold content animates in on mount rather than skipping the
 *      effect entirely — this is what makes the hero feel alive on load
 *      instead of popping in fully formed.
 *   3. A failsafe timer reveals anything an observer misses, so a dropped
 *      callback can never leave a section permanently blank.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const el = ref.current
    if (!el) return

    setShown(false)
    setAnimate(true)

    const reveal = () => setShown(true)

    const rect = el.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (alreadyVisible) {
      // Two rAFs: the first lets the browser paint the hidden (opacity: 0)
      // state, the second then flips it — guarantees the transition actually
      // runs instead of both states landing in the same paint.
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(reveal)
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }

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
              transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </Tag>
  )
}
