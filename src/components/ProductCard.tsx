import { productImage, rangeById, type Product } from '../data/products'
import { useEnquiry } from '../context/EnquiryContext'
import { IconCheck, IconPlus } from './Icons'

type Props = {
  product: Product
  onOpen: (product: Product) => void
}

export default function ProductCard({ product, onOpen }: Props) {
  const { has, add, open } = useEnquiry()
  const range = rangeById[product.range]
  const inList = has(product.id)

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60
                 bg-white/55 shadow-glass backdrop-blur-xl transition-all duration-500
                 hover:-translate-y-1.5 hover:bg-white/85 hover:shadow-glass-lg"
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        style={{ aspectRatio: range.imageAspect }}
        className="relative block w-full overflow-hidden bg-porcelain-100 text-left"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={productImage(product.image)}
          alt={`${product.name}, ${range.name} range`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s]
                     group-hover:scale-[1.06]"
        />
        <span
          className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/85 px-2.5
                     py-1 text-[0.75rem] font-semibold uppercase tracking-wider text-ink-700
                     backdrop-blur-md"
        >
          {range.name}
        </span>
        {product.altImage && (
          <span
            className="absolute bottom-3 left-3 rounded-full bg-ink-900/90 px-2.5 py-1
                       text-[0.75rem] font-semibold text-white backdrop-blur-md"
          >
            Converts to bed
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-ink-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{product.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {product.traits.map((t) => (
            <li
              key={t}
              className="rounded-full bg-porcelain-100 px-2.5 py-1 text-[0.75rem] font-medium text-ink-600"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="flex-1 rounded-full border border-ink-200/70 bg-white/50 min-h-[44px] px-4 py-2.5 text-sm
                       font-semibold text-ink-800 transition-all duration-300
                       hover:border-ink-300 hover:bg-white"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => (inList ? open() : add(product, range.name))}
            aria-label={
              inList ? `${product.name} is on your enquiry list` : `Add ${product.name} to enquiry list`
            }
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                        transition-colors ${
                          inList
                            ? 'bg-accent-400 text-white hover:bg-accent-500'
                            : 'bg-ink-900 text-white hover:bg-ink-800'
                        }`}
          >
            {inList ? <IconCheck className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </article>
  )
}
