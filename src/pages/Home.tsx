import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Aurora from '../components/Aurora'
import SplitText from '../components/SplitText'
import FacilitySection from '../components/FacilitySection'
import MapPanel from '../components/MapPanel'
import RangeQuickNav from '../components/RangeQuickNav'
import CampaignCarousel from '../components/CampaignCarousel'
import ProcessSlider from '../components/ProcessSlider'
import PartnerBanner from '../components/PartnerBanner'
import InsightsTeaser from '../components/InsightsTeaser'
import PlaceholderImage from '../components/PlaceholderImage'
import { IconArrowRight, iconMap } from '../components/Icons'
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

const rangePreview = ranges.map((r) => ({
  range: r,
  hero: products.find((p) => p.range === r.id)!,
  count: products.filter((p) => p.range === r.id).length,
}))

export default function Home() {
  return (
    <>
      {/* ═══════════════ HERO — full-bleed banner ═══════════════ */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden sm:h-[85vh]">
        <img
          src={brandImage('hero-photo.webp')}
          alt="A Little Nap Subhav power recliner in a contemporary living room"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/35 to-ink-950/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-ink-950/5 to-transparent"
        />

        <div className="container-page relative flex h-full flex-col justify-end pb-16 sm:pb-20">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              Est. in Dewas, Madhya Pradesh
            </span>
          </Reveal>

          <h1 className="mt-6 max-w-2xl font-display text-[2.6rem] leading-[1.05] text-white sm:text-[3.6rem] lg:text-[4.4rem]">
            <SplitText as="span" className="block">
              Where production
            </SplitText>
            <SplitText as="span" delay={180} className="mt-1 block">
              meets passion.
            </SplitText>
          </h1>

          <Reveal delay={320}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              {company.legalName} engineers and manufactures world-class motion
              furniture — recliners, motion sofas, cinema seating and sofa beds —
              for brands that need consistent quality at volume.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/about" className="btn bg-white text-ink-900 hover:-translate-y-0.5 hover:bg-white/90">
                Our story
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/manufacturing" className="btn-ghost-light">
                Inside the plant
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand pillars */}
      <section className="relative">
        <div className="container-page relative py-8">
          <Reveal>
            <ul className="glass grid gap-px p-2 sm:grid-cols-2 lg:grid-cols-4">
              {brandPillars.map((pillar) => {
                const Icon = iconMap[pillar.icon]
                return (
                  <li
                    key={pillar.title}
                    className="flex items-center gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-white/50"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-accent-500" />
                    <span className="text-sm font-medium text-ink-700">{pillar.title}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ QUICK NAV + CAMPAIGN BANNER ═══════════════ */}
      <section className="relative overflow-hidden pb-20 pt-4 sm:pb-28">
        <div className="container-page relative space-y-10">
          <Reveal>
            <RangeQuickNav />
          </Reveal>
          <Reveal delay={100}>
            <CampaignCarousel />
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
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-[1.8] text-ink-500">
                {positioningStatement}
              </p>
            </Reveal>
          </div>

          {/* Vision / mission as facing glass panels */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="glass glass-hover h-full p-9">
                <div className="rule-accent" />
                <h3 className="mt-6 font-display text-2xl text-ink-900">Our vision</h3>
                <p className="mt-4 text-[1.05rem] leading-[1.8] text-ink-600">{vision}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="glass glass-hover h-full p-9">
                <div className="rule-accent" />
                <h3 className="mt-6 font-display text-2xl text-ink-900">Our mission</h3>
                <p className="mt-4 text-[1.05rem] leading-[1.8] text-ink-600">{mission}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ INSIDE THE PLANT ═══════════════ */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">See it happen</p>
            <h2 className="h-section">Inside the plant.</h2>
            <p className="lede">
              Twelve real stages, from prototype to packed unit — the same walkthrough
              the Manufacturing page covers in full.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <ProcessSlider />
          </Reveal>
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
                  <p className="font-display text-[2.75rem] leading-none text-ink-900">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-sm font-semibold text-ink-800">{s.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-400">{s.detail}</p>
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
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
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
                <div>
                  <PlaceholderImage
                    path="culture/women-led-floor.webp"
                    label="The women-led floor"
                    recommended="1200 × 900"
                    alt="Women on the Little Nap Subhav production floor"
                    aspect="4 / 3"
                    className="w-full rounded-2xl"
                  />
                  <div className="mt-4 flex items-baseline gap-3">
                    <p className="font-display text-4xl leading-none text-emphasis">
                      <Counter to={80} suffix="%" />
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      of our workforce
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ PARTNER BANNER ═══════════════ */}
      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <PartnerBanner />
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
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-100 to-accent-200/60 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-accent-600" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink-900">{d.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{d.body}</p>
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
                {culture.map((c, i) => (
                  <li
                    key={c}
                    className="glass glass-hover px-5 py-4 text-sm font-medium text-ink-700"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
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
                    <h3 className="font-display text-lg text-ink-900">{range.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-600">
                      {range.positioning}
                    </p>
                    <p className="mt-3 text-xs text-ink-400">
                      {count} model{count === 1 ? '' : 's'}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ INSIGHTS ═══════════════ */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-porcelain-200/45 to-transparent">
        <Aurora tone="azure" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Insights</p>
              <h2 className="h-section">From the floor and the industry.</h2>
              <p className="lede">
                Notes on manufacturing, materials and specifying motion
                furniture at volume. The first pieces are in progress.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <InsightsTeaser />
          </div>
        </div>
      </section>

      {/* ═══════════════ CLIENTS ═══════════════ */}
      <section className="relative overflow-hidden py-16">
        <div className="container-page">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-400">
            Manufacturing for
          </p>
        </div>
        <div className="marquee-mask relative mt-9 overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-16 pr-16">
            {[...clients, ...clients].map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= clients.length}
                className="whitespace-nowrap font-display text-2xl text-ink-300
                           transition-colors duration-300 hover:text-ink-700"
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
                <h2 className="font-display text-[2rem] leading-tight text-ink-900 sm:text-[2.75rem]">
                  Tell us what you need built.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
                  Send us your drawings, or build a list of the models you want
                  quoted. We will come back with a specification, a sample plan and
                  a production schedule.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" className="btn-secondary">
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
