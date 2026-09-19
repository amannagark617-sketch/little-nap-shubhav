/**
 * Homepage campaign banners — the rotating promotional strip under the hero.
 *
 * This is the one place on the site meant to be swapped out often (a new
 * range launch, a trade-show push, a seasonal message), so it is kept as
 * plain data on purpose: updating a campaign is editing this array, not
 * touching a component. Each slide's image is a PlaceholderImage — it renders
 * a real photo automatically once one exists at the stated path.
 */

export type Campaign = {
  id: string
  eyebrow: string
  title: string
  body: string
  cta: string
  href: string
  /** Path under public/images/ this slide's creative should live at. */
  image: string
  imageAlt: string
}

export const campaigns: Campaign[] = [
  {
    id: 'oem-programme',
    eyebrow: 'OEM & Private Label',
    title: 'Build your range on our line.',
    body: 'From a single private-label model to a full catalogue — specify it, and we manufacture it under your name.',
    cta: 'Start a conversation',
    href: '/contact',
    image: 'campaigns/oem-programme.webp',
    imageAlt: 'Private-label motion furniture in production',
  },
  {
    id: 'reserved-range',
    eyebrow: 'Signature series',
    title: 'Introducing the Reserved range.',
    body: 'Slimmer arms, a more architectural stance — our most design-led recliners yet.',
    cta: 'Explore Reserved',
    href: '/products?range=reserved',
    image: 'campaigns/reserved-range.webp',
    imageAlt: 'A Reserved range recliner in a contemporary interior',
  },
  {
    id: 'cinema-seating',
    eyebrow: 'For multiplexes & home theatres',
    title: 'Seating built for the whole run.',
    body: 'Commercial-duty recliners and loungers, specified with the accessories an auditorium actually needs.',
    cta: 'View cinema seating',
    href: '/products?range=cinema-seating',
    image: 'campaigns/cinema-seating.webp',
    imageAlt: 'Cinema seating installed in an auditorium',
  },
]
