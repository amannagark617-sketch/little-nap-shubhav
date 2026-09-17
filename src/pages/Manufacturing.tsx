import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Lightbox from '../components/Lightbox'
import Aurora from '../components/Aurora'
import { IconArrowRight, IconChevron } from '../components/Icons'
import { factoryImage, processSteps, stageOrder } from '../data/factory'
import { capability } from '../data/company'

export default function Manufacturing() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Manufacturing — Little Nap Subhav India Pvt. Ltd.'
  }, [])

  const step = processSteps[active]

  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title={
          <>
            Twelve process areas.
            <br />
            One continuous line.
          </>
        }
        lede="Material enters as ply, foam and fabric and leaves as a coded, inspected, boxed unit. Here is every stage it passes through on the way."
      />

      {/* ---- Interactive process walkthrough ---- */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">The process</p>
            <h2 className="h-section">Follow a unit through the plant.</h2>
            <p className="lede">
              Select any stage to see what happens there and why it matters to the
              finished chair.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[22rem_1fr]">
            {/* Stage list */}
            <div className="space-y-6">
              {stageOrder.map((stage) => {
                const steps = processSteps.filter((s) => s.stage === stage)
                if (steps.length === 0) return null
                return (
                  <div key={stage}>
                    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-600">
                      {stage}
                    </h3>
                    <ul className="mt-2.5 space-y-1.5">
                      {steps.map((s) => {
                        const index = processSteps.indexOf(s)
                        const isActive = index === active
                        return (
                          <li key={s.id}>
                            <button
                              type="button"
                              onClick={() => setActive(index)}
                              aria-current={isActive ? 'step' : undefined}
                              className={`flex w-full items-center justify-between gap-3 rounded-xl
                                          px-4 py-3 text-left text-sm font-medium transition-all ${
                                            isActive
                                              ? 'bg-navy-900 text-white shadow-lift'
                                              : 'text-navy-600 hover:bg-white/70'
                                          }`}
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  className={`font-mono text-xs ${
                                    isActive ? 'text-gold-400' : 'text-navy-300'
                                  }`}
                                >
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                {s.name}
                              </span>
                              <IconChevron
                                className={`h-4 w-4 shrink-0 transition-transform ${
                                  isActive ? 'translate-x-0.5 text-gold-400' : 'text-navy-200'
                                }`}
                              />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>

            {/* Active stage detail */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="glass overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden bg-sand-100">
                  <img
                    key={step.id}
                    src={factoryImage(step.image)}
                    alt={`${step.name} at the Little Nap Subhav plant`}
                    className="h-full w-full animate-fade-in object-cover"
                  />
                </div>
                <div className="p-7">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-600">
                    Stage {active + 1} of {processSteps.length} · {step.stage}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-navy-900">{step.name}</h3>
                  <p className="mt-3 leading-relaxed text-navy-500">{step.body}</p>

                  <div className="mt-7 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActive((i) => (i - 1 + processSteps.length) % processSteps.length)}
                      className="text-sm font-semibold text-navy-500 transition-colors hover:text-navy-900"
                    >
                      ← Previous
                    </button>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-navy-100">
                      <div
                        className="h-full rounded-full bg-gold-400 transition-[width] duration-500"
                        style={{ width: `${((active + 1) / processSteps.length) * 100}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setActive((i) => (i + 1) % processSteps.length)}
                      className="text-sm font-semibold text-navy-800 transition-colors hover:text-gold-600"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Capability ---- */}
      <section className="section relative overflow-hidden">
        <Aurora tone="mixed" intensity="subtle" />
        <div className="container-page relative grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow">Capability</p>
              <h2 className="h-section">{capability.headline}</h2>
              <p className="mt-8 font-display text-6xl text-gilded">
                <Counter to={3200} />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-navy-500">
                Seats per month
              </p>
              <ul className="mt-9 space-y-3.5">
                {capability.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-navy-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass p-9">
              <h3 className="font-display text-2xl text-navy-900">
                {capability.workforce.headline}
              </h3>
              <p className="mt-7 font-display text-6xl text-gilded">
                <Counter to={80} suffix="%+" />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-navy-500">
                Of our workforce are women
              </p>
              <ul className="mt-9 space-y-3.5">
                {capability.workforce.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-navy-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Gallery ---- */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-sand-100/60 to-transparent">
        <Aurora tone="warm" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">Inside the plant</p>
            <h2 className="h-section">The floor, area by area.</h2>
            <p className="lede">Select any photograph to view it larger.</p>
          </Reveal>

          <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 3) * 70}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group block w-full overflow-hidden rounded-2xl border border-white/60
                             bg-white/55 text-left shadow-glass backdrop-blur-xl transition-all
                             duration-500 hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-glass-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-sand-100">
                    <img
                      src={factoryImage(s.image)}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700
                                 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="font-display text-lg text-navy-900">{s.name}</span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-gold-600">
                      {s.stage}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="font-display text-3xl text-navy-900 sm:text-4xl">
              Want to see it in person?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-500">
              We host buyers and technical teams at the Dewas plant. Tell us when
              works and we will arrange a walkthrough of the full line.
            </p>
            <Link to="/contact" className="btn-primary mt-8">
              Arrange a factory visit
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Lightbox
        items={processSteps.map((s) => ({
          src: factoryImage(s.image),
          title: s.name,
          caption: s.body,
        }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </>
  )
}
