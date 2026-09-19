import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImage from './PlaceholderImage'
import { IconArrowRight, IconChevron } from './Icons'
import { campaigns } from '../data/campaigns'

const AUTO_ADVANCE_MS = 6500

/**
 * The rotating promotional banner under the hero — the site's answer to the
 * campaign carousels every retail homepage runs, scoped to what an OEM
 * manufacturer actually promotes: a new range, a programme, a capability.
 *
 * Auto-advances, but stops the moment a visitor touches it (hover, focus, or
 * a manual arrow/dot click) so it never fights someone trying to read or
 * click through. Fully still under prefers-reduced-motion.
 */
export default function CampaignCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  const go = useCallback((next: number) => {
    setIndex(((next % campaigns.length) + campaigns.length) % campaigns.length)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || paused) return
    timerRef.current = window.setInterval(() => go(index + 1), AUTO_ADVANCE_MS)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [index, paused, go])

  const active = campaigns[index]

  return (
    <div
      className="glass relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured programmes and ranges"
    >
      <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <p className="eyebrow">{active.eyebrow}</p>
          <h3 className="mt-4 font-display text-2xl text-ink-900 sm:text-3xl">{active.title}</h3>
          <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-500">
            {active.body}
          </p>
          <Link to={active.href} className="btn-primary mt-7 w-fit">
            {active.cta}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative min-h-[14rem] lg:min-h-0">
          <PlaceholderImage
            key={active.id}
            path={active.image}
            label={`Creative — ${active.eyebrow}`}
            recommended="1400 × 1000"
            alt={active.imageAlt}
            aspect="4 / 3"
            className="h-full w-full lg:absolute lg:inset-0"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 border-t border-white/50 px-6 py-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a slide">
          {campaigns.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide: ${c.title}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-accent-500' : 'w-2 bg-ink-200 hover:bg-ink-300'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                       border-ink-200/70 text-ink-600 transition-colors hover:bg-white"
          >
            <IconChevron className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                       border-ink-200/70 text-ink-600 transition-colors hover:bg-white"
          >
            <IconChevron className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
