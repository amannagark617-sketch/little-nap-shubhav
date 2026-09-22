import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** How far this layer drifts relative to scroll distance — higher drifts more. */
  speed?: number
}

/**
 * A background layer that drifts slower than the page scrolls past it, the
 * classic depth cue for "3D-feeling" without an actual 3D scene. Reads
 * scroll position directly off the element's own position in the viewport
 * (not raw window.scrollY), so it drifts only while the element is
 * actually on screen and works no matter where on the page it sits.
 */
export default function ParallaxLayer({ children, className = '', speed = 0.25 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.parentElement?.getBoundingClientRect()
      if (!rect) return
      // Distance the section has scrolled past the viewport's vertical
      // center, so the drift is centred rather than one-directional.
      const offset = (rect.top - window.innerHeight / 2) * speed
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
