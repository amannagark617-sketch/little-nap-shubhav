import type { GoogleGenAI } from '@google/genai'
import {
  capability,
  clients,
  company,
  differentiators,
  mission,
  partnership,
  productFeatures,
  qualityStages,
  vision,
} from '../data/company'
import { processSteps } from '../data/factory'
import { products, ranges } from '../data/products'

/**
 * The Comfort Advisor's connection to Gemini.
 *
 * Two transports are supported:
 *
 *  1. Direct — the browser calls Gemini with a key injected at build time. This
 *     is how Google AI Studio deploys an app and it works with no backend, but
 *     the key ships inside the bundle and anyone can read it. Fine for a key
 *     that is restricted and quota-capped; not fine for an unrestricted one.
 *  2. Proxied — set VITE_AI_PROXY_URL and the browser posts to your own
 *     endpoint instead, which holds the key server-side. See server/ for a
 *     ready-made function. This is the recommended production setup.
 *
 * With neither configured the advisor stays hidden and the rest of the site is
 * completely unaffected.
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? ''
const PROXY_URL = import.meta.env.VITE_AI_PROXY_URL ?? ''
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash'

export type AdvisorMessage = { role: 'user' | 'model'; text: string }

export const advisorMode: 'proxy' | 'direct' | 'off' = PROXY_URL
  ? 'proxy'
  : API_KEY
    ? 'direct'
    : 'off'

export const isAdvisorEnabled = advisorMode !== 'off'

/**
 * Everything the model is allowed to treat as fact, rendered from the same data
 * the pages use. Keeping this generated rather than hand-written means the
 * advisor cannot drift away from the site.
 */
function buildKnowledgeBase(): string {
  const rangeLines = ranges
    .map((r) => {
      const models = products
        .filter((p) => p.range === r.id)
        .map((p) => p.name)
        .join(', ')
      const specs = r.specHighlights.map((s) => `${s.label}: ${s.value}`).join('; ')
      return `- ${r.name} (${r.positioning}). Models: ${models}. ${r.description} Range-level construction, ${specs}.`
    })
    .join('\n')

  return `
COMPANY
${company.legalName} ("${company.shortName}", ${company.initials}). Tagline: "${company.tagline}".
Disciplines: ${company.disciplines.join(', ')}.
Manufacturing unit: ${company.contact.address.full}.
Email: ${company.contact.email}. Phone: ${company.contact.phone}. Web: ${company.contact.website}.

VISION
${vision}

MISSION
${mission}

WHY LITTLE NAP SUBHAV
${differentiators.map((d) => `- ${d.title}: ${d.body}`).join('\n')}

CAPABILITY
${capability.points.map((p) => `- ${p}`).join('\n')}
${capability.workforce.headline}
${capability.workforce.points.map((p) => `- ${p}`).join('\n')}

PRODUCT RANGES
${rangeLines}

CONSTRUCTION FEATURES (apply across the catalogue)
${productFeatures.map((f) => `- ${f.title}: ${f.body}`).join('\n')}

QUALITY SYSTEM (four stages)
${qualityStages.map((q) => `${q.step}. ${q.title}, ${q.body}`).join('\n')}

FACTORY PROCESS AREAS (order of flow)
${processSteps.map((s) => `- ${s.name} (${s.stage}): ${s.body}`).join('\n')}

PARTNERSHIP MODEL
${partnership.map((p) => `- ${p.title}: ${p.body}`).join('\n')}

CLIENTS
${clients.join(', ')}.
`.trim()
}

