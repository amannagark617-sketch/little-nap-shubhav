import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    document.title = 'Quality Assurance, Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <>
      {/* ---- Hero: a split panel, same language as the stage cards below ---- */}
      <section className="section pb-10 pt-14 sm:pt-16">
        <div className="container-page">
          <div className="glass-strong grid overflow-hidden lg:grid-cols-2">
            <div className="relative min-h-[16rem] lg:min-h-[26rem]">
              <PlaceholderImage
                path="quality/hero-overview.webp"
                label="Quality hero photo"
                recommended="1400 × 1200"
                alt="Quality control at the Little Nap Subhav plant"
                aspect="4 / 3"
                framed={false}
                className="h-full w-full lg:absolute lg:inset-0"
              />
            </div>
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <Reveal>
                <p className="eyebrow">Quality assurance</p>
              </Reveal>
              <h1 className="mt-5 font-display text-[2.1rem] leading-[1.1] text-ink-900 sm:text-[2.6rem] lg:text-[3rem]">
                Four inspections
                <br />
                before it leaves the gate.
              </h1>
              <Reveal delay={200}>
                <p className="mt-6 leading-relaxed text-ink-500">
                  Quality is checked where it is created, not only at the end.
                  Material is approved before it is bought, inspected when it
                  arrives, controlled while the unit is built, and recorded
                  before dispatch.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- The four stages ---- */}
      <section className="section relative overflow-hidden">
        <Aurora tone="signature" intensity="subtle" />
        <div className="container-page relative">
          <ol className="relative flex flex-col gap-6">
            {qualityStages.map((stage, i) => {
              const Icon = STAGE_ICONS[i % STAGE_ICONS.length]
              const flip = i % 2 === 1
              return (
                <Reveal as="li" key={stage.step} delay={i * 100}>
                  <div className="glass glass-hover grid overflow-hidden lg:grid-cols-2">
                    <div className={`relative min-h-[16rem] lg:min-h-[24rem] ${flip ? 'lg:order-2' : ''}`}>
                      <PlaceholderImage
                        path={`quality/${STAGE_IMAGES[i]}.webp`}
                        label={`Stage ${stage.step} photo`}
                        recommended="1200 × 900"
                        alt={stage.title}
                        aspect="4 / 3"
                        framed={false}
                        className="h-full w-full lg:absolute lg:inset-0"
                      />
                    </div>

                    <div
                      className={`relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 ${
                        flip ? 'lg:order-1' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
                                     bg-ink-900 text-accent-300"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-600">
                          Stage {stage.step} of {qualityStages.length}
                        </span>
                      </div>
                      <h2 className="mt-5 font-display text-2xl text-ink-900 sm:text-[1.75rem]">
                        {stage.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-ink-500">{stage.body}</p>
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
                raised about a specific unit, months or years later, there is a
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
