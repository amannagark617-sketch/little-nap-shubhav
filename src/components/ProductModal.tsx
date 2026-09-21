import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { productImage, rangeById, type Product } from '../data/products'
import { useEnquiry } from '../context/EnquiryContext'
import { IconArrowRight, IconCheck, IconClose, IconPlus } from './Icons'

type Props = {
  product: Product | null
  onClose: () => void
}

/**
 * Detail view for a model. Handles three image situations: a single shot, a
 * sofa/bed pair the visitor can toggle between, and a set of finish options.
 */
export default function ProductModal({ product, onClose }: Props) {
  const { has, add, open } = useEnquiry()
  const [view, setView] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Reset to the primary image whenever a different model is opened.
  useEffect(() => setView(0), [product?.id])

  useEffect(() => {
    if (!product) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // Keep focus inside the dialog.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [product, onClose])

  if (!product) return null

  const range = rangeById[product.range]
  const inList = has(product.id)

  // Build the switchable image set for whichever case applies.
  const views: { src: string; label: string }[] = product.altImage
    ? [
        { src: product.image, label: product.imageLabel ?? 'Sofa mode' },
        { src: product.altImage, label: product.altImageLabel ?? 'Bed mode' },
      ]
    : product.gallery
      ? product.gallery
      : [{ src: product.image, label: product.name }]

  const active = views[Math.min(view, views.length - 1)]

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-ink-950/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative flex max-h-[92vh] w-full max-w-4xl animate-scale-in flex-col
                   overflow-hidden rounded-t-3xl border border-white/60 bg-porcelain-50/90
                   shadow-glass-lg backdrop-blur-2xl sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center
                     rounded-full bg-white/90 text-ink-800 shadow-sm backdrop-blur
                     transition-colors hover:bg-white"
        >
          <IconClose className="h-5 w-5" />
        </button>

        <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
          {/* --- Imagery --- */}
          <div className="relative bg-porcelain-100">
            <div
              style={{ aspectRatio: range.imageAspect }}
              className="w-full md:h-full md:!aspect-auto md:min-h-[30rem]"
            >
              <img
                key={active.src}
                src={productImage(active.src)}
                alt={`${product.name}, ${active.label}`}
                className="h-full w-full animate-fade-in object-cover"
              />
            </div>

            {views.length > 1 && (
              <div
                className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-gradient-to-t
                           from-ink-950/55 to-transparent p-4"
                role="group"
                aria-label="Image views"
              >
                {views.map((v, i) => (
                  <button
                    key={v.src}
                    type="button"
                    onClick={() => setView(i)}
                    aria-pressed={i === view}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur
                                transition-colors ${
                                  i === view
                                    ? 'bg-accent-400 text-white'
                                    : 'bg-white/85 text-ink-700 hover:bg-white'
                                }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- Detail --- */}
          <div className="flex flex-col p-6 sm:p-8">
            <p className="eyebrow">{range.name}</p>
            <h2 id="product-modal-title" className="mt-3 font-display text-3xl text-ink-900">
              {product.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{product.blurb}</p>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                Characteristics
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {product.traits.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs
                               font-medium text-ink-700 backdrop-blur-sm"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
                {range.name} range build
              </h3>
              <dl className="mt-3 divide-y divide-ink-100/70 rounded-xl border border-white/70 bg-white/60 px-4 backdrop-blur-sm">
                {range.specHighlights.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-2.5 text-sm">
                    <dt className="text-ink-400">{s.label}</dt>
                    <dd className="text-right font-medium text-ink-800">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-ink-400">
                Dimensions, mechanism type, foam density and upholstery are confirmed
                against your specification, this is an OEM/ODM programme, not a
                fixed catalogue item.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => (inList ? open() : add(product, range.name))}
                className={inList ? 'btn-secondary flex-1' : 'btn-primary flex-1'}
              >
                {inList ? (
                  <>
                    <IconCheck className="h-4 w-4" />
                    On your enquiry list
                  </>
                ) : (
                  <>
                    <IconPlus className="h-4 w-4" />
                    Add to enquiry
                  </>
                )}
              </button>
              <Link to="/contact" className="group btn-outline flex-1" onClick={onClose}>
                Talk to us
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
