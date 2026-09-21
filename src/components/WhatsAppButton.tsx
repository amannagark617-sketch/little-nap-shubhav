import { IconWhatsapp } from './Icons'
import { company } from '../data/company'

/**
 * A floating WhatsApp quick-contact button, mirroring the Comfort Advisor on
 * the opposite corner so neither ever overlaps the other. Opens a chat with
 * `company.contact.whatsapp` and a pre-filled greeting message.
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
      className="pin-fab-left fixed z-[57] inline-flex h-14 w-14 items-center justify-center
                 rounded-full bg-[#25D366] text-white shadow-lift transition-transform
                 duration-300 hover:scale-105 active:scale-95"
    >
      <IconWhatsapp className="h-7 w-7" />
    </a>
  )
}
