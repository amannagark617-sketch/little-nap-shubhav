type Props = {
  /** `azure` is the lightest field, `indigo` the deepest, `signature` the
   *  richest — for the hero and closing CTA only. Despite the names, every
   *  tone below is pure grayscale — no hue, per the site's no-colour brief. */
  tone?: 'azure' | 'indigo' | 'mixed' | 'signature'
  className?: string
  /** Dials the whole field up or down. */
  intensity?: 'subtle' | 'normal' | 'rich'
}

/**
 * Grayscale fields, varying by depth rather than hue.
 *
 * Glass needs *something* behind it for the blur to refract, or a panel
 * reads as a flat card. With colour off the table, that something is
 * tonal contrast: each blob is black or gray at a given opacity, so the
 * field still reads as a soft, drifting glow rather than a flat tint.
 */
const FIELDS: Record<NonNullable<Props['tone']>, string[]> = {
  azure: ['rgba(161,161,170,0.26)', 'rgba(212,212,216,0.28)', 'rgba(228,228,231,0.42)'],
  indigo: ['rgba(63,63,70,0.28)', 'rgba(24,24,27,0.18)', 'rgba(113,113,122,0.22)'],
  mixed: ['rgba(82,82,91,0.24)', 'rgba(63,63,70,0.2)', 'rgba(200,200,204,0.32)'],
  signature: ['rgba(9,9,11,0.28)', 'rgba(63,63,70,0.26)', 'rgba(161,161,170,0.26)'],
}

const OPACITY = { subtle: 'opacity-60', normal: 'opacity-90', rich: 'opacity-100' }

/**
 * The saturated, slowly drifting colour field that glass panels sit on top
 * of. Frosted glass needs real colour behind it or the blur has nothing to
 * refract and the panel reads as a flat card — this is what supplies it.
 *
 * Purely decorative: aria-hidden, pointer-events-none. Drifts for every
 * visitor regardless of prefers-reduced-motion, by deliberate choice.
 */
export default function Aurora({ tone = 'mixed', className = '', intensity = 'normal' }: Props) {
  const [a, b, c] = FIELDS[tone]
  const signature = tone === 'signature'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${OPACITY[intensity]} ${className}`}
    >
      <div
        className={`absolute -left-[15%] -top-[25%] rounded-full blur-3xl animate-drift ${
          signature ? 'h-[44rem] w-[44rem]' : 'h-[38rem] w-[38rem]'
        }`}
        style={{ background: `radial-gradient(circle, ${a}, transparent 68%)` }}
      />
      <div
        className={`absolute -right-[12%] top-[8%] rounded-full blur-3xl animate-drift-slow ${
          signature ? 'h-[40rem] w-[40rem]' : 'h-[34rem] w-[34rem]'
        }`}
        style={{ background: `radial-gradient(circle, ${b}, transparent 68%)`, animationDelay: '-8s' }}
      />
      <div
        className={`absolute bottom-[-20%] left-[25%] rounded-full blur-3xl animate-drift ${
          signature ? 'h-[38rem] w-[38rem]' : 'h-[32rem] w-[32rem]'
        }`}
        style={{ background: `radial-gradient(circle, ${c}, transparent 70%)`, animationDelay: '-16s' }}
      />
      {signature && (
        <div
          className="absolute right-[20%] bottom-[-10%] h-[26rem] w-[26rem] rounded-full blur-3xl animate-drift-slow"
          style={{
            background: 'radial-gradient(circle, rgba(9,9,11,0.24), transparent 70%)',
            animationDelay: '-22s',
          }}
        />
      )}
    </div>
  )
}
