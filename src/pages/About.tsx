import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import { IconArrowRight, iconMap } from '../components/Icons'
import {
  capability,
  clients,
  company,
  culture,
  differentiators,
  mission,
  partnership,
  stats,
  vision,
} from '../data/company'
import { brandImage } from '../data/factory'

export default function About() {
  useEffect(() => {
    document.title = 'About — Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Comfort, engineered
            <br />
            in central India.
          </>
        }
        lede={`${company.legalName} designs and manufactures motion furniture from Dewas, Madhya Pradesh — supplying recliners, motion sofas, cinema seating and sofa beds to brands under their own name.`}
      />

      {/* ---- Vision & mission ---- */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8">
              <div className="rule-gold" />
              <h2 className="mt-6 font-display text-2xl text-navy-900">Our vision</h2>
              <p className="mt-4 flex-1 text-lg leading-relaxed text-navy-600">{vision}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-navy-950 p-8 text-white">
              <div className="rule-gold" />
              <h2 className="mt-6 font-display text-2xl text-white">Our mission</h2>
              <p className="mt-4 flex-1 text-lg leading-relaxed text-navy-200">{mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Numbers ---- */}
      <section className="border-y border-navy-100 bg-white">
        <div className="container-page grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="border-l-2 border-gold-400 pl-5">
                <p className="font-display text-4xl text-navy-900">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm font-semibold text-navy-800">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-navy-400">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Women-led workforce ---- */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div>
              <p className="eyebrow">Our unique strength</p>
              <h2 className="h-section">A women-led factory floor.</h2>
              <p className="lede">
                More than 80% of our workforce are women. That is not a statistic we
                arrived at by accident — it is the result of deliberate recruitment,
                training and skill development, and it shapes how the plant runs.
              </p>
              <ul className="mt-8 space-y-3.5">
                {capability.workforce.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-navy-600">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-10 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0
                           bg-[radial-gradient(circle_at_50%_30%,rgba(211,163,32,0.2),transparent_65%)]"
              />
              <p className="relative font-display text-7xl text-gold-400">
                <Counter to={80} suffix="%+" />
              </p>
              <p className="relative mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy-200">
                Of our workforce are women
              </p>
              <p className="relative mx-auto mt-6 max-w-sm text-sm leading-relaxed text-navy-300">
                Committed to diversity, inclusion and sustainable social impact — in
                a sector where it remains the exception.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- What sets us apart ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">What sets us apart</p>
            <h2 className="h-section">Five reasons brands stay with us.</h2>
          </Reveal>

          <ul className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => {
              const Icon = iconMap[d.icon]
              return (
                <Reveal as="li" key={d.title} delay={i * 70}>
                  <div className="card-hover h-full">
                    <Icon className="h-7 w-7 text-gold-500" />
                    <h3 className="mt-4 font-display text-lg text-navy-900">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">{d.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---- Culture ---- */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Celebrating our journey</p>
              <h2 className="h-section">A plant worth working at.</h2>
              <p className="lede">
                Safety training, health check-ups, recognition and the celebrations
                that mark a year together. The culture on the floor is what keeps
                skilled people here — and skilled people are what keep quality
                consistent.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {culture.map((c) => (
                <li
                  key={c}
                  className="rounded-xl border border-navy-100 bg-white px-5 py-4 text-sm
                             font-medium text-navy-700"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Partnership ---- */}
      <section className="section bg-navy-950 text-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow-light">How we work together</p>
              <h2 className="h-section text-white">
                What a long-term partnership looks like.
              </h2>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partnership.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <div className="h-full border-t border-white/15 pt-6">
                  <h3 className="font-display text-xl text-white">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-200">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Clients ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Our clients</p>
            <h2 className="h-section">Brands we manufacture for.</h2>
            <p className="lede">
              Much of what we build carries someone else's label — which is rather
              the point of a good OEM partner.
            </p>
          </Reveal>

          <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((name, i) => (
              <Reveal as="li" key={name} delay={i * 50}>
                <div
                  className="flex h-full items-center justify-center rounded-2xl border
                             border-navy-100 bg-sand-50 px-5 py-9 text-center transition-colors
                             hover:border-gold-200"
                >
                  <span className="font-display text-xl text-navy-700">{name}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 sm:px-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full
                           bg-[radial-gradient(circle,rgba(211,163,32,0.2),transparent_65%)]"
              />
              <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                  <h2 className="font-display text-3xl text-white sm:text-4xl">
                    Let's build something together.
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-navy-200">
                    Whether you need an existing model private-labelled or a new one
                    developed from scratch, the conversation starts the same way.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to="/contact" className="btn-gold">
                    Get in touch
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/manufacturing" className="btn-ghost-light">
                    See the factory
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Preloads the hero artwork used elsewhere on the site. */}
      <link rel="prefetch" href={brandImage('hero-arc.webp')} />
    </>
  )
}
