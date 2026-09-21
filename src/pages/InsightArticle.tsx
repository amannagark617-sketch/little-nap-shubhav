import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PlaceholderImage from '../components/PlaceholderImage'
import { IconArrowRight } from '../components/Icons'
import { insightArticles } from '../data/insights'

function setMetaDescription(content: string) {
  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function InsightArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = insightArticles.find((a) => a.id === slug)
  const others = insightArticles.filter((a) => a.id !== slug).slice(0, 2)

  useEffect(() => {
    if (!article) return
    document.title = `${article.title}, Little Nap Subhav India Pvt. Ltd.`
    setMetaDescription(article.metaDescription)
    return () => setMetaDescription('')
  }, [article])

  if (!article) return <Navigate to="/insights" replace />

  const published = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <article className="section pb-14 pt-14 sm:pt-20">
        <div className="container-page">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-ink-400">
              <Link to="/insights" className="hover:text-ink-700">
                Insights
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink-600">{article.title}</span>
            </nav>
          </Reveal>

          <div className="mx-auto mt-8 max-w-3xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                <time dateTime={article.publishedAt}>{published}</time>
                <span className="mx-2">·</span>
                {article.readingTime}
              </p>
              <h1 className="mt-4 font-display text-[2.1rem] leading-[1.12] text-ink-900 sm:text-[2.8rem]">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">{article.excerpt}</p>
            </Reveal>

            <Reveal delay={150}>
              <PlaceholderImage
                path={article.image}
                label="Article hero image"
                recommended="1600 × 1000"
                alt={article.title}
                aspect="16 / 10"
                className="mt-9 w-full rounded-2xl"
              />
            </Reveal>

            <div className="mt-10 space-y-9">
              {article.sections.map((section, i) => (
                <Reveal key={section.heading} delay={i * 60}>
                  <h2 className="font-display text-xl text-ink-900 sm:text-2xl">
                    {section.heading}
                  </h2>
                  {section.body.map((para) => (
                    <p key={para.slice(0, 40)} className="mt-4 leading-[1.8] text-ink-600">
                      {para}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-3 leading-relaxed text-ink-600">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-12 rounded-2xl border border-accent-200/70 bg-accent-50/70 p-8 backdrop-blur-xl">
                <p className="leading-relaxed text-ink-700">
                  <strong className="font-semibold text-ink-900">
                    Specifying a programme of your own?
                  </strong>{' '}
                  Tell us the models, the volumes and the timeline and we will
                  come back with a specification and an honest production
                  schedule.
                </p>
                <Link to="/contact" className="group btn-primary mt-6">
                  Start an enquiry
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section pt-0">
          <div className="container-page">
            <div className="mx-auto max-w-3xl border-t border-ink-100 pt-10">
              <p className="eyebrow">Read next</p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {others.map((post) => (
                  <li key={post.id}>
                    <Link
                      to={`/insights/${post.id}`}
                      className="glass glass-hover block h-full p-6"
                    >
                      <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-400">
                        {post.readingTime}
                      </span>
                      <h3 className="mt-2 font-display text-lg leading-snug text-ink-900">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
