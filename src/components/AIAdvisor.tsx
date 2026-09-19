import { useEffect, useRef, useState } from 'react'
import {
  askAdvisor,
  isAdvisorEnabled,
  suggestedPrompts,
  type AdvisorMessage,
} from '../lib/gemini'
import { IconClose, IconSend, IconSparkle } from './Icons'

type Entry = AdvisorMessage & { id: number; pending?: boolean; error?: boolean }

const GREETING =
  'Hello, I can help you find the right range for your project, explain how we build and inspect a unit, or talk through OEM customisation. What are you working on?'

/**
 * A floating Gemini-backed assistant, grounded in the same facts the site
 * publishes. Renders nothing at all when no key or proxy is configured, so the
 * site is fully functional without it.
 */
export default function AIAdvisor() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [entries, setEntries] = useState<Entry[]>([
    { id: 0, role: 'model', text: GREETING },
  ])

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const nextId = useRef(1)

  useEffect(() => {
    // Don't scroll on first open — that would push the greeting and the
    // suggested prompts out of view before the visitor has read them.
    if (entries.length <= 1) return
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [entries])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => () => abortRef.current?.abort(), [])

  if (!isAdvisorEnabled) return null

  async function send(text: string) {
    const question = text.trim()
    if (!question || busy) return

    const userEntry: Entry = { id: nextId.current++, role: 'user', text: question }
    const replyId = nextId.current++

    setEntries((prev) => [
      ...prev,
      userEntry,
      { id: replyId, role: 'model', text: '', pending: true },
    ])
    setInput('')
    setBusy(true)

    // The greeting is presentational; the model only receives the real exchange.
    const history: AdvisorMessage[] = [
      ...entries
        .filter((e) => e.id !== 0 && !e.error)
        .map(({ role, text: t }) => ({ role, text: t })),
      { role: 'user', text: question },
    ]

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await askAdvisor(
        history,
        (soFar) => {
          setEntries((prev) =>
            prev.map((e) => (e.id === replyId ? { ...e, text: soFar, pending: false } : e)),
          )
        },
        controller.signal,
      )
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'The advisor could not answer that just now.'
      setEntries((prev) =>
        prev.map((e) =>
          e.id === replyId ? { ...e, text: message, pending: false, error: true } : e,
        ),
      )
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close the Comfort Advisor' : 'Open the Comfort Advisor'}
        aria-expanded={open}
        className={`pin-fab fixed z-[58] inline-flex items-center gap-2 rounded-full
                    bg-ink-900 py-3.5 pl-4 pr-5 text-sm font-semibold text-white shadow-lg
                    shadow-ink-950/25 transition-all duration-300 hover:bg-ink-800
                    active:scale-95 ${open ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <IconSparkle className="h-5 w-5 text-accent-400" />
        Comfort Advisor
      </button>

      {/* Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[59] flex justify-end px-0 sm:inset-x-auto
                    sm:bottom-[calc(1.25rem+var(--safe-b))] sm:right-[calc(1.25rem+var(--safe-r))]
                    sm:px-0 ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Comfort Advisor"
          className={`flex h-[min(80vh,34rem)] w-full flex-col overflow-hidden rounded-t-2xl
                      border border-white/60 bg-porcelain-50/90 shadow-glass-lg backdrop-blur-2xl
                      transition-all duration-500 sm:w-[24rem] sm:rounded-2xl ${
                        open
                          ? 'translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-4 opacity-0'
                      }`}
        >
          <header className="flex items-center justify-between gap-3 bg-ink-900 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <IconSparkle className="h-4 w-4 text-accent-400" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base text-white">Comfort Advisor</p>
                <p className="text-[0.75rem] text-ink-300">Product &amp; capability guide</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full
                         text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {entries.map((e) => (
              <div
                key={e.id}
                className={`flex ${e.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm
                              leading-relaxed ${
                                e.role === 'user'
                                  ? 'rounded-br-sm bg-ink-700 text-white'
                                  : e.error
                                    ? 'rounded-bl-sm border border-amber-200 bg-amber-50 text-amber-900'
                                    : 'rounded-bl-sm border border-white/70 bg-white/80 text-ink-800'
                              }`}
                >
                  {e.pending ? (
                    <span className="flex gap-1 py-1" aria-label="Thinking">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </span>
                  ) : (
                    e.text
                  )}
                </div>
              </div>
            ))}

            {entries.length === 1 && (
              <div className="space-y-2 pt-1">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="block w-full rounded-xl border border-white/70 bg-white/70 px-3.5
                               py-2.5 text-left text-[0.8rem] leading-snug text-ink-600
                               backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5
                               hover:border-accent-300 hover:bg-white hover:text-ink-900"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-white/60 bg-white/70 px-3 py-3"
          >
            <label htmlFor="advisor-input" className="sr-only">
              Ask the Comfort Advisor
            </label>
            <input
              id="advisor-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ranges, capacity, OEM…"
              autoComplete="off"
              className="min-h-[44px] min-w-0 flex-1 rounded-full border border-ink-100 bg-porcelain-50 px-4 py-2.5
                         text-sm text-ink-900 placeholder:text-ink-300 focus:border-accent-300
                         focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                         bg-ink-900 text-white transition-colors hover:bg-ink-800
                         disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </form>

          <p className="bg-white/70 px-4 pb-[calc(0.75rem+var(--safe-b))] text-center text-[0.75rem] leading-snug text-ink-400">
            AI-generated guidance. Specifications are confirmed by our team on enquiry.
          </p>
        </div>
      </div>
    </>
  )
}
