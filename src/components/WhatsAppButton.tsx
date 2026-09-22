import { IconWhatsapp } from './Icons'
import { company } from '../data/company'

/**
 * A floating WhatsApp quick-contact button, on the conventional bottom-right
 * corner, mirrored by the Comfort Advisor on the opposite corner so neither
 * ever overlaps the other. Opens a chat with `company.contact.whatsapp` and
 * a pre-filled greeting message. The soft pulse ring is a standing
 * attention cue, not a one-off animation, so it keeps running for as long
 * as the button is on screen.
 *
 * Hidden below `lg` — <MobileQuickBar> covers the same action there, and a
 * floating button stacked on top of that bar would be redundant clutter on
 * a small screen.
 */
export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hello, I would like to enquire about Little Nap Subhav products.',
  )

  return (
    <a
      href={`https://wa.me/${company.contact.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="pin-fab fixed z-[57] hidden h-14 w-14 items-center justify-center
                 rounded-full bg-[#25D366] text-white shadow-lift transition-transform
                 duration-300 hover:scale-110 active:scale-95 lg:inline-flex"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60 [animation-duration:2.4s]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full ring-1 ring-white/40"
      />
      <IconWhatsapp className="relative h-7 w-7" />
    </a>
  )
}
