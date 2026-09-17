import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { IconArrowRight, iconMap } from '../components/Icons'
import { productFeatures, qualityStages } from '../data/company'

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
      <section className="section">
        <div className="container-page">
          <ol className="relative space-y-6">
            {/* Vertical rule connecting the stages on larger screens. */}
            <div
              aria-hidden="true"
              className="absolute left-[2.15rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-navy-100 lg:block"
            />

            {qualityStages.map((stage, i) => (
              <Reveal as="li" key={stage.step} delay={i * 90}>
                <div className="relative flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-7 lg:flex-row lg:gap-8 lg:p-8">
                  <div
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center
                               rounded-full bg-navy-900 font-display text-xl text-gold-400"
                  >
                    {stage.step}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-navy-900">{stage.title}</h2>
                    <p className="mt-3 max-w-3xl leading-relaxed text-navy-500">{stage.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Traceability ---- */}
      <section className="section bg-navy-950 text-white">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow-light">Traceability</p>
              <h2 className="h-section text-white">
                Every unit carries its own record.
              </h2>
              <p className="mt-6 leading-relaxed text-navy-200">
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
                <li
                  key={c.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h3 className="font-display text-lg text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-200">{c.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Construction features ---- */}
      <section className="section bg-white">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">What we control</p>
            <h2 className="h-section">The specification behind the comfort.</h2>
          </Reveal>

          <ul className="mt-11 grid gap-5 sm:grid-cols-2">
            {productFeatures.map((f, i) => {
              const Icon = iconMap[f.icon]
              return (
                <Reveal as="li" key={f.title} delay={i * 70}>
                  <div className="card-hover flex h-full gap-5">
                    <Icon className="h-8 w-8 shrink-0 text-gold-500" />
                    <div>
                      <h3 className="font-display text-xl text-navy-900">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-navy-500">{f.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>

          <Reveal delay={200}>
            <div className="mt-12 rounded-2xl border border-gold-200 bg-gold-50 p-7">
              <p className="leading-relaxed text-navy-700">
                <strong className="font-semibold text-navy-900">
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
