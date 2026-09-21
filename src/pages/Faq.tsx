import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Aurora from '../components/Aurora'
import { IconArrowRight, IconChevron } from '../components/Icons'
import { faqs } from '../data/faq'

function FaqRow({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="glass overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base text-ink-900 sm:text-lg">{question}</span>
        <IconChevron
          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 ${
            open ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 leading-relaxed text-ink-500">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions, Little Nap Subhav India Pvt. Ltd.'
  }, [])

  return (
    <>
      <section className="section relative overflow-hidden pb-10 pt-14 sm:pt-20">
        <Aurora tone="signature" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">FAQ</p>
          </Reveal>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] leading-[1.08] text-ink-900 sm:text-[3.2rem]">
            Frequently asked questions.
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
              The questions we hear most from buyers and brands before they
              place a first order.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((item, i) => (
              <Reveal key={item.question} delay={Math.min(i * 40, 320)}>
                <FaqRow question={item.question} answer={item.answer} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-accent-200/70 bg-accent-50/70 p-8 text-center backdrop-blur-xl">
              <p className="leading-relaxed text-ink-700">
                <strong className="font-semibold text-ink-900">
                  Still have a question?
                </strong>{' '}
                Send us the specifics and we will answer directly.
              </p>
              <Link to="/contact" className="btn-primary mt-6">
                Get in touch
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
