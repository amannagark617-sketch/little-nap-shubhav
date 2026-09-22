import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Maximum tilt, in degrees, at the card's edge. */
  max?: number
}

const RESET: CSSProperties = {
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
  transition: 'transform 500ms cubic-bezier(.22,1,.36,1)',
}

/**
 * A pointer-tracking 3D tilt, the light-touch version of "make it 3D" — the
 * card leans toward the cursor with a soft specular highlight, rather than
 * an actual 3D scene. Pure CSS transforms, no new dependency. Does nothing
 * on touch (no sustained hover to track); plays regardless of
 * prefers-reduced-motion, by deliberate choice.
 */
export default function Tilt3D({ children, className = '', max = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>(RESET)
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * max * 2
    const rotateX = (0.5 - py) * max * 2
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`,
      transition: 'transform 80ms linear',
    })
    setGlare({ x: px * 100, y: py * 100, o: 1 })
  }

  const onLeave = () => {
    setStyle(RESET)
    setGlare((g) => ({ ...g, o: 0 }))
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={`relative ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glare.o * 0.5,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6), transparent 60%)`,
        }}
      />
    </div>
  )
}
