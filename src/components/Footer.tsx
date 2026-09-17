import { Link } from 'react-router-dom'
import Logo from './Logo'
import { company } from '../data/company'
import { ranges } from '../data/products'
import { IconMail, IconPhone, IconPin } from './Icons'

const siteLinks = [
  { to: '/products', label: 'Products' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/quality', label: 'Quality' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
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
                  className="rounded-full border border-white/10 px-3 py-1 text-[0.7rem]
                             font-medium uppercase tracking-wider text-navy-300"
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
                    className="text-navy-300 transition-colors hover:text-white"
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
                    className="text-navy-300 transition-colors hover:text-white"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold-300">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="not-italic text-navy-300">
                  <span className="block font-medium text-navy-100">
                    {company.contact.address.label}
                  </span>
                  {company.contact.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
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
