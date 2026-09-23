import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import HeaderLogo from './HeaderLogo'
import {
  IconClose,
  IconMenu,
  IconArrowRight,
  IconPhone,
  IconPin,
  IconNewspaper,
  IconClipboard,
  IconSofa,
  IconFactory,
  IconShield,
  IconPeople,
  IconMail,
} from './Icons'
import { useEnquiry } from '../context/EnquiryContext'
import { company } from '../data/company'

const nav = [
  { to: '/products', label: 'Products', icon: IconSofa },
  { to: '/manufacturing', label: 'Manufacturing', icon: IconFactory },
  { to: '/quality', label: 'Quality', icon: IconShield },
  { to: '/about', label: 'About', icon: IconPeople },
  { to: '/contact', label: 'Contact', icon: IconMail },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, open } = useEnquiry()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]
                   focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm
                   focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        // Fully opaque, not translucent — a blurred, semi-see-through bar
        // let whatever photo was scrolled underneath tint it, which never
        // quite matched the logo canvas's own solid white background and
        // showed up as a visible box around it on a real phone.
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white
                    transition-shadow duration-300 ${
                      scrolled ? 'border-ink-100 shadow-sm' : 'border-ink-100/60'
                    }`}
        style={{ paddingTop: 'var(--safe-t)' }}
      >
        {/* ---- Utility bar: call, directions, blog ---- */}
        <div
          className="hidden items-center justify-end gap-1 bg-ink-900 px-3 text-ink-300 md:flex"
          style={{ height: 'var(--utility-h)' }}
        >
          <a
            href={`tel:${company.contact.phoneHref}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                       transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconPhone className="h-3.5 w-3.5" />
            {company.contact.phone}
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />
          <a
            href={company.contact.address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                       transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconPin className="h-3.5 w-3.5" />
            Get directions
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                       transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconNewspaper className="h-3.5 w-3.5" />
            Blog
          </Link>
        </div>

        <div
          className="container-page flex items-center justify-between gap-6"
          style={{ height: 'var(--header-h)' }}
        >
          <Link to="/" aria-label="Little Nap Subhav, home" className="shrink-0">
            <HeaderLogo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-ink-100/60 p-1">
              {nav.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `group inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-sm
                         font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-ink-900 text-white shadow-lift'
                            : 'text-ink-500 hover:bg-white hover:text-ink-900 hover:shadow-sm'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-70 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" />
                      {item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={open}
              className="relative hidden min-h-[44px] items-center gap-1.5 rounded-full border
                         border-ink-200/70 bg-white/50 px-4 text-sm font-medium text-ink-700
                         transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-300
                         hover:bg-white sm:inline-flex"
            >
              <IconClipboard className="h-4 w-4 text-ink-400" />
              Enquiry
              {count > 0 && (
                <span
                  className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full
                             bg-accent-400 px-1.5 text-[0.75rem] font-bold text-white"
                >
                  {count}
                </span>
              )}
            </button>

            <Link to="/contact" className="group btn-primary hidden min-h-[44px] !px-5 !py-2.5 md:inline-flex">
              Request a quote
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full
                         border border-ink-200/70 bg-white/60 text-ink-800 lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile drawer ---- */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink-950/30 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col
                      border-l border-white/60 bg-porcelain-50/95 shadow-glass-lg backdrop-blur-2xl
                      transition-transform duration-500 ease-out ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                      }`}
        >
          <div className="flex h-[76px] items-center justify-between px-5 pt-[var(--safe-t)]">
            <Logo markOnly />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full
                         border border-ink-200 text-ink-800"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1.5">
              {nav.map((item, i) => (
                <li
                  key={item.to}
                  style={{
                    transitionDelay: menuOpen ? `${120 + i * 55}ms` : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'none' : 'translateX(24px)',
                    transition: 'opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1)',
                  }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-4 py-3.5 font-display
                       text-xl transition-colors ${
                         isActive
                           ? 'glass text-ink-900'
                           : 'text-ink-600 hover:bg-white/60'
                       }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`h-5 w-5 shrink-0 ${isActive ? 'text-ink-900' : 'text-ink-400'}`}
                        />
                        <span className="flex-1">{item.label}</span>
                        <IconArrowRight className="h-4 w-4 shrink-0 text-accent-500 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-3 gap-2 border-t border-white/60 px-5 py-4">
            <a
              href={`tel:${company.contact.phoneHref}`}
              className="flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-xl
                         text-ink-600 transition-colors hover:bg-white/60"
            >
              <IconPhone className="h-4 w-4" />
              <span className="text-[0.7rem] font-medium">Call</span>
            </a>
            <a
              href={company.contact.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-xl
                         text-ink-600 transition-colors hover:bg-white/60"
            >
              <IconPin className="h-4 w-4" />
              <span className="text-[0.7rem] font-medium">Directions</span>
            </a>
            <Link
              to="/insights"
              className="flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-xl
                         text-ink-600 transition-colors hover:bg-white/60"
            >
              <IconNewspaper className="h-4 w-4" />
              <span className="text-[0.7rem] font-medium">Blog</span>
            </Link>
          </div>

          <div className="space-y-3 border-t border-white/60 p-5 pb-[calc(1.25rem+var(--safe-b))]">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                open()
              }}
              className="btn-outline w-full"
            >
              Enquiry list{count > 0 ? ` (${count})` : ''}
            </button>
            <Link to="/contact" className="btn-primary w-full">
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
