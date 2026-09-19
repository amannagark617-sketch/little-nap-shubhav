import { useCallback, useEffect, useRef, useState } from 'react'
import { factoryImage, processSteps } from '../data/factory'

const AUTO_ADVANCE_MS = 4200
/** Minimum horizontal drag, in pixels, before a swipe counts as a slide change. */
const SWIPE_THRESHOLD = 40

/**
 * A cinematic, auto-advancing pass through the real production floor — one
 * process photo at a time, the same twelve real stages <Manufacturing> walks
 * through in detail. This is the homepage's "watch it happen" moment: full-
 * bleed photography rather than the grid of <FacilitySection>.
 *
 * Same interaction contract as <CampaignCarousel>: auto-advances, pauses on
 * hover/focus/drag, and holds still under prefers-reduced-motion. Manual
 * control is a drag/swipe on the photo itself — no arrow buttons — plus the
 * dot row for jumping straight to a stage.
 */
export default function ProcessSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragRef = useRef<{ startX: number } | null>(null)

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

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX }
    setPaused(true)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragRef.current) {
      const delta = e.clientX - dragRef.current.startX
      dragRef.current = null
      if (Math.abs(delta) > SWIPE_THRESHOLD) go(index + (delta < 0 ? 1 : -1))
    }
    setPaused(false)
  }

  return (
    <div
      className="glass-strong relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Inside the plant, the production process"
    >
      <div
        className="relative h-[22rem] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[28rem] lg:h-[32rem]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragRef.current = null
          setPaused(false)
        }}
      >
        <img
          key={active.id}
          src={factoryImage(active.image)}
          alt={active.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full animate-fade-in object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3
                     bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent"
        />

        <div className="pointer-events-none absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Stage {index + 1} of {processSteps.length} · {active.stage}
          </p>
          <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">{active.name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {active.body}
          </p>
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
