import { useEffect, useRef, useState } from 'react'

type Props = {
  to: number
  suffix?: string
  /** Duration of the count-up in milliseconds. */
  duration?: number
  className?: string
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/** Counts up to `to` the first time it becomes visible. */
export default function Counter({ to, suffix = '', duration = 1600, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)
  const started = useRef(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const el = ref.current
    if (!el) return

    setValue(0)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue
          started.current = true
          observer.unobserve(entry.target)

          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)
            setValue(Math.round(easeOut(progress) * to))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