const SYSTEM_INSTRUCTION = `
You are the Comfort Advisor for ${company.legalName}, an OEM/ODM motion-furniture
manufacturer in Dewas, Madhya Pradesh, India. You speak to business buyers:
retail brands, multiplex and cinema operators, hospitality projects, interior
contractors and distributors.

YOUR JOB
Help the visitor work out which range and models suit their project, explain how
the factory and quality process work, and move a serious enquiry towards contact.

HARD RULES
1. Answer ONLY from the KNOWLEDGE BASE below. It is the complete set of facts
   published by the company.
2. Never invent a number. If asked for dimensions, recline angles, foam density
   in kg/m³, weights, certifications, lead times, MOQs or prices, say plainly
   that those are specified per programme and point them to the enquiry form.
   Guessing a specification could put a real order at risk.
3. This is NOT an online store. Nothing is priced or sold on the site. Every
   enquiry is quoted individually.
4. If a question is outside the knowledge base, say so and offer the contact
   route: ${company.contact.email} or ${company.contact.phone}.
5. Do not compare the company unfavourably with named competitors, and do not
   discuss the internal commercial terms of the listed clients.

STYLE
Concise and practical, usually two to four short sentences, or a tight bulleted
list when recommending models. Plain British English. No emoji. No markdown
headings. No em dashes, use a comma or a full stop instead. Do not open with a
greeting after the first turn. When you recommend models, name the range and
say in one clause why it fits what they described. When a visitor sounds
ready, suggest they add models to the enquiry list and send it through the
contact form.

KNOWLEDGE BASE
${buildKnowledgeBase()}
`.trim()

/**
 * The SDK is imported on first use rather than at module load. That keeps
 * roughly 180 kB of Gemini client out of the initial bundle for every visitor
 * who never opens the advisor.
 */
let client: GoogleGenAI | null = null
async function getClient(): Promise<GoogleGenAI> {
  if (!client) {
    const { GoogleGenAI } = await import('@google/genai')
    client = new GoogleGenAI({ apiKey: API_KEY })
  }
  return client
}

export class AdvisorError extends Error {}

/**
 * Streams a reply, calling `onChunk` with each fragment as it arrives.
 * Resolves with the complete text.
 */
export async function askAdvisor(
  history: AdvisorMessage[],
  onChunk: (textSoFar: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  if (advisorMode === 'off') {
    throw new AdvisorError('The advisor is not configured.')
  }

  if (advisorMode === 'proxy') {
    return askViaProxy(history, onChunk, signal)
  }

  const contents = history.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }))

  try {
    const ai = await getClient()
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    })

    let full = ''
    for await (const chunk of stream) {
      if (signal?.aborted) break
      const piece = chunk.text
      if (!piece) continue
      full += piece
      onChunk(full)
    }

    if (!full.trim()) {
      throw new AdvisorError('The advisor returned an empty reply.')
    }
    return full
  } catch (err) {
    if (err instanceof AdvisorError) throw err
    throw new AdvisorError(describe(err))
  }
}

/** Posts to a server-side endpoint that holds the key. */
async function askViaProxy(
  history: AdvisorMessage[],
  onChunk: (textSoFar: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history }),
    signal,
  })

  if (!res.ok) {
    throw new AdvisorError(`The advisor service replied with ${res.status}.`)
  }

  // Support both a plain JSON reply and a streamed text body.
  const contentType = res.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    const data = (await res.json()) as { text?: string }
    const text = data.text?.trim() ?? ''
    if (!text) throw new AdvisorError('The advisor returned an empty reply.')
    onChunk(text)
    return text
  }

  const reader = res.body?.getReader()
  if (!reader) throw new AdvisorError('The advisor returned no content.')

  const decoder = new TextDecoder()
  let full = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    full += decoder.decode(value, { stream: true })
    onChunk(full)
  }
  if (!full.trim()) throw new AdvisorError('The advisor returned an empty reply.')
  return full
}

function describe(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (/api[_ -]?key|permission|unauthenticated|401|403/i.test(raw)) {
    return 'The advisor is not authorised, the API key looks missing or invalid.'
  }
  if (/quota|429|resource[_ ]exhausted/i.test(raw)) {
    return 'The advisor has hit its usage limit for now. Please try again shortly.'
  }
  if (/network|fetch|failed to fetch/i.test(raw)) {
    return 'Could not reach the advisor. Please check your connection and try again.'
  }
  return 'The advisor could not answer that just now.'
}

/** Opening prompts offered before the visitor types anything. */
export const suggestedPrompts = [
  'I run a 6-screen multiplex, what should I be looking at?',
  'What is the difference between the Premium and Reserved ranges?',
  'Walk me through how a unit is built and inspected.',
  'Can you manufacture to our own drawings?',
]
