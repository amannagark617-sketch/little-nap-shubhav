type Props = {
  /** `warm` leans gold and sand, `cool` leans navy. */
  tone?: 'warm' | 'cool' | 'mixed'
  className?: string
  /** Dials the whole field up or down. */
  intensity?: 'subtle' | 'normal' | 'rich'
}

const FIELDS = {
  warm: ['rgba(211,163,32,0.20)', 'rgba(230,194,88,0.16)', 'rgba(242,229,199,0.34)'],
  cool: ['rgba(78,92,156,0.16)', 'rgba(21,27,83,0.10)', 'rgba(211,163,32,0.12)'],
  mixed: ['rgba(211,163,32,0.18)', 'rgba(78,92,156,0.14)', 'rgba(242,229,199,0.30)'],
}

const OPACITY = { subtle: 'opacity-50', normal: 'opacity-80', rich: 'opacity-100' }

/**
 * The soft, slowly drifting colour field that glass panels sit on top of.
 *
 * Frosted glass needs something behind it or the blur has nothing to work
 * with and the panel just reads as flat grey. This paints that something —
 * three large blurred radial gradients, animated out of phase.
 *
 * Purely decorative: aria-hidden, pointer-events-none, and the drift stops
 * entirely under prefers-reduced-motion.
 */
export default function Aurora({ tone = 'mixed', className = '', intensity = 'normal' }: Props) {
  const [a, b, c] = FIELDS[tone]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${OPACITY[intensity]} ${className}`}
    >
      <div
        className="absolute -left-[15%] -top-[25%] h-[38rem] w-[38rem] rounded-full blur-3xl animate-drift"
        style={{ background: `radial-gradient(circle, ${a}, transparent 68%)` }}
      />
      <div
        className="absolute -right-[12%] top-[8%] h-[34rem] w-[34rem] rounded-full blur-3xl animate-drift-slow"
        style={{ background: `radial-gradient(circle, ${b}, transparent 68%)`, animationDelay: '-8s' }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[32rem] w-[32rem] rounded-full blur-3xl animate-drift"
        style={{ background: `radial-gradient(circle, ${c}, transparent 70%)`, animationDelay: '-16s' }}
      />
    </div>
  )
}
