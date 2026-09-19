import { useState } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import Aurora from './Aurora'
import { IconImage } from './Icons'
import { facilityImage, facilityShots, type FacilityShot } from '../data/facility'

type Props = {
  eyebrow: string
  title: string
  lede: string
  className?: string
}

function FacilityCard({
  shot,
  onOpen,
  onError,
}: {
  shot: FacilityShot
  onOpen: () => void
  onError: () => void
}) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl
                   border-2 border-dashed border-ink-200 bg-ink-50/50 p-6 text-center"
      >
        <IconImage className="h-7 w-7 text-ink-300" />
        <p className="font-display text-base text-ink-700">{shot.title}</p>
        <p className="text-xs leading-relaxed text-ink-400">
          Photo needed · drop the file at{' '}
          <code className="rounded bg-white/70 px-1 py-0.5 text-[0.68rem]">
            public/images/facility/{shot.file}
          </code>
        </p>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden rounded-2xl
                 border border-white/60 bg-porcelain-100 text-left shadow-glass
                 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-lg"
    >
      <img
        src={facilityImage(shot.file)}
        alt={shot.title}
        loading="lazy"
        decoding="async"
        onError={() => {
          setMissing(true)
          onError()
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform
                   duration-[1.2s] group-hover:scale-[1.06]"
      />
      {/* Scrim guarantees caption contrast regardless of the photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3
                   bg-gradient-to-t from-ink-950/85 via-ink-950/35 to-transparent"
      />
      <div className="absolute inset-x-3 bottom-3">
        <div className="glass-dark px-4 py-3">
          <p className="font-display text-lg leading-tight text-white">{shot.title}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/80">{shot.caption}</p>
        </div>
      </div>
    </button>
  )
}

/**
 * The plant-and-showroom gallery.
 *
 * Always renders. Each card tries its real photo first (see
 * public/images/facility/README.md) and falls back to a labelled placeholder
 * if that file isn't there yet — so the section reads as a real, picture-led
 * gallery from day one instead of vanishing until every photo is supplied.
 */
export default function FacilitySection({ eyebrow, title, lede, className = '' }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [missing, setMissing] = useState<Record<string, boolean>>({})

  const loaded = facilityShots.filter((s) => !missing[s.id])

  return (
    <section className={`section relative overflow-hidden ${className}`}>
      <Aurora tone="azure" intensity="subtle" />
      <div className="container-page relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h-section">{title}</h2>
            <p className="lede">{lede}</p>
          </div>
        </Reveal>

        {/* Fixed row heights keep the grid even whether a card spans one column
            or two, so a short photo never leaves a gap beside a tall one. */}
        <ul className="mt-14 grid auto-rows-[15rem] gap-5 sm:auto-rows-[17rem] sm:grid-cols-2 lg:auto-rows-[18.5rem] lg:grid-cols-3">
          {facilityShots.map((shot, i) => (
            <Reveal
              as="li"
              key={shot.id}
              delay={(i % 3) * 90}
              className={`h-full ${shot.wide ? 'lg:col-span-2' : ''}`}
            >
              <FacilityCard
                shot={shot}
                onOpen={() => setLightboxIndex(loaded.findIndex((s) => s.id === shot.id))}
                onError={() => setMissing((m) => ({ ...m, [shot.id]: true }))}
              />
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox
        items={loaded.map((s) => ({
          src: facilityImage(s.file),
          title: s.title,
          caption: s.caption,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
