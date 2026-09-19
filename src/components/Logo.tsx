import { brandImage } from '../data/factory'

type Props = {
  /** `dark` sets the wordmark for light backgrounds, `light` for dark ones. */
  tone?: 'dark' | 'light'
  className?: string
  /** Hides the wordmark, leaving only the chair mark (used in tight spaces). */
  markOnly?: boolean
}

/**
 * The corporate lockup: the chair mark lifted pixel-for-pixel from the deck
 * (public/images/brand/mark.png — untouched aside from removing its navy
 * backdrop), set beside a live wordmark.
 *
 * The deck's only full lockup (icon + wordmark together) is baked into one
 * low-resolution slide background image — rendering it at up to 24x zoom
 * confirms the type is raster, not vector, so it cannot be sharpened. Used at
 * header size it reads soft and pixelated. Setting the wordmark as real text
 * keeps it crisp at any size and legible to search engines and screen
 * readers, while the mark itself remains the authentic, unmodified asset.
 *
 * If a proper source file exists — the logo from lnsindia.co.in's own header,
 * or a vector/AI file from whoever designed it — swap it in here directly and
 * this component becomes unnecessary.
 */
export default function Logo({ tone = 'dark', className = '', markOnly = false }: Props) {
  const primary = tone === 'dark' ? 'text-ink-900' : 'text-white'
  const sub = tone === 'dark' ? 'text-ink-400' : 'text-ink-200'
  // accent-600 is the darkened, text-safe step for the light body (14.4:1
  // there). On the dark footer that same near-black accent is dark-on-dark
  // (2.3:1), so the much lighter accent-300 is used instead (6.9:1 on ink-900).
  const accent = tone === 'dark' ? 'text-accent-600' : 'text-accent-300'

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
          <span className={`font-display text-[1.35rem] font-bold leading-none ${primary}`}>
            Little <span className={accent}>Nap</span>
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
