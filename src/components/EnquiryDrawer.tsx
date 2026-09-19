import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { IconArrowRight, IconClose } from './Icons'

/**
 * The slide-over that shows what the visitor has collected for quotation.
 * "Continue" hands the list to the contact form rather than to a checkout —
 * there is deliberately no payment path anywhere on this site.
 */
export default function EnquiryDrawer() {
  const { lines, isOpen, close, remove, setQuantity, clear, count } = useEnquiry()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  return (
    <div className={`fixed inset-0 z-[57] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink-950/35 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry list"
        className={`absolute right-0 top-0 flex h-full w-[min(92vw,26rem)] flex-col border-l
                    border-white/60 bg-porcelain-50/92 shadow-glass-lg backdrop-blur-2xl
                    transition-transform duration-500 ease-out ${
                      isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
      >
        <header className="flex items-center justify-between border-b border-white/60 px-5 py-4 pt-[calc(1rem+var(--safe-t))]">
          <div>
            <h2 className="font-display text-xl text-ink-900">Your enquiry list</h2>
            <p className="text-xs text-ink-400">
              {count === 0 ? 'Nothing added yet' : `${count} model${count === 1 ? '' : 's'} selected`}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close enquiry list"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full
                       border border-ink-200 text-ink-800 transition-colors hover:bg-white"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {count === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 p-8 text-center">
              <p className="font-display text-lg text-ink-800">Build a specification</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Add models from any range and set indicative quantities. We will
                quote the list as one enquiry — nothing is priced or sold online.
              </p>
              <button
                type="button"
                onClick={() => {
                  close()
                  navigate('/products')
                }}
                className="btn-outline mt-5"
              >
                Browse products
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="glass p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg leading-tight text-ink-900">
                        {line.name}
                      </p>
                      <p className="text-xs text-ink-400">{line.range}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.productId)}
                      aria-label={`Remove ${line.name}`}
                      className="shrink-0 rounded-full p-1.5 text-ink-300 transition-colors
                                 hover:bg-porcelain-100 hover:text-ink-700"
                    >
                      <IconClose className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <label
                      htmlFor={`qty-${line.productId}`}
                      className="text-xs font-medium text-ink-500"
                    >
                      Indicative qty
                    </label>
                    <input
                      id={`qty-${line.productId}`}
                      type="number"
                      min={1}
                      max={100000}
                      value={line.quantity}
                      onChange={(e) => setQuantity(line.productId, Number(e.target.value))}
                      className="h-11 w-24 rounded-lg border border-ink-100 bg-porcelain-50 px-3
                                 text-sm text-ink-900 focus:border-accent-300 focus:outline-none"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {count > 0 && (
          <div className="space-y-3 border-t border-white/60 p-5 pb-[calc(1.25rem+var(--safe-b))]">
            <button
              type="button"
              onClick={() => {
                close()
                navigate('/contact')
              }}
              className="btn-primary w-full"
            >
              Continue to enquiry
              <IconArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={clear}
              className="w-full text-xs font-medium text-ink-400 underline-offset-4
                         transition-colors hover:text-ink-700 hover:underline"
            >
              Clear the list
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
