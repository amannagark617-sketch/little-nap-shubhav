import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Reveal from '../components/Reveal'
import Aurora from '../components/Aurora'
import Tilt3D from '../components/Tilt3D'
import { useScrollRecede } from '../hooks/useScrollRecede'
import { IconSearch, IconClose } from '../components/Icons'
import { productImage, products, rangeById, ranges, type Product, type RangeId } from '../data/products'

/** A representative spread across ranges for the hero mosaic. */
const HERO_MOSAIC = ['legacy.webp', 'crown.webp', 'bourbon.webp', 'manhattan.webp', 'milan.webp', 'miller-emerald.webp']

/** One representative photo per range, shown as a small thumbnail on its filter tab. */
const rangeThumb = Object.fromEntries(
  ranges.map((r) => [r.id, products.find((p) => p.range === r.id)!.image]),
) as Record<RangeId, string>

type Filter = RangeId | 'all'

const isRangeId = (v: string | null): v is RangeId =>
  !!v && ranges.some((r) => r.id === v)

export default function Products() {
  const hero = useScrollRecede<HTMLDivElement>(500)
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Product | null>(null)

  // The active range lives in the URL, so a filtered view is shareable and the
  // footer's per-range links land correctly.
  const filter: Filter = isRangeId(params.get('range')) ? (params.get('range') as RangeId) : 'all'

  const setFilter = (next: Filter) => {
    const nextParams = new URLSearchParams(params)
    if (next === 'all') nextParams.delete('range')
    else nextParams.set('range', next)
    setParams(nextParams, { replace: true })
  }

  useEffect(() => {
    document.title = 'Products, Little Nap Subhav India Pvt. Ltd.'
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (filter !== 'all' && p.range !== filter) return false
      if (!q) return true
      // Range name and positioning are searchable too, so "cinema", "luxury" or
      // "sofa bed" find the right models even though those words only appear on
      // the range rather than on the model itself.
      const range = rangeById[p.range]
      const haystack = [p.name, p.blurb, range.name, range.positioning, ...p.traits]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [filter, query])

  const grouped = useMemo(() => {
    return ranges
      .map((range) => ({ range, items: visible.filter((p) => p.range === range.id) }))
      .filter((g) => g.items.length > 0)
  }, [visible])

  const activeRange = filter === 'all' ? null : ranges.find((r) => r.id === filter)!

  return (
    <>
      {/* ---- Hero: a mosaic of the catalogue itself ---- */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
          {HERO_MOSAIC.map((img) => (
            <div key={img} className="relative overflow-hidden">
              <img
                src={productImage(img)}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/92 via-ink-950/55 to-ink-950/25"
        />
        <div
          ref={hero.ref}
          style={hero.style}
          className="container-page relative flex h-full flex-col justify-end pb-14 sm:pb-16"
        >
          <Reveal>
            <p className="eyebrow-light">Products</p>
          </Reveal>
          <h1 className="mt-5 max-w-3xl font-display text-[2.4rem] leading-[1.08] text-white sm:text-[3.2rem] lg:text-[3.8rem]">
            {products.length} models across
            <br />
            eight considered ranges.
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Every model here is manufactured to order. Ranges set the construction
              standard, dimensions, mechanism, foam and upholstery are specified
              against your programme.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Filter bar ---- */}
      <div className="stick-below-header sticky z-30 px-3 sm:px-5">
        <div className="glass-strong mx-auto max-w-content px-4 py-3.5 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="relative min-w-0">
              <div
                className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible"
                role="group"
                aria-label="Filter by range"
              >
              <button
                type="button"
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`min-h-[44px] shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-ink-900 text-white shadow-lift'
                    : 'border border-ink-200/70 bg-white/50 text-ink-600 hover:-translate-y-0.5 hover:border-ink-300 hover:bg-white'
                }`}
              >
                All ranges
              </button>
              {ranges.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setFilter(r.id)}
                  aria-pressed={filter === r.id}
                  className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5
                              pr-4 text-sm font-medium transition-all duration-300 ${
                                filter === r.id
                                  ? 'bg-ink-900 text-white shadow-lift'
                                  : 'border border-ink-200/70 bg-white/50 text-ink-600 hover:-translate-y-0.5 hover:border-ink-300 hover:bg-white'
                              }`}
                >
                  <img
                    src={productImage(rangeThumb[r.id])}
                    alt=""
                    aria-hidden="true"
                    className={`h-7 w-7 shrink-0 rounded-full object-cover ring-2 transition-colors ${
                      filter === r.id ? 'ring-accent-400' : 'ring-white'
                    }`}
                  />
                  {r.name}
                </button>
              ))}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/95 to-transparent lg:hidden"
              />
            </div>

            <div className="relative shrink-0 lg:w-64">
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <label htmlFor="product-search" className="sr-only">
                Search models
              </label>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models…"
                className="min-h-[44px] w-full rounded-full border border-ink-200/70 bg-white/60 py-2.5 pl-10 pr-9
                           text-sm text-ink-900 backdrop-blur-sm placeholder:text-ink-300
                           focus:border-accent-300 focus:bg-white focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5
                             text-ink-300 transition-colors hover:text-ink-700"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Range description ---- */}
      {activeRange && (
        <section className="relative overflow-hidden">
          <Aurora tone="azure" intensity="subtle" />
          <div className="container-page relative py-12">
            <p className="eyebrow">{activeRange.positioning}</p>
            <h2 className="mt-3 font-display text-2xl text-ink-900 sm:text-3xl">
              {activeRange.name}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-500">
              {activeRange.description}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {activeRange.specHighlights.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.75rem] font-semibold uppercase tracking-wider text-ink-400">
                    {s.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink-800">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ---- Grid ---- */}
      <section className="section pt-14">
        <div className="container-page">
          {visible.length === 0 ? (
            <div className="glass border-dashed py-20 text-center">
              <p className="font-display text-2xl text-ink-800">No models match that.</p>
              <p className="mt-3 text-sm text-ink-500">
                Try a different search term, or clear the filters to see all{' '}
                {products.length} models.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setFilter('all')
                }}
                className="btn-outline mt-6"
              >
                Reset filters
              </button>
            </div>
          ) : filter === 'all' ? (
            <div className="space-y-16">
              {grouped.map(({ range, items }) => (
                <div key={range.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-100 pb-4">
                    <div>
                      <h2 className="font-display text-2xl text-ink-900">{range.name}</h2>
                      <p className="mt-1 text-sm text-ink-400">{range.positioning}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFilter(range.id)}
                      className="-my-3 inline-flex min-h-[44px] items-center text-sm font-semibold
                                 text-accent-600 underline-offset-4 hover:underline"
                    >
                      About this range
                    </button>
                  </div>
                  <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p, i) => (
                      <Reveal as="li" key={p.id} delay={i * 50}>
                        <Tilt3D className="h-full rounded-2xl">
                          <ProductCard product={p} onOpen={setSelected} />
                        </Tilt3D>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 50}>
                  <Tilt3D className="h-full rounded-2xl">
                    <ProductCard product={p} onOpen={setSelected} />
                  </Tilt3D>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
