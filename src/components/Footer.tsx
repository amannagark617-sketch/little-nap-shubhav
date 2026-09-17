import { Link } from 'react-router-dom'
import Logo from './Logo'
import { company, openingHours } from '../data/company'
import { ranges } from '../data/products'
import { IconArrowRight, IconMail, IconPhone, IconPin } from './Icons'

const siteLinks = [
  { to: '/products', label: 'Products' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/quality', label: 'Quality' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
]

/**
 * A single deep-navy band closes the page. It is the only dark surface on the
 * site — it grounds an otherwise light layout rather than setting a dark theme.
 */
export default function Footer() {
  const { address } = company.contact
  const weekday = openingHours.find((h) => h.day === 1)!
  const sunday = openingHours.find((h) => h.day === 0)!

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-navy-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full
                   bg-[radial-gradient(circle,rgba(211,163,32,0.16),transparent_66%)] animate-drift-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px
                   bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
      />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-300">
              {company.tagline} Engineering and manufacturing world-class motion
              furniture from Dewas, Madhya Pradesh — for brands across India and
              beyond.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {company.disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1
                             text-[0.68rem] font-medium uppercase tracking-wider text-navy-300
                             backdrop-blur-sm"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold-300">
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {siteLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-block text-navy-300 transition-all duration-300
                               hover:translate-x-1 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product ranges">
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold-300">
              Ranges
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {ranges.map((r) => (
                <li key={r.id}>
                  <Link
                    to={`/products?range=${r.id}`}
                    className="inline-block text-navy-300 transition-all duration-300
                               hover:translate-x-1 hover:text-white"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold-300">
              Visit &amp; contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <div>
                  <span className="block font-medium text-navy-100">{address.label}</span>
                  <address className="not-italic text-navy-300">
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
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold
                               text-gold-300 transition-colors hover:text-gold-200"
                  >
                    Open in Google Maps
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-navy-300 transition-colors hover:text-white"
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`tel:${company.contact.phoneHref}`}
                  className="text-navy-300 transition-colors hover:text-white"
                >
                  {company.contact.phone}
                </a>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-gold-300">
                Opening hours
              </p>
              <p className="mt-2 text-xs leading-relaxed text-navy-300">
                Monday – Saturday · {weekday.hours}
                <br />
                Sunday · {sunday.hours}
                <br />
                <span className="text-navy-400">India Standard Time</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs
                     text-navy-400 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p>
            This site presents manufacturing capability and product ranges. It is
            not an online store — every enquiry is quoted individually.
          </p>
        </div>
      </div>
    </footer>
  )
}
