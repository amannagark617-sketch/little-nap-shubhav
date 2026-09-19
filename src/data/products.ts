/**
 * Product catalogue.
 *
 * Range names, model names and photography all come from the corporate deck.
 * Model-level copy is descriptive of the silhouette shown; it deliberately
 * avoids quoting dimensions or recline angles, because the deck does not
 * publish them and an OEM buyer will specify their own. Concrete numbers
 * belong in `specHighlights` once engineering supplies them.
 */

export type RangeId =
  | 'super-economical'
  | 'economical'
  | 'premium'
  | 'luxury'
  | 'reserved'
  | 'motion-sofa'
  | 'sofa-cum-bed'
  | 'cinema-seating'

export type Product = {
  id: string
  name: string
  range: RangeId
  /** Primary image, relative to /images/products. */
  image: string
  /** Optional second state — used by the sofa-bed sofa/bed toggle. */
  altImage?: string
  altImageLabel?: string
  imageLabel?: string
  /** Extra finishes of the same model shown in the detail view. */
  gallery?: { src: string; label: string }[]
  blurb: string
  traits: string[]
}

export type Range = {
  id: RangeId
  name: string
  /** Short positioning line used on range headers and filter chips. */
  positioning: string
  description: string
  /** Shared construction notes that apply to every model in the range. */
  specHighlights: { label: string; value: string }[]
  /**
   * CSS aspect-ratio for catalogue imagery in this range.
   *
   * Single seats were photographed portrait and multi-seat pieces landscape, so
   * one global ratio would crop the sofas down to their background. The grid is
   * grouped by range, which means a per-range ratio still gives perfectly even
   * rows.
   */
  imageAspect: string
}

export const ranges: Range[] = [
  {
    id: 'super-economical',
    name: 'Super Economical',
    positioning: 'Volume-first recliners',
    description:
      'Our entry recliner platform, engineered for high-volume retail and institutional programmes where landed cost decides the order. Simplified silhouettes and a lean bill of materials, without stepping away from the frame and foam standards that apply across the plant.',
    specHighlights: [
      { label: 'Construction', value: 'Seasoned ply frame' },
      { label: 'Foam', value: 'High-density, cut in-house' },
      { label: 'Mechanism', value: 'Manual recline' },
      { label: 'Upholstery', value: 'Fabric or leatherette' },
    ],
    imageAspect: '4 / 5',
  },
  {
    id: 'economical',
    name: 'Economical',
    positioning: 'Everyday comfort, mainstream price',
    description:
      'A step up in padding, arm volume and finish while staying firmly in mainstream price bands. The range most often specified for multi-store retail rollouts and mid-tier hospitality projects.',
    specHighlights: [
      { label: 'Construction', value: 'Seasoned ply frame' },
      { label: 'Foam', value: 'High-density, layered seat' },
      { label: 'Mechanism', value: 'Manual or motorised' },
      { label: 'Upholstery', value: 'Fabric or leatherette' },
    ],
    imageAspect: '4 / 5',
  },
  {
    id: 'premium',
    name: 'Premium',
    positioning: 'Considered detailing',
    description:
      'Fuller proportions, more deliberate stitch detailing and a heavier seat build. Premium is where most private-label programmes land when the brand wants the chair to feel like a considered furniture purchase.',
    specHighlights: [
      { label: 'Construction', value: 'Reinforced ply frame' },
      { label: 'Foam', value: 'High-density, multi-layer' },
      { label: 'Mechanism', value: 'Manual or motorised' },
      { label: 'Upholstery', value: 'Fabric, leatherette or leather' },
    ],
    imageAspect: '4 / 5',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    positioning: 'Generous, substantial seating',
    description:
      'Deep seats, pillowed arms and the most generous foam specification we build. Luxury models are designed to read as the anchor piece of a living room rather than an accessory chair.',
    specHighlights: [
      { label: 'Construction', value: 'Reinforced ply frame' },
      { label: 'Foam', value: 'High-density with pillow-top seat' },
      { label: 'Mechanism', value: 'Motorised recline available' },
      { label: 'Upholstery', value: 'Premium leatherette or leather' },
    ],
    imageAspect: '4 / 5',
  },
  {
    id: 'reserved',
    name: 'Reserved',
    positioning: 'Signature design series',
    description:
      'Our signature series, tighter, more architectural silhouettes with slimmer arms and a more upright stance. Reserved is built for brands that want a recliner which does not look like a recliner.',
    specHighlights: [
      { label: 'Construction', value: 'Reinforced ply frame' },
      { label: 'Foam', value: 'High-density, firm-profile seat' },
      { label: 'Mechanism', value: 'Motorised recline available' },
      { label: 'Upholstery', value: 'Premium leatherette or leather' },
    ],
    imageAspect: '4 / 5',
  },
  {
    id: 'motion-sofa',
    name: 'Motion Sofa',
    positioning: 'Multi-seat reclining sofas',
    description:
      'Two- and three-seat reclining sofas built on the same mechanism and foam discipline as our single recliners, with the frame engineering needed to keep multi-seat units square over their service life.',
    specHighlights: [
      { label: 'Configuration', value: '2-seat and 3-seat' },
      { label: 'Construction', value: 'Reinforced multi-seat frame' },
      { label: 'Mechanism', value: 'Independent seat recline' },
      { label: 'Upholstery', value: 'Fabric, leatherette or leather' },
    ],
    imageAspect: '4 / 3',
  },
  {
    id: 'sofa-cum-bed',
    name: 'Sofa Cum Bed',
    positioning: 'Convertible sleeping solutions',
    description:
      'Convertible units that move between a full sofa and a flat sleeping surface. Built around proven conversion hardware, with the deck mechanism and mattress specified to the programme.',
    specHighlights: [
      { label: 'Conversion', value: 'Sofa to flat bed' },
      { label: 'Mechanisms', value: 'Pop-up, pull-out, mattress deck' },
      { label: 'Construction', value: 'Reinforced ply frame' },
      { label: 'Upholstery', value: 'Fabric or leatherette' },
    ],
    imageAspect: '16 / 10',
  },
  {
    id: 'cinema-seating',
    name: 'Cinema Seating',
    positioning: 'Multiplex and home theatre',
    description:
      'Seating built for commercial duty cycles, multiplexes, private screening rooms and home theatres. Specified with the accessories an auditorium needs, including cup holders, consoles and row configurations.',
    specHighlights: [
      { label: 'Application', value: 'Multiplex and home theatre' },
      { label: 'Configuration', value: 'Single, row and lounger' },
      { label: 'Accessories', value: 'Cup holders, consoles' },
      { label: 'Mechanism', value: 'Manual or motorised recline' },
    ],
    imageAspect: '4 / 5',
  },
]

