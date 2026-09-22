import type { SVGProps } from 'react'
import {
  ChevronRight,
  ArrowRight,
  X,
  Menu,
  Search,
  Plus,
  Check,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  Image as ImageGlyph,
  CirclePlay,
  Factory,
  Globe,
  Users,
  ShieldCheck,
  Settings2,
  PenLine,
  Truck,
  Newspaper,
} from 'lucide-react'

/**
 * General UI and category icons come from Lucide — a maintained, consistent
 * 24px/2px-stroke set — re-exported under this file's existing names so every
 * call site keeps working unchanged. The furniture-specific glyphs below
 * (recliner, sofa bed, mechanism…) have no Lucide equivalent and stay custom,
 * hand-drawn to the same 24px/2px-stroke, round-cap grid so the two sets read
 * as one family. Colourless by design — every icon inherits `currentColor`.
 */

export const IconChevron = ChevronRight
export const IconArrowRight = ArrowRight
export const IconClose = X
export const IconMenu = Menu
export const IconSearch = Search
export const IconPlus = Plus
export const IconCheck = Check
export const IconSparkle = Sparkles
export const IconMail = Mail
export const IconPhone = Phone
export const IconPin = MapPin
export const IconSend = Send
export const IconImage = ImageGlyph
export const IconPlay = CirclePlay
export const IconFactory = Factory
export const IconGlobe = Globe
export const IconPeople = Users
export const IconShield = ShieldCheck
export const IconGear = Settings2
export const IconPencil = PenLine
export const IconTruck = Truck
export const IconNewspaper = Newspaper

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function IconRecliner(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 14V7.5a1.5 1.5 0 0 1 3 0V14" />
      <path d="M6 14h7.5" />
      <path d="M13.5 14 20 11.2" />
      <path d="M4 14h1.5a1.5 1.5 0 0 1 1.5 1.5V18" />
      <path d="M7 18h7" />
      <path d="M19.2 9.4 20 11.2l-1.9.8" />
    </svg>
  )
}

export function IconSofa(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 11V8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5V11" />
      <path d="M3 11.5a1.5 1.5 0 0 1 3 0V15h12v-3.5a1.5 1.5 0 0 1 3 0V17H3Z" />
      <path d="M12 7v8" />
      <path d="M6 17v2M18 17v2" />
    </svg>
  )
}

export function IconCinema(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12V9a1.5 1.5 0 0 1 3 0v3" />
      <path d="M10.5 12V9a1.5 1.5 0 0 1 3 0v3" />
      <path d="M17 12V9a1.5 1.5 0 0 1 3 0v3" />
      <path d="M3 12h18v4H3z" />
      <path d="M5 16v3M19 16v3M12 16v3" />
    </svg>
  )
}

export function IconSofaBed(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 16v-3.5a1.5 1.5 0 0 1 1.5-1.5H21v5" />
      <path d="M3 16h18v3H3z" />
      <path d="M7 11V8h6v3" />
      <path d="M3 12.5V8" />
    </svg>
  )
}

export function IconFrame(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <path d="M3.5 9h17M7.5 9v10M16.5 9v10" />
    </svg>
  )
}

export function IconErgonomic(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 20v-4.5a3 3 0 0 1 3-3h1.5" />
      <path d="M11.5 12.5 16 9" />
      <circle cx="9" cy="6" r="2.2" />
      <path d="M9 8.2v4.3" />
      <path d="M17 20h-6" />
    </svg>
  )
}

export function IconFoam(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="8" width="17" height="9" rx="2.5" />
      <path d="M3.5 11.5h17M3.5 14h17" />
    </svg>
  )
}

export function IconMechanism(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 18 10 8l4 6 6-8" />
      <circle cx="10" cy="8" r="1.6" />
      <circle cx="14" cy="14" r="1.6" />
    </svg>
  )
}

/** The official WhatsApp glyph (filled, not stroked — used at brand scale only). */
export function IconWhatsapp(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/** Name-indexed lookup for icons chosen in the data files. */
export const iconMap = {
  gear: IconGear,
  shield: IconShield,
  factory: IconFactory,
  globe: IconGlobe,
  people: IconPeople,
  pencil: IconPencil,
  truck: IconTruck,
  frame: IconFrame,
  ergonomic: IconErgonomic,
  foam: IconFoam,
  mechanism: IconMechanism,
  recliner: IconRecliner,
  sofa: IconSofa,
  cinema: IconCinema,
  sofabed: IconSofaBed,
} as const

export type IconName = keyof typeof iconMap
