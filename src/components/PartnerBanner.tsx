import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import Aurora from './Aurora'
import Counter from './Counter'
import PlaceholderImage from './PlaceholderImage'
import { IconArrowRight } from './Icons'

/**
 * The wide "this is who we build for" banner — a B2B credibility statement
 * with a real photo alongside it, once one exists.
 */
export default function PartnerBanner() {
  return (
    <Reveal>
      <div className="glass-strong relative grid overflow-hidden lg:grid-cols-2">
        <Aurora tone="signature" intensity="subtle" className="lg:col-span-2" />

        <div className="relative flex flex-col justify-center p-9 sm:p-12">
          <p className="eyebrow">For brands, not shoppers</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-ink-900 sm:text-4xl">
            One manufacturing partner for the whole programme.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-500">
            Not a single order — a relationship. We plan capacity around your
            volumes, develop new models with you, and hold the same quality
            standard from the first unit to the ten-thousandth.
          </p>

          <div className="mt-7 flex items-center gap-8">
            <div>
              <p className="font-display text-3xl text-ink-900">
                <Counter to={3200} />
              </p>
              <p className="text-xs font-medium text-ink-400">Seats / month</p>
            </div>
            <div className="h-10 w-px bg-ink-200" />
            <div>
              <p className="font-display text-3xl text-ink-900">
                <Counter to={80} suffix="%+" />
              </p>
              <p className="text-xs font-medium text-ink-400">Women-led floor</p>
            </div>
          </div>

          <Link to="/contact" className="btn-secondary mt-8 w-fit">
            Talk to our team
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <PlaceholderImage
          path="partner/floor-and-team.webp"
          label="The floor and the team, in one photo"
          recommended="1600 × 1400"
          alt="The Little Nap Subhav production floor and team"
          aspect="4 / 3"
          framed={false}
          className="relative min-h-[16rem] w-full lg:min-h-0"
        />
      </div>
    </Reveal>
  )
}
