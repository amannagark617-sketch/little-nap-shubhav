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
        {tiles.map(({ range, hero }) => (
          <li key={range.id} className="shrink-0">
            <Link
              to={`/products?range=${range.id}`}
              className="group flex w-20 flex-col items-center gap-2.5 sm:w-24"
            >
              <span
                className="block h-20 w-20 overflow-hidden rounded-full border-2 border-white/80
                           shadow-glass transition-all duration-300 group-hover:-translate-y-1
                           group-hover:border-accent-300 group-hover:shadow-glass-lg sm:h-24 sm:w-24"
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
