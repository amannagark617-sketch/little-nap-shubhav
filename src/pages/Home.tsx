import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Aurora from '../components/Aurora'
import SplitText from '../components/SplitText'
import Parallax from '../components/Parallax'
import FacilitySection from '../components/FacilitySection'
import MapPanel from '../components/MapPanel'
import {
  IconArrowRight,
  IconCinema,
  IconRecliner,
  IconSofa,
  IconSofaBed,
  iconMap,
} from '../components/Icons'
import {
  brandPillars,
  clients,
  company,
  culture,
  differentiators,
  mission,
  positioningStatement,
  stats,
  vision,
} from '../data/company'
import { brandImage } from '../data/factory'
import { productImage, products, ranges } from '../data/products'

const disciplineIcons = [IconRecliner, IconSofa, IconCinema, IconSofaBed]

const rangePreview = ranges.map((r) => ({
  range: r,
  hero: products.find((p) => p.range === r.id)!,
  count: products.filter((p) => p.range === r.id).length,
}))

export default function Home() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden">
        <Aurora tone="signature" intensity="rich" />

        <div className="container-page relative grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.02fr_1fr] lg:pb-28 lg:pt-16">
          <div>
            <Reveal>
              <span className="glass inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-600">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Est. in Dewas, Madhya Pradesh
              </span>
            </Reveal>

            <h1 className="mt-7 font-display text-[2.7rem] leading-[1.05] text-navy-900 sm:text-[3.4rem] lg:text-[4.1rem]">
              <SplitText as="span" className="block">
                Where production
              </SplitText>
              <span className="mt-1 block">
                <SplitText as="span" delay={180}>
                  meets
                </SplitText>{' '}
                <span className="text-gilded">passion.</span>
              </span>
            </h1>

            <Reveal delay={320}>
              <p className="mt-8 max-w-xl text-lg leading-[1.75] text-navy-500">
                {company.legalName} engineers and manufactures world-class motion
                furniture — recliners, motion sofas, cinema seating and sofa beds —
                for brands that need consistent quality at volume.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/about" className="btn-primary">
                  Our story
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/manufacturing" className="btn-glass">
                  Inside the plant
                </Link>
              </div>
            </Reveal>

            <Reveal delay={520}>
              <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {company.disciplines.map((d, i) => {
                  const Icon = disciplineIcons[i]
                  return (
                    <li key={d} className="glass glass-hover p-4">
                      <Icon className="h-7 w-7 text-gold-500" />
                      <span className="mt-3 block text-[0.78rem] font-medium leading-snug text-navy-700">
                        {d}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          {/* Hero image with a floating glass credential card */}
          <Reveal delay={200}>
            <div className="relative">
              <Parallax strength={26}>
                <div className="overflow-hidden rounded-[2rem] border border-white/60 shadow-glass-lg">
                  <img
                    src={brandImage('hero-portrait.webp')}
                    alt="A Little Nap Subhav power recliner in a contemporary living room"
                    width={1200}
                    height={1462}
                    fetchPriority="high"
                    className="w-full object-cover"
                  />
                </div>
              </Parallax>

              {/* Sits over a warm photograph, so this panel is near-opaque —
                  a translucent one would blur the leather and rug through it
                  and read as a cream card. */}
              <div className="glass-strong absolute bottom-5 left-5 w-[14.5rem] animate-float !bg-white/[0.94] p-5">
                <p className="font-display text-4xl text-navy-900">
                  <Counter to={3200} />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-600">
                  Seats per month
                </p>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">
                  Current monthly manufacturing capacity
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Brand pillars */}
        <div className="container-page relative pb-8">
          <Reveal>
            <ul className="glass grid gap-px p-2 sm:grid-cols-2 lg:grid-cols-4">
              {brandPillars.map((pillar) => {
                const Icon = iconMap[pillar.icon]
                return (
                  <li
                    key={pillar.title}
                    className="flex items-center gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-white/50"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-gold-500" />
                    <span className="text-sm font-medium text-navy-700">{pillar.title}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ WHO WE ARE ═══════════════ */}
      <section className="section relative overflow-hidden">
        <Aurora tone="indigo" intensity="subtle" />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow justify-center">Who we are</p>
            </Reveal>
            <SplitText
              as="h2"
              className="h-section mt-5 block"
              stagger={45}
            >
              A manufacturing partner, not just a supplier.
            </SplitText>
            <Reveal delay={200}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-[1.8] text-navy-500">
                {positioningStatement}
              </p>
            </Reveal>
          </div>

          {/* Vision / mission as facing glass panels */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="glass glass-hover h-full p-9">
                <div className="rule-gold" />
                <h3 className="mt-6 font-display text-2xl text-navy-900">Our vision</h3>
                <p className="mt-4 text-[1.05rem] leading-[1.8] text-navy-600">{vision}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="glass glass-hover h-full p-9">
                <div className="rule-gold" />
                <h3 className="mt-6 font-display text-2xl text-navy-900">Our mission</h3>
                <p className="mt-4 text-[1.05rem] leading-[1.8] text-navy-600">{mission}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ THE PLACE ═══════════════ */}
      {/* Renders only once the client's facility photographs are present. */}
      <FacilitySection
        eyebrow="The place"
        title="Come and see where it is made."
        lede="A purpose-built plant and a showroom stocked with the full range — so a buyer can walk the line in the morning and sit in every model by the afternoon."
        className="bg-gradient-to-b from-porcelain-200/50 via-porcelain-50 to-porcelain-200/50"
      />

      {/* ═══════════════ NUMBERS ═══════════════ */}
      <section className="section relative overflow-hidden">
        <Aurora tone="mixed" intensity="normal" />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">By the numbers</p>
              <h2 className="h-section">Built to hold a schedule.</h2>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 90}>
                <div className="glass glass-hover h-full p-7">
                  <p className="font-display text-[2.75rem] leading-none text-navy-900">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-sm font-semibold text-navy-800">{s.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-400">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ WOMEN-LED ═══════════════ */}
      <section className="section relative overflow-hidden">
        <div className="container-page relative">
          <Reveal>
            <div className="glass-strong relative overflow-hidden p-10 sm:p-14">
              <Aurora tone="azure" intensity="normal" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="eyebrow">Our unique strength</p>
                  <h2 className="h-section">A women-led factory floor.</h2>
                  <p className="lede">
                    More than 80% of our workforce are women. That is not an accident
                    of hiring — it is the result of deliberate recruitment, training
                    and skill development, and it shapes how the whole plant runs.
                  </p>
                  <Link to="/about" className="btn-glass mt-8">
                    More about our people
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="text-center">
                  <p className="font-display text-[5.5rem] leading-none text-gilded sm:text-[7rem]">
                    <Counter to={80} suffix="%" />
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                    of our workforce
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-porcelain-200/45 to-transparent">
        <Aurora tone="indigo" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Why Little Nap Subhav</p>
              <h2 className="h-section">Five reasons brands stay with us.</h2>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => {
              const Icon = iconMap[d.icon]
              return (
                <Reveal as="li" key={d.title} delay={i * 80}>
                  <div className="glass glass-hover group h-full p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-gold-200/60 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-gold-600" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-navy-900">{d.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-navy-500">{d.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ═══════════════ CULTURE ═══════════════ */}
      <section className="section relative overflow-hidden">
        <div className="container-page relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Celebrating our journey</p>
              <h2 className="h-section">A plant worth working at.</h2>
              <p className="lede">
                Safety training, health check-ups, recognition and the celebrations
                that mark a year together. Culture on the floor is what keeps skilled
                people here — and skilled people are what keep quality consistent.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {culture.map((c, i) => (
                <li
                  key={c}
                  className="glass glass-hover px-5 py-4 text-sm font-medium text-navy-700"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ WHAT WE BUILD (products, well down the page) ═══════════════ */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-transparent via-porcelain-200/50 to-transparent">
        <Aurora tone="mixed" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">What we build</p>
                <h2 className="h-section">
                  Eight ranges, {products.length} models.
                </h2>
                <p className="lede">
                  From high-volume entry recliners through to full-flat cinema
                  loungers — all on the same frame, foam and mechanism discipline.
                </p>
              </div>
              <Link to="/products" className="btn-glass shrink-0">
                Full catalogue
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rangePreview.map(({ range, hero, count }, i) => (
              <Reveal as="li" key={range.id} delay={i * 70}>
                <Link
                  to={`/products?range=${range.id}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-white/60
                             bg-white/55 shadow-glass backdrop-blur-xl transition-all duration-500
                             hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-glass-lg"
                >
                  <div className="aspect-[5/4] overflow-hidden bg-porcelain-100">
                    <img
                      src={productImage(hero.image)}
                      alt={`${range.name} range`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1.2s]
                                 group-hover:scale-[1.07]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-navy-900">{range.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-600">
                      {range.positioning}
                    </p>
                    <p className="mt-3 text-xs text-navy-400">
                      {count} model{count === 1 ? '' : 's'}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ CLIENTS ═══════════════ */}
      <section className="relative overflow-hidden py-16">
        <div className="container-page">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-navy-400">
            Manufacturing for
          </p>
        </div>
        <div className="marquee-mask relative mt-9 overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-16 pr-16">
            {[...clients, ...clients].map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= clients.length}
                className="whitespace-nowrap font-display text-2xl text-navy-300
                           transition-colors duration-300 hover:text-navy-700"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ FIND US ═══════════════ */}
      <section className="section relative overflow-hidden">
        <Aurora tone="azure" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Find us</p>
              <h2 className="h-section">Dewas, Madhya Pradesh.</h2>
              <p className="lede">
                Centrally located with quick access to Indore, two dry ports and
                overnight reach to the major shipping ports.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <MapPanel />
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal>
            <div className="glass-strong relative overflow-hidden px-8 py-16 text-center sm:px-14">
              <Aurora tone="signature" intensity="rich" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-display text-[2rem] leading-tight text-navy-900 sm:text-[2.75rem]">
                  Tell us what you need built.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy-500">
                  Send us your drawings, or build a list of the models you want
                  quoted. We will come back with a specification, a sample plan and
                  a production schedule.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" className="btn-gold">
                    Start an enquiry
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/products" className="btn-glass">
                    Browse the catalogue
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
