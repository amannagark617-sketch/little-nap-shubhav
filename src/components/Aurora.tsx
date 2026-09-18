type Props = {
  /** `azure` is the light field, `indigo` the deeper one, `signature` the
   *  richest — gold + indigo together, for the hero and closing CTA only. */
  tone?: 'azure' | 'indigo' | 'mixed' | 'signature'
  className?: string
  /** Dials the whole field up or down. */
  intensity?: 'subtle' | 'normal' | 'rich'
}

/**
 * Blue-led fields, with gold reserved for the `signature` tone.
 *
 * A warm hue washed thinly across the *entire* background does not read as
 * "a hint of gold" — it flattens into a beige off-white (this is what
 * happened before and was corrected). A warm hue concentrated in one tight,
 * heavily blurred blob is a different thing entirely: it reads as a glow,
 * not a tint, so `signature` can carry real gold saturation without ever
 * touching the porcelain body colour.
 */
const FIELDS: Record<NonNullable<Props['tone']>, string[]> = {
  azure: ['rgba(99,135,219,0.30)', 'rgba(150,178,232,0.26)', 'rgba(203,216,240,0.4)'],
  indigo: ['rgba(66,83,156,0.32)', 'rgba(21,27,83,0.16)', 'rgba(120,148,224,0.26)'],
  mixed: ['rgba(88,120,205,0.28)', 'rgba(66,83,156,0.24)', 'rgba(190,208,240,0.36)'],
  signature: ['rgba(211,163,32,0.32)', 'rgba(66,83,156,0.30)', 'rgba(150,178,232,0.30)'],
}

const OPACITY = { subtle: 'opacity-60', normal: 'opacity-90', rich: 'opacity-100' }

/**
 * The saturated, slowly drifting colour field that glass panels sit on top
 * of. Frosted glass needs real colour behind it or the blur has nothing to
 * refract and the panel reads as a flat card — this is what supplies it.
 *
 * Purely decorative: aria-hidden, pointer-events-none, and the drift stops
 * entirely under prefers-reduced-motion (the blobs still render, just static).
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
            background: 'radial-gradient(circle, rgba(211,163,32,0.24), transparent 70%)',
            animationDelay: '-22s',
          }}
        />
      )}
    </div>
  )
}
