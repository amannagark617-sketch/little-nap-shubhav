import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  /** Plain text is split per word; a node is revealed as one unit. */
  children: ReactNode
  className?: string
  /** Milliseconds between each word. */
  stagger?: number
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'span'
}

/**
 * Reveals a headline word by word.
 *
 * Like <Reveal>, visibility is never allowed to depend on the animation: the
 * text renders immediately if motion is reduced or the observer is missing,
 * and a failsafe timer shows it regardless after two seconds.
 */
export default function SplitText({
  children,
  className = '',
  stagger = 55,
  delay = 0,
  as = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') return
    const el = ref.current
    if (!el) return

    setShown(false)
    setAnimate(true)

    const reveal = () => setShown(true)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          reveal()
          observer.unobserve(e.target)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    const failsafe = window.setTimeout(reveal, 2000)
    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  const Tag = as as 'span'

  // Only plain strings can be split; anything richer is revealed whole.
  const words = typeof children === 'string' ? children.split(' ') : null

  if (!animate || !words) {
    return (
      <Tag
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={className}
        style={
          animate
            ? {
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(20px)',
                transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
              }
            : undefined
        }
      >
        {children}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(100%)',
              transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay + i * stagger}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay + i * stagger}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
