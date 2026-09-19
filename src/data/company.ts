/**
 * Single source of truth for company facts.
 *
 * Everything here is taken from the Little Nap Subhav corporate deck
 * (Little_Nap_Subhav_4). Where a figure is quoted it matches the deck exactly —
 * please keep it that way so the site, the deck and the AI advisor never
 * disagree with each other.
 */

export const company = {
  legalName: 'Little Nap Subhav India Pvt. Ltd.',
  shortName: 'Little Nap Subhav',
  initials: 'LNS',
  tagline: 'Where Production Meets Passion.',
  disciplines: [
    'OEM Recliner Manufacturing',
    'Motion Sofas',
    'Cinema Seating',
    'Sofa Beds',
  ],
  contact: {
    email: 'inquiry@lnsindia.co.in',
    /** Listed on the Google Business profile for the Dewas plant. */
    phone: '+91 62320 05722',
    phoneHref: '+916232005722',
    /** The number printed on the corporate deck. */
    altPhone: '+91 88178 52528',
    altPhoneHref: '+918817852528',
    /**
     * ASSUMPTION, not confirmed: the floating WhatsApp button uses the
     * Google-listing number on the (unverified) basis that Indian
     * businesses commonly run WhatsApp on their primary contact line. If
     * this number is not WhatsApp-enabled, or a different line is, update
     * this and nothing else needs to change.
     */
    whatsapp: '916232005722',
    website: 'www.lnsindia.co.in',
    address: {
      label: 'Manufacturing Plant',
      name: 'Little Nap Subhav Dewas — Manufacturing Plant',
      lines: [
        'Shree Shubham Logistics Park, 27–28',
        'AB Road Bypass, Dewas',
        'Indore, Madhya Pradesh 455001',
        'India',
      ],
      full: 'Shree Shubham Logistics Park, 27-28, AB Road Bypass, Dewas, Indore, Madhya Pradesh 455001, India',
      /** Share link from the Google Business profile. */
      mapsUrl: 'https://maps.app.goo.gl/pwn9rnyUKUYMimwa9',
      /** Keyless embed — no Maps API key or billing needed. */
      embedUrl:
        'https://www.google.com/maps?q=Little+Nap+Subhav+Dewas+Manufacturing+Plant,+Shree+Shubham+Logistics+Park,+AB+Road+Bypass,+Dewas,+Madhya+Pradesh+455001&output=embed',
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=' +
        encodeURIComponent(
          'Little Nap Subhav Dewas Manufacturing Plant, Shree Shubham Logistics Park, AB Road Bypass, Dewas, Madhya Pradesh 455001',
        ),
    },
  },
} as const

/**
 * Opening hours as published on the Google Business profile.
 * `day` uses the JS convention where Sunday is 0, so the UI can work out
 * whether the plant is open right now.
 */
export const openingHours = [
  { day: 1, label: 'Monday', hours: '9:00 am – 5:30 pm', open: '09:00', close: '17:30' },
  { day: 2, label: 'Tuesday', hours: '9:00 am – 5:30 pm', open: '09:00', close: '17:30' },
  { day: 3, label: 'Wednesday', hours: '9:00 am – 5:30 pm', open: '09:00', close: '17:30' },
  { day: 4, label: 'Thursday', hours: '9:00 am – 5:30 pm', open: '09:00', close: '17:30' },
  { day: 5, label: 'Friday', hours: '9:00 am – 5:30 pm', open: '09:00', close: '17:30' },
  { day: 6, label: 'Saturday', hours: '9:00 am – 5:30 pm', open: '09:00', close: '17:30' },
  { day: 0, label: 'Sunday', hours: 'Closed', open: null, close: null },
] as const

export const vision =
  'To engineer and manufacture world-class motion furniture that brings comfort, quality and innovation from India to the world.'

export const mission =
  'To design and manufacture innovative motion furniture that combines comfort, quality, and reliability, creating lasting value for customers, partners, employees, and society.'

export const positioningStatement =
  'Little Nap Subhav delivers high-quality, innovative furniture solutions tailored to business needs, with a strong focus on durability, design, and customer satisfaction.'

/** The four brand pillars that run along the bottom of the corporate cover. */
export const brandPillars = [
  { title: 'Engineered for Performance', icon: 'gear' },
  { title: 'Built with Precision', icon: 'shield' },
  { title: 'Manufactured in India', icon: 'factory' },
  { title: 'Delivering Comfort Worldwide', icon: 'globe' },
] as const

/** "Why Little Nap Subhav" — five differentiators from the deck. */
export const differentiators = [
  {
    title: 'Modern Manufacturing',
    body: 'A purpose-built facility running streamlined production lines, from CNC and panel saw through to final packaging.',
    icon: 'factory',
  },
  {
    title: 'Skilled Workforce',
    body: 'Trained craftspeople across carpentry, foaming, upholstery, sewing and fitting — with continuous in-house skill development.',
    icon: 'people',
  },
  {
    title: 'Quality Assurance',
    body: 'Four-stage inspection from raw material approval to a recorded final check, with a unique code on every finished unit.',
    icon: 'shield',
  },
  {
    title: 'ODM / OEM Customisation',
    body: 'Build to your drawings or ours. Models, mechanisms, dimensions and upholstery are developed around your specification.',
    icon: 'pencil',
  },
  {
    title: 'Timely Delivery',
    body: 'Scalable capacity and planned production keep committed dates, backed by a central-India location close to dry ports.',
    icon: 'truck',
  },
] as const

