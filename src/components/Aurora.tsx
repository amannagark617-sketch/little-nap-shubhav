type Props = {
  /** `azure` is the light field, `indigo` the deeper one. */
  tone?: 'azure' | 'indigo' | 'mixed'
  className?: string
  /** Dials the whole field up or down. */
  intensity?: 'subtle' | 'normal' | 'rich'
}

/**
 * Every field is cool — blue channel at or above red.
 *
 * This matters more than it looks: a warm hue at low alpha over white does not
 * read as "a hint of gold", it flattens into a beige off-white. Gold therefore
 * stays a sharp accent (type, icons, rules, buttons) and never a diffuse wash,
 * so the background can never drift into that family.
 */
const FIELDS = {
  azure: ['rgba(122,152,221,0.15)', 'rgba(163,188,236,0.14)', 'rgba(203,216,240,0.34)'],
  indigo: ['rgba(78,92,156,0.16)', 'rgba(21,27,83,0.09)', 'rgba(138,164,224,0.16)'],
  mixed: ['rgba(100,130,205,0.14)', 'rgba(78,92,156,0.13)', 'rgba(198,213,240,0.30)'],
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
