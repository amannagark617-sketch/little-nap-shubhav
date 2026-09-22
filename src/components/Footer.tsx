import { Link } from 'react-router-dom'
import { company, openingHours } from '../data/company'
import { ranges } from '../data/products'
import { IconArrowRight, IconMail, IconPhone, IconPin } from './Icons'

const siteLinks = [
  { to: '/products', label: 'Products' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/quality', label: 'Quality' },
  { to: '/about', label: 'About us' },
  { to: '/insights', label: 'Insights' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

/**
 * A single near-black band closes the page. It is the only dark surface on
 * the site — it grounds an otherwise light layout rather than setting a dark theme.
 */
export default function Footer() {
  const { address } = company.contact
  const weekday = openingHours.find((h) => h.day === 1)!
  const sunday = openingHours.find((h) => h.day === 0)!

  return (
    <footer className="pad-quickbar relative overflow-hidden bg-ink-900 text-ink-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full
                   bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_66%)] animate-drift-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-accent-400/50 to-transparent"
      />

      <div className="container-page relative py-16 pb-[calc(4rem+var(--safe-b))] sm:py-20 sm:pb-[calc(5rem+var(--safe-b))]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <p className="font-display text-lg text-white">{company.shortName}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-300">
              {company.tagline} Engineering and manufacturing world-class motion
              furniture from Dewas, Madhya Pradesh, for brands across India and
              beyond.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1
                             text-[0.75rem] font-medium uppercase tracking-wider text-ink-300
                             backdrop-blur-sm"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-accent-300">
              Company
            </h2>
            {/* py-3 gives each link a 44px-tall tap target (HIG minimum); the
                list gap is removed so the block height stays the same. */}
            <ul className="mt-3 text-sm">
              {siteLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-block py-3 text-ink-300 transition-all duration-300
                               hover:translate-x-1 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product ranges">
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-accent-300">
              Ranges
            </h2>
            <ul className="mt-3 text-sm">
              {ranges.map((r) => (
                <li key={r.id}>
                  <Link
                    to={`/products?range=${r.id}`}
                    className="inline-block py-3 text-ink-300 transition-all duration-300
                               hover:translate-x-1 hover:text-white"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-accent-300">
              Visit &amp; contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <div>
                  <span className="block font-medium text-ink-100">{address.label}</span>
                  <address className="not-italic text-ink-300">
                    {address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-xs
                               font-semibold text-accent-300 transition-colors hover:text-accent-200"
                  >
                    Open in Google Maps
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="-my-3 inline-flex min-h-[44px] items-center text-ink-300 transition-colors hover:text-white"
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <a
                  href={`tel:${company.contact.phoneHref}`}
                  className="-my-3 inline-flex min-h-[44px] items-center text-ink-300 transition-colors hover:text-white"
                >
                  {company.contact.phone}
                </a>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-accent-300">
                Opening hours
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-300">
                Monday – Saturday · {weekday.hours}
                <br />
                Sunday · {sunday.hours}
                <br />
                <span className="text-ink-300">India Standard Time</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.registration.legalName}. All rights reserved.
          </p>
          <p className="text-ink-400">
            CIN {company.registration.cin} · GSTIN {company.registration.gstin}
          </p>
        </div>
      </div>
    </footer>
  )
}
