import { useEffect, useRef } from 'react'
import { IconClose } from './Icons'

export type LightboxItem = {
  src: string
  title: string
  caption?: string
}

type Props = {
  items: LightboxItem[]
  /** Index of the open item, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/** Full-screen image viewer with keyboard navigation. */
export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index! + 1) % items.length)
      if (e.key === 'ArrowLeft') onNavigate((index! - 1 + items.length) % items.length)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open, index, items.length, onClose, onNavigate])

  if (!open) return null
  const item = items[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm animate-fade-in"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <p className="text-sm font-medium text-navy-200">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full
                     border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-4" onClick={onClose}>
        <img
          key={item.src}
          src={item.src}
          alt={item.title}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-5xl animate-scale-in rounded-xl object-contain shadow-2xl"
        />
      </div>

      <div className="px-5 pb-7 text-center">
        <h2 className="font-display text-2xl text-white">{item.title}</h2>
        {item.caption && (
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-navy-200">
            {item.caption}
          </p>
        )}
        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            className="btn-ghost-light"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % items.length)}
            className="btn-ghost-light"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
