import Reveal from './Reveal'
import PlaceholderImage from './PlaceholderImage'
import { insightDrafts } from '../data/insights'

/**
 * A preview of the Insights/blog section, before the blog exists.
 *
 * Cards are deliberately not links — there is nowhere for them to go yet.
 * Each carries a plain "Coming soon" pill instead of pretending otherwise.
 * Once real articles exist, give each draft a `slug`, wrap the card in a
 * <Link>, and drop the pill.
 */
export default function InsightsTeaser() {
  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {insightDrafts.map((post, i) => (
        <Reveal as="li" key={post.id} delay={i * 80}>
          <div className="glass flex h-full flex-col overflow-hidden">
            <PlaceholderImage
              path={post.image}
              label="Article image"
              recommended="1200 × 800"
              alt=""
              aspect="3 / 2"
              framed={false}
              className="w-full"
            />
            <div className="flex flex-1 flex-col p-6">
              <span
                className="w-fit rounded-full bg-ink-50 px-2.5 py-1 text-[0.68rem]
                           font-semibold uppercase tracking-wider text-ink-400"
              >
                Coming soon
              </span>
              <h3 className="mt-3 font-display text-lg leading-snug text-ink-900">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
