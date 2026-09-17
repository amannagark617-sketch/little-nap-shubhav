import { brandImage } from '../data/factory'

type Props = {
  /** `dark` sets the wordmark for light backgrounds, `light` for navy ones. */
  tone?: 'dark' | 'light'
  className?: string
  /** Hides the wordmark, leaving only the chair mark (used in tight spaces). */
  markOnly?: boolean
}

/**
 * The corporate lockup: the chair mark lifted from the deck, set beside a live
 * wordmark. Keeping the type as text rather than baking it into the image means
 * it stays sharp at every size and is readable by search engines.
 */
export default function Logo({ tone = 'dark', className = '', markOnly = false }: Props) {
  const primary = tone === 'dark' ? 'text-navy-900' : 'text-white'
  const sub = tone === 'dark' ? 'text-navy-400' : 'text-navy-200'

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={brandImage('mark.png')}
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-[11px] object-contain"
      />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.35rem] font-semibold leading-none ${primary}`}>
            Little <span className="text-gold-400">Nap</span>
          </span>
          <span
            className={`mt-1 text-[0.58rem] font-semibold uppercase leading-none tracking-[0.19em] ${sub}`}
          >
            Subhav India Pvt. Ltd.
          </span>
        </span>
      )}
    </span>
  )
}
