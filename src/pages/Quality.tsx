import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import PlaceholderImage from '../components/PlaceholderImage'
import { IconArrowRight, IconCheck, IconGear, IconSearch, IconShield, iconMap } from '../components/Icons'
import Aurora from '../components/Aurora'
import { productFeatures, qualityStages } from '../data/company'

/** One icon per stage, in order: sourcing, inward check, in-process control, final sign-off. */
const STAGE_ICONS = [IconGear, IconSearch, IconShield, IconCheck]
/** Matching photo slug per stage — same order as qualityStages. */
const STAGE_IMAGES = ['material-selection', 'inward-inspection', 'in-process-control', 'final-inspection']

export default function Quality() {
  useEffect(() => {
    document.title = 'Quality Assurance — Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Quality assurance"
        title={
          <>
            Four inspections
            <br />
            before it leaves the gate.
          </>
        }
        lede="Quality is checked where it is created, not only at the end. Material is approved before it is bought, inspected when it arrives, controlled while the unit is built, and recorded before dispatch."
      />

      {/* ---- The four stages ---- */}
      <section className="section relative overflow-hidden">
        <Aurora tone="signature" intensity="subtle" />
        <div className="container-page relative">
          <ol className="relative flex flex-col gap-8">
            {qualityStages.map((stage, i) => {
              const Icon = STAGE_ICONS[i % STAGE_ICONS.length]
              const flip = i % 2 === 1
              return (
                <Reveal as="li" key={stage.step} delay={i * 100} className="relative">
                  {/* The connector: a gradient thread running stage to stage,
                      not a flat grey rule — reads as a single continuous
                      process rather than four separate boxes. */}
                  {i < qualityStages.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-full z-0 hidden h-8 w-px
                                 bg-gradient-to-b from-accent-400/70 to-ink-300/40 lg:block"
                    />
                  )}

                  <div
                    className={`glass glass-hover group relative flex flex-col gap-8 overflow-hidden
                                p-8 sm:p-10 lg:flex-row lg:items-center lg:gap-10 ${
                                  flip ? 'lg:flex-row-reverse' : ''
                                }`}
                  >
                    {/* Oversized watermark numeral — the editorial touch that
                        makes each stage feel like a considered spread rather
                        than a list item. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none
                                  font-display text-[9rem] font-bold leading-none text-ink-900/[0.05]
                                  transition-colors duration-500 group-hover:text-accent-500/[0.08]
                                  sm:text-[12rem] ${flip ? 'right-2 sm:right-4' : 'left-2 sm:left-4'}`}
                    >
                      {stage.step}
                    </span>

                    <div className="relative z-10 flex shrink-0 flex-col items-start gap-4 lg:w-48">
                      <span
                        className="flex h-16 w-16 items-center justify-center rounded-2xl
                                   bg-ink-900 text-accent-300 shadow-lift transition-transform
                                   duration-500 group-hover:scale-105 group-hover:rotate-3"
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-600">
                        Stage {stage.step}
                      </span>
                    </div>

                    <div className="relative z-10 lg:flex-1">
                      <h2 className="font-display text-2xl text-ink-900 sm:text-[1.75rem]">
                        {stage.title}
                      </h2>
                      <p className="mt-3 max-w-2xl leading-relaxed text-ink-500">{stage.body}</p>
                    </div>

                    <div className="relative z-10 w-full shrink-0 lg:w-60">
                      <PlaceholderImage
                        path={`quality/${STAGE_IMAGES[i]}.webp`}
                        label={`Stage ${stage.step} photo`}
                        recommended="900 × 700"
                        alt={stage.title}
                        aspect="4 / 3"
                        className="w-full rounded-xl"
                      />
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ---- Traceability ---- */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-porcelain-200/55 to-transparent">
        <Aurora tone="indigo" intensity="subtle" />
        <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Traceability</p>
              <h2 className="h-section">Every unit carries its own record.</h2>
              <p className="mt-6 text-[1.05rem] leading-[1.8] text-ink-500">
                A unique identification code is assigned to each finished product
                and a quality inspection video is recorded before dispatch.
                Complete quality records are maintained, so if a question is ever
                raised about a specific unit — months or years later — there is a
                documented answer rather than a guess.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Unique unit code', body: 'Assigned at final inspection and tied to the production record.' },
                { title: 'Inspection video', body: 'Recorded for each finished product before it is packed.' },
                { title: 'Maintained records', body: 'Held for traceability, consistency and compliance.' },
                { title: 'Dimensional checks', body: 'Accuracy, stitching, structural strength and finishing.' },
              ].map((c) => (
                <li key={c.title} className="glass glass-hover p-6">
                  <h3 className="font-display text-lg text-ink-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Construction features ---- */}
      <section className="section relative overflow-hidden">
        <Aurora tone="mixed" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">What we control</p>
            <h2 className="h-section">The specification behind the comfort.</h2>
          </Reveal>

          <ul className="mt-11 grid gap-5 sm:grid-cols-2">
            {productFeatures.map((f, i) => {
              const Icon = iconMap[f.icon]
              return (
                <Reveal as="li" key={f.title} delay={i * 70}>
                  <div className="glass glass-hover flex h-full gap-5 p-7">
                    <Icon className="h-8 w-8 shrink-0 text-accent-500" />
                    <div>
                      <h3 className="font-display text-xl text-ink-900">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>

          <Reveal delay={200}>
            <div className="mt-12 rounded-2xl border border-accent-200/70 bg-accent-50/70 p-8 backdrop-blur-xl">
              <p className="leading-relaxed text-ink-700">
                <strong className="font-semibold text-ink-900">
                  Working to your standard?
                </strong>{' '}
                Where a programme requires specific test protocols, material
                certifications or an agreed AQL, we build those into the inspection
                plan for your order. Tell us what you need evidenced.
              </p>
              <Link to="/contact" className="btn-primary mt-6">
                Discuss your requirements
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
