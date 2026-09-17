import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Modal dialog plumbing: lock the page, move focus in, keep Tab inside, close
 * on Escape, and hand focus back to whatever opened it.
 *
 * Anything rendering `role="dialog" aria-modal="true"` needs all five. Without
 * the trap, the next Tab after opening a drawer lands in the page behind it,
 * which is exactly what `aria-modal` promises does not happen.
 *
 * @param open      Whether the dialog is currently shown.
 * @param panelRef  The dialog panel — the Tab cycle is scoped to its subtree.
 * @param onClose   Called on Escape.
 * @param initialFocusRef  Element to focus on open. Defaults to the first
 *                         focusable node in the panel.
 */
export function useDialog(
  open: boolean,
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the requested element, else the first focusable thing in the panel.
    const target =
      initialFocusRef?.current ??
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ??
      null
    target?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
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
  }, [open, panelRef, onClose, initialFocusRef])
}
