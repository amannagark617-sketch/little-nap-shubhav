import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { IconArrowRight, IconCheck, IconMail, IconPhone, IconPin } from '../components/Icons'
import Aurora from '../components/Aurora'
import MapPanel from '../components/MapPanel'
import OpenStatus from '../components/OpenStatus'
import { company } from '../data/company'
import { ranges } from '../data/products'
import { useEnquiry } from '../context/EnquiryContext'

/**
 * Optional form backend (Formspree, Basin, Web3Forms, your own endpoint…).
 * With it set, submissions POST as JSON. Without it, the form composes a
 * pre-filled email instead — so the page is never a dead end.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? ''

type Status = 'idle' | 'sending' | 'sent' | 'error'

const enquiryTypes = [
  'OEM / private label manufacturing',
  'ODM — develop a new model',
  'Cinema or auditorium project',
  'Distribution / dealership',
  'Factory visit',
  'Something else',
]

export default function Contact() {
  const { lines, count, clear } = useEnquiry()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    document.title = 'Contact — Little Nap Subhav India Pvt. Ltd.'
  }, [])

  const enquirySummary = useMemo(
    () =>
      lines
        .map((l) => `• ${l.name} (${l.range}) — indicative qty ${l.quantity}`)
        .join('\n'),
    [lines],
  )

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    // Honeypot: real people never fill a hidden field.
    if (data.company_website) return

    const payload: Record<string, string> = {
      ...data,
      enquiryList: enquirySummary || '(none selected)',
      submittedAt: new Date().toISOString(),
    }

    if (!FORM_ENDPOINT) {
      // No backend configured — hand the composed enquiry to their mail client.
      const body = [
        `Name: ${payload.name}`,
        `Company: ${payload.companyName}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || '—'}`,
        `Country / region: ${payload.country || '—'}`,
        `Enquiry type: ${payload.enquiryType}`,
        `Range of interest: ${payload.range || 'Not specified'}`,
        '',
        'Models on enquiry list:',
        payload.enquiryList,
        '',
        'Message:',
        payload.message || '—',
      ].join('\n')

      window.location.href = `mailto:${company.contact.email}?subject=${encodeURIComponent(
        `Website enquiry — ${payload.companyName || payload.name}`,
      )}&body=${encodeURIComponent(body)}`

      setStatus('sent')
      return
    }

    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setStatus('sent')
      form.reset()
      clear()
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? `We could not send that (${err.message}). Please email us directly.`
          : 'We could not send that. Please email us directly.',
      )
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-navy-900 ' +
    'backdrop-blur-sm placeholder:text-navy-300 transition-colors focus:border-gold-300 ' +
    'focus:bg-white focus:outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-navy-500'

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start an enquiry."
        lede="Tell us the models, the volumes and the timeline. We will come back with a specification, a sample plan and an honest production schedule."
      />

      <section className="section relative overflow-hidden">
        <Aurora tone="warm" intensity="subtle" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_22rem]">
          {/* ---- Form ---- */}
          <Reveal>
            <div>
              {status === 'sent' ? (
                <div className="glass-strong p-12 text-center">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-900">
                    <IconCheck className="h-7 w-7 text-gold-400" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl text-navy-900">
                    {FORM_ENDPOINT ? 'Enquiry received.' : 'Your email is ready to send.'}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md leading-relaxed text-navy-600">
                    {FORM_ENDPOINT
                      ? 'Thank you — our team will come back to you shortly. For anything urgent, call us directly.'
                      : `We have opened a pre-filled email in your mail app. If nothing appeared, write to ${company.contact.email} and we will pick it up from there.`}
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link to="/products" className="btn-outline">
                      Back to products
                    </Link>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="btn-primary"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative">
                  <h2 className="font-display text-2xl text-navy-900">Your details</h2>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name <span className="text-gold-600">*</span>
                      </label>
                      <input id="name" name="name" required className={`mt-2 ${fieldClass}`} />
                    </div>
                    <div>
                      <label htmlFor="companyName" className={labelClass}>
                        Company <span className="text-gold-600">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        required
                        className={`mt-2 ${fieldClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-gold-600">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={`mt-2 ${fieldClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`mt-2 ${fieldClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className={labelClass}>
                        Country / region
                      </label>
                      <input id="country" name="country" className={`mt-2 ${fieldClass}`} />
                    </div>
                    <div>
                      <label htmlFor="enquiryType" className={labelClass}>
                        Enquiry type <span className="text-gold-600">*</span>
                      </label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        required
                        defaultValue={enquiryTypes[0]}
                        className={`mt-2 ${fieldClass}`}
                      >
                        {enquiryTypes.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="range" className={labelClass}>
                      Range of interest
                    </label>
                    <select id="range" name="range" defaultValue="" className={`mt-2 ${fieldClass}`}>
                      <option value="">Not sure yet / multiple</option>
                      {ranges.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Enquiry list carried over from the catalogue */}
                  <div className="glass mt-8 p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg text-navy-900">
                          Models on your enquiry list
                        </h3>
                        <p className="mt-1 text-xs text-navy-400">
                          Sent with this enquiry so we can quote the whole list at once.
                        </p>
                      </div>
                      <Link
                        to="/products"
                        className="shrink-0 text-sm font-semibold text-gold-600
                                   underline-offset-4 hover:underline"
                      >
                        {count > 0 ? 'Edit' : 'Add models'}
                      </Link>
                    </div>

                    {count === 0 ? (
                      <p className="mt-4 rounded-xl border border-dashed border-navy-200 px-5 py-6 text-center text-sm text-navy-400">
                        Nothing selected — that is fine. Describe what you need below
                        and we will work it out together.
                      </p>
                    ) : (
                      <ul className="mt-4 divide-y divide-navy-100">
                        {lines.map((l) => (
                          <li
                            key={l.productId}
                            className="flex items-center justify-between gap-4 py-2.5 text-sm"
                          >
                            <span className="text-navy-800">
                              <span className="font-medium">{l.name}</span>
                              <span className="text-navy-400"> · {l.range}</span>
                            </span>
                            <span className="shrink-0 text-navy-500">qty {l.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6">
                    <label htmlFor="message" className={labelClass}>
                      Tell us about the project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Volumes, target timeline, upholstery preferences, whether you have your own drawings…"
                      className={`mt-2 resize-y ${fieldClass}`}
                    />
                  </div>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <div
                    className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="company_website">Do not fill this in</label>
                    <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900"
                    >
                      {errorMsg}{' '}
                      <a
                        href={`mailto:${company.contact.email}`}
                        className="font-semibold underline underline-offset-2"
                      >
                        {company.contact.email}
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary mt-8 w-full sm:w-auto"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                    <IconArrowRight className="h-4 w-4" />
                  </button>

                  <p className="mt-4 text-xs leading-relaxed text-navy-400">
                    We use your details only to respond to this enquiry. Nothing on
                    this site is an online sale — every order is quoted individually.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ---- Contact details ---- */}
          <Reveal delay={120}>
            <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
              <div className="glass p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-xl text-navy-900">Reach us directly</h2>
                  <OpenStatus />
                </div>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex gap-3.5">
                    <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-wider text-navy-400">Email</p>
                      <a
                        href={`mailto:${company.contact.email}`}
                        className="mt-0.5 block font-medium text-navy-800 transition-colors hover:text-gold-600"
                      >
                        {company.contact.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-wider text-navy-400">Phone</p>
                      <a
                        href={`tel:${company.contact.phoneHref}`}
                        className="mt-0.5 block font-medium text-navy-800 transition-colors hover:text-gold-600"
                      >
                        {company.contact.phone}
                      </a>
                      <a
                        href={`tel:${company.contact.altPhoneHref}`}
                        className="mt-1 block text-xs text-navy-400 transition-colors hover:text-gold-600"
                      >
                        Alt. {company.contact.altPhone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-wider text-navy-400">
                        {company.contact.address.label}
                      </p>
                      <address className="mt-0.5 not-italic text-navy-700">
                        {company.contact.address.lines.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </address>
                    </div>
                  </li>
                </ul>

                <a
                  href={company.contact.address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass mt-7 w-full"
                >
                  Get directions
                </a>
              </div>

              <div className="glass p-7">
                <h2 className="font-display text-lg text-navy-900">What happens next</h2>
                <ol className="mt-4 space-y-4 text-sm">
                  {[
                    'We read your enquiry and come back with clarifying questions.',
                    'We share a specification and indicative commercials.',
                    'We produce a sample for approval.',
                    'We agree a production schedule and begin.',
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3.5">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                                   bg-navy-900 text-[0.7rem] font-bold text-gold-400"
                      >
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-navy-600">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- Where to find us ---- */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-sand-100/60 to-transparent">
        <Aurora tone="cool" intensity="subtle" />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Where to find us</p>
              <h2 className="h-section">{company.contact.address.name}</h2>
              <p className="lede">
                On the AB Road bypass at Dewas, a short drive from Indore — with two
                dry ports nearby and overnight reach to the major shipping ports.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <MapPanel />
          </div>
        </div>
      </section>
    </>
  )
}
