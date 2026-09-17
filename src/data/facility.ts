/**
 * Photographs of the plant, the showroom and the achievements wall.
 *
 * These files are NOT in the repository. They come from the company's own
 * Google Business profile and are dropped into `public/images/facility/` —
 * see the README in that folder for filenames and sizing.
 *
 * <FacilitySection> probes for each file before rendering. Missing ones are
 * dropped, and if none are present the whole section removes itself — so the
 * site is correct whether zero, some or all of the photographs are in place,
 * and a broken image is never shown.
 */

export type FacilityShot = {
  id: string
  file: string
  title: string
  caption: string
  /** Wide cards span two columns on large screens. */
  wide?: boolean
}

export const facilityShots: FacilityShot[] = [
  {
    id: 'production-hall',
    file: 'production-hall.webp',
    title: 'The production hall',
    caption:
      'Sewing and assembly lines running the length of the building, laid out so a unit moves in one direction from cutting through to packing.',
    wide: true,
  },
  {
    id: 'showroom-wide',
    file: 'showroom-wide.webp',
    title: 'The showroom',
    caption:
      'Where buyers sit in the range before they specify it. Motion sofas and recliners across every tier, in the fabrics and leathers we build in.',
  },
  {
    id: 'showroom-recliners',
    file: 'showroom-recliners.webp',
    title: 'The recliner floor',
    caption:
      'Single seats from Super Economical through to Reserved, side by side — the quickest way to feel the difference between the tiers.',
  },
  {
    id: 'proud-moments',
    file: 'proud-moments.webp',
    title: 'Proud Moments',
    caption:
      'The achievements wall on the way into the plant: awards, recognition and press from the years behind us.',
  },
  {
    id: 'showroom-panorama',
    file: 'showroom-panorama.webp',
    title: 'Across the showroom',
    caption:
      'The full width of the display floor, kept stocked so a visiting buyer can compare models in one visit.',
  },
]

export function facilityImage(file: string): string {
  return `${import.meta.env.BASE_URL}images/facility/${file}`
}
