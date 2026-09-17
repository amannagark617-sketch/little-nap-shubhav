import { useState } from 'react'
import { company, openingHours } from '../data/company'
import OpenStatus, { useOpenState } from './OpenStatus'
import { IconArrowRight, IconPhone, IconPin } from './Icons'

type Props = {
  /** `full` adds the hours table alongside the map. */
  variant?: 'full' | 'compact'
}

/**
 * Where to find the plant.
 *
 * The map is Google's keyless embed, so there is no Maps API key or billing to
 * manage. Embeds can be blocked by a corporate network or a strict privacy
 * extension, so the iframe sits on top of a styled panel that already carries
 * the address and the directions button — if the frame never paints, the card
 * still reads as intentional rather than broken.
 */
export default function MapPanel({ variant = 'full' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const { today } = useOpenState()
  const { address } = company.contact

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      {/* ---- Map ---- */}
      <div className="glass overflow-hidden p-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-200 sm:aspect-[16/10]">
          {/* Fallback content, covered by the iframe once it paints. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <IconPin className="h-8 w-8 text-gold-500" />
            <p className="font-display text-lg text-navy-800">{address.name}</p>
            <p className="max-w-xs text-sm leading-relaxed text-navy-500">{address.full}</p>
            {!loaded && (
              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass mt-1 text-xs"
              >
                Open in Google Maps
              </a>
            )}
          </div>

          <iframe
            title={`Map showing ${address.name}`}
            src={address.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            allowFullScreen
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 px-3 py-3">
          <a
            href={address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            Get directions
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href={address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass text-xs"
          >
            View on Google Maps
          </a>
        </div>
      </div>

      {/* ---- Address, hours, phone ---- */}
      <div className="glass flex flex-col p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-xl text-navy-900">Visit the plant</h3>
          <OpenStatus />
        </div>

        <address className="mt-5 not-italic leading-relaxed text-navy-600">
          {address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>

        <a
          href={`tel:${company.contact.phoneHref}`}
          className="mt-5 inline-flex items-center gap-2.5 text-sm font-semibold text-navy-800
                     transition-colors hover:text-gold-600"
        >
          <IconPhone className="h-4 w-4 text-gold-500" />
          {company.contact.phone}
        </a>

        {variant === 'full' && (
          <div className="mt-7 border-t border-navy-100 pt-5">
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-400">
              Opening hours
            </h4>
            <dl className="mt-3 space-y-1.5">
              {openingHours.map((h) => {
                const isToday = today?.day === h.day
                return (
                  <div
                    key={h.label}
                    className={`flex items-center justify-between gap-4 rounded-lg px-2.5 py-1.5 text-sm ${
                      isToday ? 'bg-gold-50 font-semibold text-navy-900' : 'text-navy-500'
                    }`}
                  >
                    <dt>
                      {h.label}
                      {isToday && <span className="ml-2 text-[0.65rem] text-gold-600">TODAY</span>}
                    </dt>
                    <dd className={h.hours === 'Closed' ? 'text-navy-300' : ''}>{h.hours}</dd>
                  </div>
                )
              })}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-navy-400">
              Times are India Standard Time. We host buyers and technical teams —
              please arrange a visit in advance so the right people are on site.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
