import type { SVGProps } from 'react'

/**
 * Line icons drawn to match the gold outline set on the corporate deck cover:
 * 24px grid, 1.5 stroke, round caps, no fills.
 */

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
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

export function IconGear(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  )
}

export function IconShield(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconFactory(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 20V11l5 3V11l5 3V9l6 3.5V20Z" />
      <path d="M6 9V4h2v5" />
      <path d="M8 17h2M14 17h2" />
    </svg>
  )
}

export function IconGlobe(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z" />
    </svg>
  )
}

export function IconPeople(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.6a3 3 0 0 1 0 4.8" />
      <path d="M17.2 14.2A5.5 5.5 0 0 1 20.5 19" />
    </svg>
  )
}

export function IconPencil(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="m14.5 6.5 3 3" />
    </svg>
  )
}

export function IconTruck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
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

export function IconChevron(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function IconArrowRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function IconClose(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconSearch(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function IconPlus(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

export function IconSparkle(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 11 10.1 9Z" />
      <path d="M18.5 4v3M20 5.5h-3" />
    </svg>
  )
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </svg>
  )
}

export function IconPhone(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  )
}

export function IconPin(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconSend(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 4 3 10.5l7 2.6L12.6 21Z" />
      <path d="m10 13.1 3.4-3.4" />
    </svg>
  )
}

export function IconImage(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5 17 4.5-5 3.5 4 2.5-3 4 4" />
    </svg>
  )
}

export function IconPlay(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5 15.5 12 10 15.5Z" />
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
