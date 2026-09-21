import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImage from './PlaceholderImage'
import { IconArrowRight } from './Icons'
import { campaigns } from '../data/campaigns'

const AUTO_ADVANCE_MS = 6500
/** Minimum horizontal drag, in pixels, before a swipe counts as a slide change. */
const SWIPE_THRESHOLD = 40

/**
 * The rotating promotional banner under the hero — the site's answer to the
 * campaign carousels every retail homepage runs, scoped to what an OEM
 * manufacturer actually promotes: a new range, a programme, a capability.
 *
 * Auto-advances, but stops the moment a visitor touches it (hover, focus, or
 * a drag) so it never fights someone trying to read or click through.
 * Manual control is a drag/swipe on the card itself — no arrow buttons —
 * plus the dot row for jumping straight to a slide. Fully still under
 * prefers-reduced-motion.
 */
export default function CampaignCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<number | null>(null)
  const dragRef = useRef<{ startX: number } | null>(null)

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
      className="glass relative cursor-grab overflow-hidden touch-pan-y select-none active:cursor-grabbing"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragRef.current = null
        setPaused(false)
      }}
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
          <Link to={active.href} className="group btn-primary mt-7 w-fit">
            {active.cta}
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative min-h-[14rem] lg:min-h-0">
          <PlaceholderImage
            key={active.id}
            path={active.image}
            label={`Creative, ${active.eyebrow}`}
            recommended="1400 × 1000"
            alt={active.imageAlt}
            aspect="4 / 3"
            className="h-full w-full lg:absolute lg:inset-0"
          />
        </div>
      </div>

      {/* Controls — dots only; drag/swipe the card itself to move manually. */}
      <div className="flex items-center justify-center gap-2 border-t border-white/50 px-6 py-4" role="tablist" aria-label="Choose a slide">
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
    </div>
  )
}
