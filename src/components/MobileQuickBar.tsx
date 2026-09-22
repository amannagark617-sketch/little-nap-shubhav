import { IconPhone, IconPin, IconWhatsapp, IconClipboard } from './Icons'
import { useEnquiry } from '../context/EnquiryContext'
import { company } from '../data/company'

/**
 * A persistent bottom action bar, mobile only — the structural move that
 * makes a retail app feel immediate: the site's most-wanted actions sit one
 * tap away, always on screen, instead of behind the hamburger menu. Replaces
 * the floating WhatsApp button below the `lg` breakpoint, where this bar
 * covers the same action alongside three more.
 */
export default function MobileQuickBar() {
  const { open } = useEnquiry()
  const whatsappMessage = encodeURIComponent(
    'Hello, I would like to enquire about Little Nap Subhav products.',
  )

  const items = [
    { label: 'Call', icon: IconPhone, href: `tel:${company.contact.phoneHref}` },
    {
      label: 'WhatsApp',
      icon: IconWhatsapp,
      href: `https://wa.me/${company.contact.whatsapp}?text=${whatsappMessage}`,
      external: true,
    },
    { label: 'Directions', icon: IconPin, href: company.contact.address.directionsUrl, external: true },
  ] as const

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-[56] border-t border-ink-100 bg-white/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'var(--safe-b)' }}
    >
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={'external' in item && item.external ? '_blank' : undefined}
            rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
            className="flex min-h-[56px] flex-col items-center justify-center gap-1 text-ink-600
                       transition-colors active:bg-ink-50"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[0.7rem] font-medium">{item.label}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={open}
          className="flex min-h-[56px] flex-col items-center justify-center gap-1 border-l
                     border-ink-100 bg-ink-900 text-white transition-colors active:bg-ink-800"
        >
          <IconClipboard className="h-5 w-5" />
          <span className="text-[0.7rem] font-medium">Quote</span>
        </button>
      </div>
    </nav>
  )
}
