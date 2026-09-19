import { useCallback, useEffect, useState } from 'react'
import { IconChevron } from './Icons'
import { factoryImage, processSteps } from '../data/factory'

const AUTO_ADVANCE_MS = 4200

/**
 * A cinematic, auto-advancing pass through the real production floor — one
 * process photo at a time, the same twelve real stages <Manufacturing> walks
 * through in detail. This is the homepage's "watch it happen" moment: full-
 * bleed photography rather than the grid of <FacilitySection>.
 *
 * Same interaction contract as <CampaignCarousel>: auto-advances, pauses on
 * hover/focus/manual interaction, and holds still under prefers-reduced-motion.
 */
export default function ProcessSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((next: number) => {
    setIndex(((next % processSteps.length) + processSteps.length) % processSteps.length)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || paused) return
    const id = window.setInterval(() => go(index + 1), AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [index, paused, go])

  const active = processSteps[index]

  return (
    <div
      className="glass-strong relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Inside the plant — the production process"
    >
      <div className="relative h-[22rem] sm:h-[28rem] lg:h-[32rem]">
        <img
          key={active.id}
          src={factoryImage(active.image)}
          alt={active.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full animate-fade-in object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3
                     bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent"
        />

        <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Stage {index + 1} of {processSteps.length} · {active.stage}
          </p>
          <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">{active.name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {active.body}
          </p>
        </div>

        <div className="absolute right-6 top-6 flex items-center gap-1.5 sm:right-10 sm:top-8">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous stage"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                       border-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <IconChevron className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next stage"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                       border-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <IconChevron className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="no-scrollbar flex items-center gap-1.5 overflow-x-auto px-6 py-4 sm:px-10"
        role="tablist"
        aria-label="Choose a stage"
      >
        {processSteps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show stage: ${step.name}`}
            onClick={() => go(i)}
            className={`h-1.5 shrink-0 rounded-full transition-all duration-300 ${
              i === index ? 'w-7 bg-ink-900' : 'w-3 bg-ink-200 hover:bg-ink-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
