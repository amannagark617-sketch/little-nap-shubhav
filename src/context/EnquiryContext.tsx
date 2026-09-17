import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'

/**
 * The enquiry list is this site's answer to a shopping cart.
 *
 * Nothing is priced and nothing is sold here — a buyer collects the models they
 * want quoted, adds an indicative quantity, and the list is carried into the
 * contact form as a ready-made RFQ. It survives a reload via localStorage so a
 * specification built over several visits is not lost.
 */

export type EnquiryLine = {
  productId: string
  name: string
  range: string
  quantity: number
}

type EnquiryValue = {
  lines: EnquiryLine[]
  count: number
  has: (productId: string) => boolean
  add: (product: Product, rangeName: string) => void
  remove: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
  /** Formats the list as plain text for the enquiry message body. */
  toSummary: () => string
  isOpen: boolean
  open: () => void
  close: () => void
}

const STORAGE_KEY = 'lns.enquiry.v1'

const EnquiryContext = createContext<EnquiryValue | null>(null)

function readStored(): EnquiryLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Defend against a hand-edited or stale payload.
    return parsed.filter(
      (l): l is EnquiryLine =>
        l && typeof l.productId === 'string' && typeof l.name === 'string',
    )
  } catch {
    return []
  }
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<EnquiryLine[]>(readStored)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Private browsing or a full quota — the list still works for this visit.
    }
  }, [lines])

  const add = useCallback((product: Product, rangeName: string) => {
    setLines((prev) => {
      if (prev.some((l) => l.productId === product.id)) return prev
      return [
        ...prev,
        { productId: product.id, name: product.name, range: rangeName, quantity: 100 },
      ]
    })
    setIsOpen(true)
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const safe = Number.isFinite(quantity) ? Math.max(1, Math.min(100000, Math.round(quantity))) : 1
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity: safe } : l)),
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<EnquiryValue>(
    () => ({
      lines,
      count: lines.length,
      has: (productId) => lines.some((l) => l.productId === productId),
      add,
      remove,
      setQuantity,
      clear,
      toSummary: () =>
        lines
          .map((l) => `• ${l.name} (${l.range}) — indicative qty ${l.quantity}`)
          .join('\n'),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [lines, isOpen, add, remove, setQuantity, clear],
  )

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export function useEnquiry(): EnquiryValue {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>')
  return ctx
}
