import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * The cinematic "camera pulling back" cue: a hero's content layer eases back
 * and fades as the visitor scrolls past it, rather than just disappearing
 * off the top of the screen. Pure CSS transform driven by a scroll listener
 * — no WebGL, no animation library. Pair with a slower-moving background
 * (see ParallaxLayer) for real layered depth.
 *
 * `range` is how many pixels of scroll it takes to fully recede.
 */
export function useScrollRecede<T extends HTMLElement>(range = 500) {
  const ref = useRef<T>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top / range, 0), 1)
      setStyle({
        transform: `translate3d(0, ${progress * 34}px, 0) scale(${1 - progress * 0.05})`,
        opacity: 1 - progress * 0.85,
      })
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
  }, [range])

  return { ref, style }
}
