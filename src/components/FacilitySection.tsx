import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import Aurora from './Aurora'
import { facilityImage, facilityShots } from '../data/facility'

type Props = {
  eyebrow: string
  title: string
  lede: string
  className?: string
}

/**
 * The plant-and-showroom section.
 *
 * The photographs are supplied by the client and live outside the repository
 * (see public/images/facility/README.md). Rather than render a heading over an
 * empty grid when they are absent, the whole section probes for them first and
 * removes itself if none are there. Probing before the first paint also avoids
 * the section appearing and then collapsing.
 */
export default function FacilitySection({ eyebrow, title, lede, className = '' }: Props) {
  const [available, setAvailable] = useState<string[] | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const probe = (file: string) =>
      new Promise<string | null>((resolve) => {
        const img = new Image()
        img.onload = () => resolve(file)
        img.onerror = () => resolve(null)
        img.src = facilityImage(file)
      })

    Promise.all(facilityShots.map((s) => probe(s.file))).then((results) => {
      if (cancelled) return
      setAvailable(results.filter((f): f is string => f !== null))
    })

    return () => {
      cancelled = true
    }
  }, [])

  const shots = useMemo(
    () => (available === null ? [] : facilityShots.filter((s) => available.includes(s.file))),
    [available],
  )

  // Still probing, or nothing to show.
  if (available === null || shots.length === 0) return null

  return (
    <section className={`section relative overflow-hidden ${className}`}>
      <Aurora tone="warm" intensity="subtle" />
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
          {shots.map((shot, i) => (
            <Reveal
              as="li"
              key={shot.id}
              delay={(i % 3) * 90}
              className={`h-full ${shot.wide ? 'lg:col-span-2' : ''}`}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl
                           border border-white/60 bg-sand-100 text-left shadow-glass
                           transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-lg"
              >
                <img
                  src={facilityImage(shot.file)}
                  alt={shot.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform
                             duration-[1.2s] group-hover:scale-[1.06]"
                />
                {/* Scrim guarantees caption contrast regardless of the photo. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3
                             bg-gradient-to-t from-navy-950/85 via-navy-950/35 to-transparent"
                />
                <div className="absolute inset-x-3 bottom-3">
                  <div className="glass-dark px-4 py-3">
                    <p className="font-display text-lg leading-tight text-white">{shot.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/80">
                      {shot.caption}
                    </p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox
        items={shots.map((s) => ({
          src: facilityImage(s.file),
          title: s.title,
          caption: s.caption,
        }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </section>
  )
}
