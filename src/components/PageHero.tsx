import type { ReactNode } from 'react'
import Aurora from './Aurora'
import SplitText from './SplitText'
import Reveal from './Reveal'

type Props = {
  eyebrow: string
  /** A plain string is revealed word by word; a node is revealed whole. */
  title: ReactNode
  lede?: string
  children?: ReactNode
}

/** The light, glass-accented masthead that opens every interior page. */
export default function PageHero({ eyebrow, title, lede, children }: Props) {
  return (
    <section className="relative overflow-hidden">
      <Aurora tone="signature" intensity="normal" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px
                   bg-gradient-to-r from-transparent via-accent-300/60 to-transparent"
      />

      <div className="container-page relative pb-16 pt-14 sm:pb-20 sm:pt-20">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>

        {typeof title === 'string' ? (
          <SplitText
            as="h1"
            className="mt-6 block max-w-4xl font-display text-[2.4rem] leading-[1.08] text-ink-900 sm:text-[3.2rem] lg:text-[3.8rem]"
            stagger={45}
          >
            {title}
          </SplitText>
        ) : (
          <h1 className="mt-6 max-w-4xl font-display text-[2.4rem] leading-[1.08] text-ink-900 sm:text-[3.2rem] lg:text-[3.8rem]">
            {title}
          </h1>
        )}

        {lede && (
          <Reveal delay={240}>
            <p className="mt-7 max-w-2xl text-lg leading-[1.75] text-ink-500">{lede}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
