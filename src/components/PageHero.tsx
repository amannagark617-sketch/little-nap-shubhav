import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  lede?: string
  children?: ReactNode
}

/** The navy masthead that opens every interior page. */
export default function PageHero({ eyebrow, title, lede, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Soft brand glow, drawn in CSS so it stays crisp at any size. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full
                   bg-[radial-gradient(circle,rgba(211,163,32,0.18),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px
                   bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />

      <div className="container-page relative py-20 sm:py-28">
        <p className="eyebrow-light">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
