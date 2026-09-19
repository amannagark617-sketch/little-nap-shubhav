/**
 * Draft article titles for the homepage "Insights" teaser.
 *
 * There is no blog yet — this previews the section without a single dead
 * link: cards render but are not clickable, and each is marked "Coming
 * soon". When the CMS/blog is built, give each entry a real `slug` and this
 * component starts linking out with no other change needed.
 */
export type InsightDraft = {
  id: string
  title: string
  excerpt: string
  image: string
}

export const insightDrafts: InsightDraft[] = [
  {
    id: 'evaluating-oem-manufacturers',
    title: 'What to check before choosing an OEM furniture manufacturer',
    excerpt:
      'Capacity, quality process, and the questions worth asking before you commit a production line to a partner.',
    image: 'insights/evaluating-oem-manufacturers.webp',
  },
  {
    id: 'foam-density-explained',
    title: 'Foam density in motion furniture, explained',
    excerpt:
      'Why density and recovery matter more than thickness, and how it affects a chair after 10,000 recline cycles.',
    image: 'insights/foam-density-explained.webp',
  },
  {
    id: 'cinema-seating-buyers-guide',
    title: 'A buyer’s guide to cinema seating specifications',
    excerpt:
      'Row spacing, recline travel, accessories and duty cycle, what an auditorium fit-out actually needs to spec.',
    image: 'insights/cinema-seating-buyers-guide.webp',
  },
]
