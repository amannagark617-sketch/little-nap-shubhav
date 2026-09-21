import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import { IconArrowRight, iconMap } from '../components/Icons'
import Aurora from '../components/Aurora'
import FacilitySection from '../components/FacilitySection'
import PlaceholderImage from '../components/PlaceholderImage'
import { brandImage } from '../data/factory'
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

export default function About() {
  useEffect(() => {
    document.title = 'About, Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <>
      {/* ---- Hero: full-bleed, centered ---- */}
      <section className="relative flex h-[68vh] min-h-[440px] w-full items-center overflow-hidden">
        <img
          src={brandImage('hero-portrait.webp')}
          alt="A Little Nap Subhav recliner in a contemporary living room"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink-950/70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/40"
        />
        <div className="container-page relative text-center">
          <Reveal>
            <p className="eyebrow-light justify-center">About us</p>
          </Reveal>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-[2.4rem] leading-[1.08] text-white sm:text-[3.2rem] lg:text-[3.8rem]">
            Comfort, engineered
            <br />
            in central India.
          </h1>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {company.legalName} designs and manufactures motion furniture from
              Dewas, Madhya Pradesh, supplying recliners, motion sofas, cinema
              seating and sofa beds to brands under their own name.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Vision & mission ---- */}
      <section className="section relative overflow-hidden">
        <Aurora tone="azure" intensity="subtle" />
        <div className="container-page relative grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="glass glass-hover flex h-full flex-col p-9">
              <div className="rule-accent" />
              <h2 className="mt-6 font-display text-2xl text-ink-900">Our vision</h2>
              <p className="mt-4 flex-1 text-lg leading-relaxed text-ink-600">{vision}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="glass glass-hover flex h-full flex-col p-9">
              <div className="rule-accent" />
              <h2 className="mt-6 font-display text-2xl text-ink-900">Our mission</h2>
              <p className="mt-4 flex-1 text-lg leading-relaxed text-ink-600">{mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Numbers ---- */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="glass glass-hover h-full p-6">
                <p className="font-display text-4xl text-ink-900">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink-800">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-400">{s.detail}</p>
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
                arrived at by accident, it is the result of deliberate recruitment,
                training and skill development, and it shapes how the plant runs.
              </p>
              <ul className="mt-8 space-y-3.5">
                {capability.workforce.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-ink-600">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <PlaceholderImage
                path="culture/women-led-floor.webp"
                label="The women-led floor"
                recommended="1200 × 900"
                alt="Women on the Little Nap Subhav production floor"
                aspect="4 / 3"
                className="w-full rounded-2xl"
              />
              <div className="glass-strong relative overflow-hidden p-8 text-center">
                <Aurora tone="signature" intensity="rich" />
                <p className="relative font-display text-5xl text-emphasis">
                  <Counter to={80} suffix="%+" />
                </p>
                <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Of our workforce are women
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- What sets us apart ---- */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-porcelain-200/45 to-transparent">
        <Aurora tone="indigo" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">What sets us apart</p>
            <h2 className="h-section">Five reasons brands stay with us.</h2>
          </Reveal>

          <ul className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => {
              const Icon = iconMap[d.icon]
              return (
                <Reveal as="li" key={d.title} delay={i * 70}>
                  <div className="glass glass-hover h-full p-7">
                    <Icon className="h-7 w-7 text-accent-500" />
                    <h3 className="mt-4 font-display text-lg text-ink-900">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{d.body}</p>
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
                skilled people here, and skilled people are what keep quality
                consistent.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <PlaceholderImage
                path="culture/team-celebration.webp"
                label="A celebration on the floor"
                recommended="1400 × 900"
                alt="Little Nap Subhav team celebrating together"
                aspect="16 / 10"
                className="w-full rounded-2xl"
              />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {culture.map((c) => (
                  <li key={c} className="glass glass-hover px-5 py-4 text-sm font-medium text-ink-700">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- The plant and showroom ---- */}
      {/* Renders only once the client's facility photographs are present. */}
      <FacilitySection
        eyebrow="The place"
        title="Our plant and showroom."
        lede="A purpose-built facility in Dewas with a showroom stocked across every range, so a visiting buyer can walk the line and sit in the models on the same day."
        className="bg-gradient-to-b from-porcelain-200/55 to-transparent"
      />

      {/* ---- Partnership ---- */}
      <section className="section relative overflow-hidden">
        <Aurora tone="mixed" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">How we work together</p>
              <h2 className="h-section">What a long-term partnership looks like.</h2>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partnership.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <div className="glass glass-hover h-full p-7">
                  <h3 className="font-display text-xl text-ink-900">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Clients ---- */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-porcelain-200/45 to-transparent">
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">Our clients</p>
            <h2 className="h-section">Brands we manufacture for.</h2>
            <p className="lede">
              Much of what we build carries someone else's label, which is rather
              the point of a good OEM partner.
            </p>
          </Reveal>

          <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((name, i) => (
              <Reveal as="li" key={name} delay={i * 50}>
                <div className="glass glass-hover flex h-full items-center justify-center px-5 py-9 text-center">
                  <span className="font-display text-xl text-ink-700">{name}</span>
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
            <div className="glass-strong relative overflow-hidden px-8 py-16 sm:px-14">
              <Aurora tone="signature" intensity="rich" />
              <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                  <h2 className="font-display text-3xl text-ink-900 sm:text-4xl">
                    Let's build something together.
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-500">
                    Whether you need an existing model private-labelled or a new one
                    developed from scratch, the conversation starts the same way.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to="/contact" className="btn-secondary">
                    Get in touch
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/manufacturing" className="btn-glass">
                    See the factory
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


    </>
  )
}
