import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import PlaceholderImage from './PlaceholderImage'
import { insightArticles } from '../data/insights'

/** A preview of the three published Insights articles, linking to each full page. */
export default function InsightsTeaser() {
  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {insightArticles.map((post, i) => (
        <Reveal as="li" key={post.id} delay={i * 80}>
          <Link
            to={`/insights/${post.id}`}
            className="glass glass-hover group flex h-full flex-col overflow-hidden"
          >
            <PlaceholderImage
              path={post.image}
              label="Article image"
              recommended="1200 × 800"
              alt=""
              aspect="3 / 2"
              framed={false}
              className="w-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-6">
              <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-400">
                {post.readingTime}
              </span>
              <h3 className="mt-3 font-display text-lg leading-snug text-ink-900">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