/** Headline numbers. `value` is the animated target, `suffix` renders after it. */
export const stats = [
  {
    value: 3200,
    suffix: '',
    label: 'Seats per month',
    detail: 'Current monthly manufacturing capacity',
  },
  {
    value: 80,
    suffix: '%+',
    label: 'Women-led workforce',
    detail: 'Our defining operational strength',
  },
  {
    value: 8,
    suffix: '',
    label: 'Product ranges',
    detail: 'Super Economical through to Cinema Seating',
  },
  {
    value: 4,
    suffix: '-stage',
    label: 'Quality process',
    detail: 'Material, inward, in-process and final',
  },
] as const

/** Manufacturing capability bullets, verbatim in substance from the deck. */
export const capability = {
  headline: 'Manufacturing Capability',
  points: [
    'Monthly manufacturing capacity of 3,200 seats.',
    'Advanced manufacturing facility with streamlined production processes.',
    'Consistent focus on quality, efficiency, and on-time delivery.',
    'Scalable operations to meet increasing customer demand.',
  ],
  workforce: {
    headline: 'Our Unique Strength — A Women-Led Workforce',
    points: [
      'More than 80% of our workforce comprises of women.',
      'Empowering women through skill development and employment opportunities.',
      'A culture of precision, dedication, and quality craftsmanship.',
      'Committed to diversity, inclusion, and sustainable social impact.',
    ],
  },
} as const

/** Four-stage quality system. */
export const qualityStages = [
  {
    step: '01',
    title: 'Raw Material Selection & R&D',
    body: 'Premium raw materials — including plywood, foam, fabric, reclining mechanisms and accessories — are carefully selected and approved by our R&D team.',
  },
  {
    step: '02',
    title: 'Inward Material Inspection',
    body: 'Every plywood, foam, fabric, mechanism and accessory is thoroughly inspected to ensure quality and compliance before production.',
  },
  {
    step: '03',
    title: 'In-Process Quality Control',
    body: 'Every product is inspected during manufacturing for dimensional accuracy, stitching, structural strength, finishing and overall quality.',
  },
  {
    step: '04',
    title: 'Final Inspection & Documentation',
    body: 'Every finished product undergoes a final quality inspection before dispatch. A unique identification code is assigned to each product and a quality inspection video is recorded, so complete records support full traceability and consistency.',
  },
] as const

/** Construction features shown on the Product Features slide. */
export const productFeatures = [
  {
    title: 'Durable Frame',
    body: 'Seasoned ply and engineered structures built to take daily cycling without racking or creep.',
    icon: 'frame',
  },
  {
    title: 'Ergonomic Design',
    body: 'Seat height, pitch and lumbar profile developed in our N.P.D. lab for long-session comfort.',
    icon: 'ergonomic',
  },
  {
    title: 'High-Density Foam',
    body: 'Foam poured and cut in-house so density and recovery stay consistent across a production run.',
    icon: 'foam',
  },
  {
    title: 'Smooth Mechanism',
    body: 'Manual and motorised recline mechanisms selected for quiet, repeatable travel through their full stroke.',
    icon: 'mechanism',
  },
] as const

/** Clients named on the corporate deck, rendered as wordmarks rather than logos. */
export const clients = [
  'Green Soul',
  'The Sleep Company',
  'Duroflex',
  'Sleepyhead',
  'SleepyCat',
  'Little Nap Recliners',
  'Asian Paints',
  'Godrej Interio',
] as const

/** What a long-term OEM partnership with LNS looks like in practice. */
export const partnership = [
  {
    title: 'Business Commitment',
    body: 'Capacity planned around committed volumes — up to 1,000 cinema seating and 500 recliner units per month.',
  },
  {
    title: 'Long-Term Partnership',
    body: 'A strategic relationship built for consistent, compounding business growth rather than one-off orders.',
  },
  {
    title: 'New Product Development',
    body: 'Collaborate on new models, customisation and product innovation through our in-house N.P.D. lab.',
  },
  {
    title: 'Business Expansion',
    body: 'Explore new categories and markets together, and grow annual business volume year on year.',
  },
  {
    title: 'Operational Collaboration',
    body: 'Shared digital systems and processes that improve efficiency, transparency and data accuracy on both sides.',
  },
] as const

/** Life at the plant, from the "Celebrating Our Journey" slide. */
export const culture = [
  'Events & Celebration',
  'Fire Safety Training',
  'Awards & Appreciation',
  'Health Check-ups',
  "Women's Day Celebration",
  'Birthday Celebrations',
] as const
