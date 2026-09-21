import { useEffect, useState } from 'react'
import { openingHours } from '../data/company'

/**
 * Works out whether the plant is open right now, in India Standard Time.
 *
 * The visitor's own clock is irrelevant — a buyer in Germany wants to know
 * whether someone is there to pick up the phone in Dewas, so everything is
 * computed against Asia/Kolkata.
 */
function nowInIST(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const hour = Number(get('hour'))
  const minute = Number(get('minute'))

  return { day: dayIndex, minutes: hour * 60 + minute }
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function useOpenState() {
  const [state, setState] = useState(() => compute())

  useEffect(() => {
    // Re-check each minute so the badge does not go stale on a long visit.
    const id = window.setInterval(() => setState(compute()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return state
}

function compute() {
  const { day, minutes } = nowInIST()
  const today = openingHours.find((h) => h.day === day)

  if (!today || !today.open || !today.close) {
    return { isOpen: false, today, label: 'Closed today' }
  }

  const open = toMinutes(today.open)
  const close = toMinutes(today.close)

  if (minutes < open) return { isOpen: false, today, label: `Opens at ${today.hours.split('–')[0].trim()}` }
  if (minutes >= close) return { isOpen: false, today, label: 'Closed now' }
  return { isOpen: true, today, label: `Open until ${today.hours.split('–')[1].trim()}` }
}

/** A small live badge: green when the plant is open, muted when it is not. */
export default function OpenStatus({ className = '' }: { className?: string }) {
  const { isOpen, label } = useOpenState()

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        isOpen ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-500'
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isOpen ? 'bg-white' : 'bg-ink-300'
          }`}
        />
      </span>
      {label}
      <span className="font-normal opacity-70">· IST</span>
    </span>
  )
}
