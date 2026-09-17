import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
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
  differentiators,
  positioningStatement,
  productFeatures,
  stats,
  vision,
} from '../data/company'
import { brandImage } from '../data/factory'
import { productImage, products, ranges } from '../data/products'

const disciplineIcons = [IconRecliner, IconSofa, IconCinema, IconSofaBed]

/** One representative model per range, for the range navigator. */
const rangePreview = ranges.map((r) => ({
  range: r,
  hero: products.find((p) => p.range === r.id)!,
  count: products.filter((p) => p.range === r.id).length,
}))

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full
                     bg-[radial-gradient(circle,rgba(211,163,32,0.14),transparent_62%)]"
        />

        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow-light">Little Nap Subhav India Pvt. Ltd.</p>

            <h1 className="mt-6 font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.75rem]">
              Where production
              <br />
              meets <span className="text-gold-400">passion.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
              We engineer and manufacture world-class motion furniture — recliners,
              motion sofas, cinema seating and sofa beds — for brands that need
              consistent quality at volume. Built in Dewas, Madhya Pradesh.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="btn-gold">
                Explore the catalogue
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/manufacturing" className="btn-ghost-light">
                Inside the factory
              </Link>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {company.disciplines.map((d, i) => {
                const Icon = disciplineIcons[i]
                return (
                  <li key={d} className="flex flex-col gap-2.5">
                    <Icon className="h-7 w-7 text-gold-400" />
                    <span className="text-[0.78rem] font-medium leading-snug text-navy-200">
                      {d}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <img
                src={brandImage('hero-arc.webp')}
                alt="A Little Nap Subhav power recliner in a contemporary living room"
                width={1100}
                height={1348}
                className="w-full rounded-2xl object-cover"
                fetchPriority="high"
              />
            </div>
          </Reveal>
        </div>

        {/* Brand pillars strip */}
        <div className="relative border-t border-white/10">
          <div className="container-page grid gap-px py-2 sm:grid-cols-2 lg:grid-cols-4">
            {brandPillars.map((pillar) => {
              const Icon = iconMap[pillar.icon]
              return (
                <div key={pillar.title} className="flex items-center gap-3 px-1 py-5">
                  <Icon className="h-6 w-6 shrink-0 text-gold-400" />
                  <span className="text-sm font-medium text-navy-100">{pillar.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-b border-navy-100 bg-white">
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

      {/* ================= POSITIONING ================= */}
      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="eyebrow">Why Little Nap Subhav</p>
              <h2 className="h-section">
                A manufacturing partner, not just a supplier.
              </h2>
              <p className="lede">{positioningStatement}</p>
              <Link to="/about" className="btn-outline mt-8">
                About the company
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
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

      {/* ================= RANGES ================= */}
      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">The catalogue</p>
                <h2 className="h-section">Eight ranges, {products.length} models.</h2>
                <p className="lede">
                  From high-volume entry recliners through to full-flat cinema
                  loungers — every range is built on the same frame, foam and
                  mechanism discipline.
                </p>
              </div>
              <Link to="/products" className="btn-outline shrink-0">
                View all
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rangePreview.map(({ range, hero, count }, i) => (
              <Reveal as="li" key={range.id} delay={i * 60}>
                <Link
                  to={`/products?range=${range.id}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-navy-100
                             bg-sand-50 transition-all duration-300 hover:-translate-y-1
                             hover:border-gold-200
                             hover:shadow-[0_20px_44px_-24px_rgba(21,27,83,0.4)]"
                >
                  <div className="aspect-[5/4] overflow-hidden bg-sand-100">
                    <img
                      src={productImage(hero.image)}
                      alt={`${range.name} range`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700
                                 group-hover:scale-[1.05]"
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

      {/* ================= CONSTRUCTION ================= */}
      <section className="section bg-navy-950 text-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow-light">Built into every unit</p>
              <h2 className="h-section text-white">
                The four things that decide whether a recliner lasts.
              </h2>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productFeatures.map((f, i) => {
              const Icon = iconMap[f.icon]
              return (
                <Reveal as="li" key={f.title} delay={i * 80}>
                  <div className="h-full border-t border-white/15 pt-6">
                    <Icon className="h-8 w-8 text-gold-400" />
                    <h3 className="mt-5 font-display text-xl text-white">{f.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-navy-200">{f.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Link to="/quality" className="btn-gold">
                How we inspect
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/manufacturing" className="btn-ghost-light">
                See the process
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mx-auto rule-gold" />
              <blockquote className="mt-8 font-display text-2xl leading-[1.4] text-navy-900 sm:text-[2rem]">
                “{vision}”
              </blockquote>
              <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
                Our vision
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ================= CLIENTS ================= */}
      <section className="border-y border-navy-100 bg-white py-14">
        <div className="container-page">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
            Manufacturing for
          </p>
        </div>
        <div className="marquee-mask relative mt-8 overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-14 pr-14">
            {[...clients, ...clients].map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= clients.length}
                className="whitespace-nowrap font-display text-2xl text-navy-300
                           transition-colors hover:text-navy-700"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
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
                    Tell us what you need built.
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-navy-200">
                    Build a list of the models you want quoted, or send us your own
                    drawings. We will come back with a specification, a sample plan
                    and a production schedule.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to="/contact" className="btn-gold">
                    Start an enquiry
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/products" className="btn-ghost-light">
                    Browse models
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
