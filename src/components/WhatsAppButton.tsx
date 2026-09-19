import { useState } from 'react'
import { IconClose, IconWhatsapp } from './Icons'
import { company } from '../data/company'

/**
 * A floating WhatsApp quick-contact button, mirroring the Comfort Advisor on
 * the opposite corner so neither ever overlaps the other.
 *
 * Uses `company.contact.whatsapp` — see the ASSUMPTION note on that field in
 * data/company.ts. This is the one contact channel on the site that has not
 * been confirmed as correct; everything else (email, phone, address) comes
 * from the Google Business listing or the corporate deck.
 */
export default function WhatsAppButton() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const message = encodeURIComponent(
    'Hello, I would like to enquire about Little Nap Subhav products.',
  )

  return (
    <div className="pin-fab-left fixed z-[57] flex items-end gap-2">
      <a
        href={`https://wa.me/${company.contact.whatsapp}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group inline-flex h-14 w-14 items-center justify-center rounded-full
                   bg-[#25D366] text-white shadow-lift transition-transform duration-300
                   hover:scale-105 active:scale-95"
      >
        <IconWhatsapp className="h-7 w-7" />
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Hide WhatsApp button"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border
                   border-ink-200 bg-white text-ink-400 shadow-glass transition-colors
                   hover:text-ink-700"
      >
        <IconClose className="h-3 w-3" />
      </button>
    </div>
  )
}
