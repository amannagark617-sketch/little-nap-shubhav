import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
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
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever navigation happens.
  useEffect(() => setMenuOpen(false), [location.pathname])

  // Lock background scroll while the drawer is open, and allow Escape to close.
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm
                   focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-navy-100 bg-sand-50/90 backdrop-blur-md shadow-[0_1px_24px_-12px_rgba(21,27,83,0.4)]'
            : 'border-b border-transparent bg-sand-50/70 backdrop-blur-sm'
        }`}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Link to="/" aria-label="Little Nap Subhav — home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-navy-900'
                          : 'text-navy-500 hover:text-navy-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          className={`absolute inset-x-4 -bottom-0.5 h-px bg-gold-400 transition-opacity ${
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
              className="relative hidden rounded-full border border-navy-200 px-4 py-2 text-sm
                         font-medium text-navy-700 transition-colors hover:border-navy-400
                         hover:bg-white sm:inline-flex"
            >
              Enquiry list
              {count > 0 && (
                <span
                  className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full
                             bg-gold-400 px-1.5 text-[0.7rem] font-bold text-navy-950"
                >
                  {count}
                </span>
              )}
            </button>

            <Link to="/contact" className="btn-primary hidden md:inline-flex">
              Request a quote
              <IconArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full
                         border border-navy-200 text-navy-800 lg:hidden"
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
          className={`absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col
                      bg-sand-50 shadow-2xl transition-transform duration-300 ease-out ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                      }`}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-navy-100 px-5">
            <Logo markOnly />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full
                         border border-navy-200 text-navy-800"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3.5 font-display
                       text-xl transition-colors ${
                         isActive
                           ? 'bg-white text-navy-900 shadow-sm'
                           : 'text-navy-600 hover:bg-white/70'
                       }`
                    }
                  >
                    {item.label}
                    <IconArrowRight className="h-4 w-4 text-gold-400" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-navy-100 p-5">
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
