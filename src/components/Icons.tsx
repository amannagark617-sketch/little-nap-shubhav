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

export function IconWhatsapp(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 17.5 5 20l2.6-1.4A8 8 0 1 0 4.5 14Z" />
      <path d="M9 9.8c0 3 2.4 5.4 5.4 5.4.8 0 1-.3 1-.9v-.9c0-.4-.3-.6-.6-.7l-1.5-.4c-.3 0-.5 0-.7.3l-.3.5a4.6 4.6 0 0 1-2.3-2.3l.5-.3c.2-.2.3-.4.2-.7L10.3 9c0-.3-.3-.6-.7-.6h-.9c-.5 0-.8.3-.8 1Z" />
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
