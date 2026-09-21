import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PlaceholderImage from '../components/PlaceholderImage'
import Aurora from '../components/Aurora'
import { insightArticles } from '../data/insights'

export default function Insights() {
  useEffect(() => {
    document.title = 'Insights, Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <>
      <section className="section relative overflow-hidden pb-14 pt-14 sm:pt-20">
        <Aurora tone="azure" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">Insights</p>
          </Reveal>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] leading-[1.08] text-ink-900 sm:text-[3.2rem]">
            Notes on manufacturing, materials and specification.
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
              What we have learned building recliners, motion sofas, cinema
              seating and sofa beds at volume, written for the people who have
              to specify or buy them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="mt-3 font-display text-lg leading-snug text-ink-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
