import { brandImage } from '../data/factory'

type Props = {
  /** `dark` renders the real navy/gold artwork for light backgrounds; `light`
   *  renders the same file as a white knockout for dark ones (there is no
   *  separate light-mode file, so it's produced with a CSS filter). */
  tone?: 'dark' | 'light'
  className?: string
  /** Shows only the chair mark, no wordmark (used in tight spaces). */
  markOnly?: boolean
}

/** The corporate lockup, using the client's own real artwork directly. */
export default function Logo({ tone = 'dark', className = '', markOnly = false }: Props) {
  if (markOnly) {
    return (
      <img
        src={brandImage('mark.png')}
        alt="Little Nap Subhav India Pvt. Ltd."
        width={44}
        height={44}
        className={`h-11 w-11 shrink-0 rounded-[11px] object-contain ${className}`}
      />
    )
  }

  return (
    <img
      src={brandImage('logo-full.webp')}
      alt="Little Nap Subhav India Pvt. Ltd."
      width={646}
      height={297}
      className={`h-12 w-auto object-contain ${tone === 'light' ? 'brightness-0 invert' : ''} ${className}`}
    />
  )
}
