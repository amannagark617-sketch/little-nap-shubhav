import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import HeaderLogo from './HeaderLogo'
import { IconClose, IconMenu, IconArrowRight } from './Icons'
import { useEnquiry } from '../context/EnquiryContext'

const nav = [
  { to: '/products', label: 'Products' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/quality', label: 'Quality' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
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
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-md
                    transition-shadow duration-300 ${
                      scrolled ? 'border-ink-100 shadow-sm' : 'border-ink-100/60'
                    }`}
        style={{ paddingTop: 'var(--safe-t)' }}
      >
        <div
          className="container-page flex items-center justify-between gap-6"
          style={{ height: 'var(--header-h)' }}
        >
          <Link to="/" aria-label="Little Nap Subhav, home" className="shrink-0">
            <HeaderLogo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative inline-flex min-h-[44px] items-center rounded-full px-4 text-sm
                       font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-ink-900'
                          : 'text-ink-500 hover:-translate-y-0.5 hover:text-ink-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          className={`absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent
                                      via-accent-400 to-transparent transition-all duration-300 ${
                                        isActive ? 'opacity-100' : 'opacity-0'
                                      }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={open}
              className="relative hidden min-h-[44px] items-center rounded-full border
                         border-ink-200/70 bg-white/50 px-4 text-sm font-medium text-ink-700
                         transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-300
                         hover:bg-white sm:inline-flex"
            >
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
        className={`fixed inset-0 z-[55] lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
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
                      `group flex items-center justify-between rounded-xl px-4 py-3.5 font-display
                       text-xl transition-colors ${
                         isActive
                           ? 'glass text-ink-900'
                           : 'text-ink-600 hover:bg-white/60'
                       }`
                    }
                  >
                    {item.label}
                    <IconArrowRight className="h-4 w-4 text-accent-500 transition-transform duration-300 group-hover:translate-x-1" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

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
