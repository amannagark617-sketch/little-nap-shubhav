import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Reveal from '../components/Reveal'
import { IconSearch, IconClose } from '../components/Icons'
import { products, rangeById, ranges, type Product, type RangeId } from '../data/products'

type Filter = RangeId | 'all'

const isRangeId = (v: string | null): v is RangeId =>
  !!v && ranges.some((r) => r.id === v)

export default function Products() {
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
    document.title = 'Products — Little Nap Subhav India Pvt. Ltd.'
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
      <PageHero
        eyebrow="Products"
        title={
          <>
            {products.length} models across
            <br />
            eight considered ranges.
          </>
        }
        lede="Every model here is manufactured to order. Ranges set the construction standard; dimensions, mechanism, foam and upholstery are specified against your programme."
      />

      {/* ---- Filter bar ---- */}
      <div className="sticky top-[76px] z-30 border-b border-navy-100 bg-sand-50/95 backdrop-blur-md">
        <div className="container-page py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]
                         [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Filter by range"
            >
              <button
                type="button"
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-navy-900 text-white'
                    : 'border border-navy-200 text-navy-600 hover:border-navy-400 hover:bg-white'
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
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    filter === r.id
                      ? 'bg-navy-900 text-white'
                      : 'border border-navy-200 text-navy-600 hover:border-navy-400 hover:bg-white'
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>

            <div className="relative shrink-0 lg:w-64">
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
              <label htmlFor="product-search" className="sr-only">
                Search models
              </label>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models…"
                className="w-full rounded-full border border-navy-200 bg-white py-2.5 pl-10 pr-9
                           text-sm text-navy-900 placeholder:text-navy-300
                           focus:border-gold-300 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5
                             text-navy-300 transition-colors hover:text-navy-700"
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
        <section className="border-b border-navy-100 bg-white">
          <div className="container-page py-10">
            <p className="eyebrow">{activeRange.positioning}</p>
            <h2 className="mt-3 font-display text-2xl text-navy-900 sm:text-3xl">
              {activeRange.name}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-navy-500">
              {activeRange.description}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {activeRange.specHighlights.map((s) => (
                <div key={s.label}>
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-navy-400">
                    {s.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-navy-800">{s.value}</dd>
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
            <div className="rounded-2xl border border-dashed border-navy-200 py-20 text-center">
              <p className="font-display text-2xl text-navy-800">No models match that.</p>
              <p className="mt-3 text-sm text-navy-500">
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
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-100 pb-4">
                    <div>
                      <h2 className="font-display text-2xl text-navy-900">{range.name}</h2>
                      <p className="mt-1 text-sm text-navy-400">{range.positioning}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFilter(range.id)}
                      className="text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
                    >
                      About this range
                    </button>
                  </div>
                  <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p, i) => (
                      <Reveal as="li" key={p.id} delay={i * 50}>
                        <ProductCard product={p} onOpen={setSelected} />
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
                  <ProductCard product={p} onOpen={setSelected} />
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
