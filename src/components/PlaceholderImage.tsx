import { useState } from 'react'
import { IconImage } from './Icons'

type Props = {
  /**
   * The real file this slot expects, e.g. 'campaigns/oem-programme.webp'.
   * Once that file exists at public/images/{path}, this component renders it
   * and the placeholder disappears — nothing else needs to change.
   */
  path: string
  /** What should go here — shown only while the placeholder is active. */
  label: string
  /** Recommended pixel dimensions, e.g. '1600 × 900'. */
  recommended: string
  alt: string
  className?: string
  /** Aspect ratio to reserve so layout never jumps once the real image lands. */
  aspect?: string
  /**
   * Whether the placeholder draws its own rounded, dashed frame. Default true
   * for a standalone slot; set false when it sits inside a card that already
   * has its own border/radius (e.g. a flat top edge) and pass that shape via
   * `className` instead — Tailwind can't reliably resolve `rounded-2xl` vs
   * `rounded-none` on the same element by class order, so this avoids the
   * fight rather than relying on one.
   */
  framed?: boolean
}

/**
 * A labelled slot for creative that does not exist yet.
 *
 * Rather than build sections around images the client hasn't supplied and
 * leave broken `<img>` tags (or invent stock photography that isn't theirs),
 * every "real photo goes here" spot in the site is one of these. It tries the
 * real file first; if that 404s, it shows a clearly-marked placeholder that
 * states exactly what to shoot and at what size — a brief, not a blemish.
 *
 * Once a designer or client drops the real file in at the stated path, this
 * component starts rendering it automatically. No code changes needed.
 */
export default function PlaceholderImage({
  path,
  label,
  recommended,
  alt,
  className = '',
  aspect = '16 / 9',
  framed = true,
}: Props) {
  const [missing, setMissing] = useState(false)
  const src = `${import.meta.env.BASE_URL}images/${path}`

  if (missing) {
    return (
      <div
        style={{ aspectRatio: aspect }}
        className={`flex flex-col items-center justify-center gap-2 border-ink-200
                    bg-ink-50/40 p-6 text-center ${
                      framed ? 'rounded-2xl border-2 border-dashed' : ''
                    } ${className}`}
      >
        <IconImage className="h-7 w-7 text-ink-300" />
        <p className="text-sm font-semibold text-ink-500">{label}</p>
        <p className="text-xs text-ink-400">
          Recommended {recommended} · drop the file at{' '}
          <code className="rounded bg-white/60 px-1 py-0.5 text-[0.7rem]">
            public/images/{path}
          </code>
        </p>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setMissing(true)}
      style={{ aspectRatio: aspect }}
      className={`object-cover ${className}`}
    />
  )
}
