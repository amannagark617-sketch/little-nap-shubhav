import { Link } from 'react-router-dom'
import { productImage, products, ranges } from '../data/products'

/**
 * A fast, photo-led way into the catalogue — one circular tile per range,
 * using the real product photography already on the site rather than an
 * abstract icon. Sits right under the hero as a quick-navigation strip.
 */
export default function RangeQuickNav() {
  const tiles = ranges.map((range) => ({
    range,
    hero: products.find((p) => p.range === range.id)!,
  }))

  return (
    <nav aria-label="Browse by range" className="relative">
      <ul className="no-scrollbar flex gap-5 overflow-x-auto px-1 pb-2 sm:justify-center sm:overflow-visible sm:px-0">
        {tiles.map(({ range, hero }, i) => (
          <li
            key={range.id}
            style={{ animationDelay: `${i * 70}ms` }}
            className="shrink-0 animate-rise-in"
          >
            <Link
              to={`/products?range=${range.id}`}
              className="group flex w-20 flex-col items-center gap-2.5 sm:w-24"
            >
              <span
                className="relative block h-20 w-20 animate-float sm:h-24 sm:w-24"
                style={{ animationDelay: `${i * 350}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-full opacity-0 shadow-[0_0_0_5px_rgba(0,0,0,0.05)]
                             transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  className="block h-full w-full overflow-hidden rounded-full border-2 border-white/80
                             shadow-glass transition-all duration-300 group-hover:-translate-y-1
                             group-hover:rotate-3 group-hover:border-accent-300 group-hover:shadow-glass-lg"
                >
                  <img
                    src={productImage(hero.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500
                               group-hover:scale-110"
                  />
                </span>
              </span>
              <span className="text-center text-xs font-medium leading-tight text-ink-600 transition-colors group-hover:text-ink-900">
                {range.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