export const products: Product[] = [
  // ---- Super Economical ----
  {
    id: 'joy',
    name: 'Joy',
    range: 'super-economical',
    image: 'joy.webp',
    blurb:
      'A compact single recliner with a clean box arm and a low visual weight, the easiest chair in the catalogue to place in a small living room.',
    traits: ['Compact footprint', 'Box arm', 'Manual recline'],
  },
  {
    id: 'jolly',
    name: 'Jolly',
    range: 'super-economical',
    image: 'jolly.webp',
    blurb:
      'Softer, rounded arms and a slightly taller back than Joy, aimed at buyers who want a more traditional recliner shape at the same entry price.',
    traits: ['Rounded arms', 'Tall back', 'Manual recline'],
  },
  {
    id: 'bliss',
    name: 'Bliss',
    range: 'super-economical',
    image: 'bliss.webp',
    blurb:
      'The most padded chair in the entry range, with a channelled back that gives the seat a fuller look without a heavier bill of materials.',
    traits: ['Channelled back', 'Padded seat', 'Manual recline'],
  },

  // ---- Economical ----
  {
    id: 'cozy',
    name: 'Cozy',
    range: 'economical',
    image: 'cozy.webp',
    blurb:
      'A well-proportioned everyday recliner with a segmented back and moderate arm volume. The default choice for mainstream retail programmes.',
    traits: ['Segmented back', 'Everyday comfort', 'Manual or motorised'],
  },
  {
    id: 'nest',
    name: 'Nest',
    range: 'economical',
    image: 'nest.webp',
    blurb:
      'Higher sides and a more enclosing seat give Nest a settled, wrapped feel, popular where the chair doubles as a reading or nursing seat.',
    traits: ['Enclosing sides', 'Wrapped seat', 'Manual or motorised'],
  },
  {
    id: 'plush',
    name: 'Plush',
    range: 'economical',
    image: 'plush.webp',
    blurb:
      'Extra seat and back padding on the Economical platform, for buyers who want a softer sit without moving up to the Premium range.',
    traits: ['Extra padding', 'Soft sit', 'Manual or motorised'],
  },

  // ---- Premium ----
  {
    id: 'legacy',
    name: 'Legacy',
    range: 'premium',
    image: 'legacy.webp',
    blurb:
      'A restrained, squared silhouette with crisp seams. Legacy is the most neutral chair in the Premium range and the easiest to brand as your own.',
    traits: ['Squared silhouette', 'Crisp seams', 'Private-label ready'],
  },
  {
    id: 'majestic',
    name: 'Majestic',
    range: 'premium',
    image: 'majestic.webp',
    blurb:
      'Fuller arms and a pronounced headrest section give Majestic more presence, while keeping the Premium range footprint.',
    traits: ['Full arms', 'Pronounced headrest', 'More presence'],
  },
  {
    id: 'imperial',
    name: 'Imperial',
    range: 'premium',
    image: 'imperial.webp',
    blurb:
      'The most detailed chair in the Premium range, with layered back cushioning and a heavier seat build that reads a tier above its price.',
    traits: ['Layered back', 'Heavier seat build', 'Detailed finish'],
  },

  // ---- Luxury ----
  {
    id: 'emperor',
    name: 'Emperor',
    range: 'luxury',
    image: 'emperor.webp',
    blurb:
      'Broad, pillowed arms and a deep seat. Emperor is built to be the most comfortable chair in the room and is sized accordingly.',
    traits: ['Pillowed arms', 'Deep seat', 'Motorised available'],
  },
  {
    id: 'crown',
    name: 'Crown',
    range: 'luxury',
    image: 'crown.webp',
    blurb:
      'A wide, low-slung stance with a generous back and substantial arm bolsters, the most sofa-like single seat we build.',
    traits: ['Wide stance', 'Arm bolsters', 'Motorised available'],
  },
  {
    id: 'monarch',
    name: 'Monarch',
    range: 'luxury',
    image: 'monarch.webp',
    blurb:
      'Rolled arms and a tufted-look back give Monarch a more classical read, for programmes with a traditional design language.',
    traits: ['Rolled arms', 'Classical profile', 'Motorised available'],
  },

  // ---- Reserved ----
  {
    id: 'bourbon',
    name: 'Bourbon',
    range: 'reserved',
    image: 'bourbon.webp',
    blurb:
      'Slim arms and an upright back. Bourbon is the most compact Reserved model and the one that sits most comfortably in a smaller room.',
    traits: ['Slim arms', 'Upright back', 'Architectural'],
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    range: 'reserved',
    image: 'manhattan.webp',
    blurb:
      'A taller back and tighter seat cushion give Manhattan a formal, almost lounge-chair posture that hides its recline function well.',
    traits: ['Tall back', 'Tight seat', 'Formal posture'],
  },
  {
    id: 'martini',
    name: 'Martini',
    range: 'reserved',
    image: 'martini.webp',
    blurb:
      'The most sculptural chair in the catalogue, with a continuous back-to-arm line. Martini is the Reserved range at its most design-led.',
    traits: ['Sculptural line', 'Continuous back-to-arm', 'Design-led'],
  },

  // ---- Motion Sofa ----
  {
    id: 'milan',
    name: 'Milan',
    range: 'motion-sofa',
    image: 'milan.webp',
    blurb:
      'A clean-lined motion sofa with slim arms and a low back, built for apartments where a full recliner sofa usually overwhelms the room.',
    traits: ['Slim arms', 'Low back', 'Apartment scale'],
  },
  {
    id: 'budapest',
    name: 'Budapest',
    range: 'motion-sofa',
    image: 'budapest.webp',
    blurb:
      'A fuller motion sofa with deeper seats and more substantial arms, the mainstream three-seat configuration for family living rooms.',
    traits: ['Deep seats', 'Substantial arms', 'Family scale'],
  },
  {
    id: 'prague',
    name: 'Prague',
    range: 'motion-sofa',
    image: 'prague.webp',
    blurb:
      'The most heavily cushioned motion sofa in the range, with pillowed backs and a relaxed, settled stance.',
    traits: ['Pillowed backs', 'Relaxed stance', 'Heavily cushioned'],
  },

  // ---- Sofa Cum Bed ----
  {
    id: 'sofabed-mattress',
    name: 'Sofa Bed With Mattress',
    range: 'sofa-cum-bed',
    image: 'sofabed-mattress-sofa.webp',
    imageLabel: 'Sofa mode',
    altImage: 'sofabed-mattress-bed.webp',
    altImageLabel: 'Bed mode',
    blurb:
      'A fold-out sleeping deck carrying a true mattress rather than folded seat cushions, so the unit works as a guest bed night after night.',
    traits: ['True mattress deck', 'Fold-out frame', 'Guest-bed duty'],
  },
  {
    id: 'popup-pullout',
    name: 'Pop-Up Pull Out',
    range: 'sofa-cum-bed',
    image: 'popup-pullout-sofa.webp',
    imageLabel: 'Sofa mode',
    altImage: 'popup-pullout-bed.webp',
    altImageLabel: 'Bed mode',
    blurb:
      'A pull-out base with a pop-up seat section that levels into a flat sleeping surface, a compact conversion that keeps the sofa footprint tight.',
    traits: ['Pop-up seat', 'Pull-out base', 'Compact footprint'],
  },

  // ---- Cinema Seating ----
  {
    id: 'miller',
    name: 'Miller',
    range: 'cinema-seating',
    image: 'miller-tan.webp',
    gallery: [
      { src: 'miller-tan.webp', label: 'Tan leatherette' },
      { src: 'miller-emerald.webp', label: 'Emerald, quilted' },
    ],
    blurb:
      'Our core auditorium recliner, specified with integrated cup holders and console options and built for commercial duty cycles.',
    traits: ['Integrated cup holder', 'Commercial duty', 'Row configurable'],
  },
  {
    id: 'lounger',
    name: 'Lounger',
    range: 'cinema-seating',
    image: 'lounger.webp',
    blurb:
      'A full-flat lounger for premium screens and recliner-format auditoriums, where the seat is the reason the ticket costs more.',
    traits: ['Full-flat recline', 'Premium screens', 'Console options'],
  },
]

export const rangeById = Object.fromEntries(ranges.map((r) => [r.id, r])) as Record<RangeId, Range>

export function productsByRange(id: RangeId): Product[] {
  return products.filter((p) => p.range === id)
}

export function productImage(file: string): string {
  return `${import.meta.env.BASE_URL}images/products/${file}`
}
