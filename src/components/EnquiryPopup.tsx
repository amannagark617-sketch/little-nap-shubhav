import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconArrowRight, IconClose } from './Icons'

const DELAY_MS = 20_000
const STORAGE_KEY = 'lns.enquiryPopup.seen'

/**
 * A one-time, timed nudge toward the enquiry form, shown 20 seconds into a
 * visit, once per browser session (tracked in sessionStorage so it doesn't
 * reappear on every page within the same visit, but does again on a fresh
 * one). Skipped if the visitor is on the contact page when the timer fires,
 * checked at fire time rather than at mount, since a single-page app never
 * remounts this on navigation.
 */
export default function EnquiryPopup() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // Private browsing — fall through and show it for this visit.
    }
    if (seen) return

    const timer = window.setTimeout(() => {
      if (window.location.pathname !== '/contact') setOpen(true)
    }, DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Nothing to persist to — it'll just show again next reload, which is fine.
    }
  }

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Start an enquiry"
    >
      <div
        onClick={dismiss}
        aria-hidden="true"
        className="absolute inset-0 animate-fade-in bg-ink-950/50 backdrop-blur-md"
      />

      <div className="glass-strong relative w-full max-w-md animate-scale-in overflow-hidden p-8 text-center sm:p-10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center
                     rounded-full text-ink-400 transition-colors hover:bg-white/60 hover:text-ink-800"
        >
          <IconClose className="h-4 w-4" />
        </button>

        <p className="eyebrow justify-center">Still deciding?</p>
        <h2 className="mt-4 font-display text-2xl text-ink-900 sm:text-3xl">
          Let's get you a real specification.
        </h2>
        <p className="mt-3 leading-relaxed text-ink-500">
          Tell us the models, the volumes and the timeline. We will come back
          with a specification, a sample plan and an honest production schedule,
          no obligation.
        </p>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              dismiss()
              navigate('/contact')
            }}
            className="btn-primary justify-center"
          >
            Start an enquiry
            <IconArrowRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={dismiss} className="btn-outline justify-center">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
