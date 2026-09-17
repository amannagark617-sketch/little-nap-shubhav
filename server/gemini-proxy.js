/**
 * Server-side Gemini proxy for the Comfort Advisor.
 *
 * Why this exists: the direct browser integration ships the API key inside the
 * JavaScript bundle, where anyone can read it. Running the call through a
 * function keeps the key on the server. Deploy this, then set
 * VITE_AI_PROXY_URL to its URL and rebuild — the front end switches over with
 * no other changes.
 *
 * The handler is written against the Web Fetch API (Request in, Response out),
 * which is what Netlify Functions, Vercel Edge Functions, Cloudflare Workers
 * and Deno Deploy all use. For Google Cloud Functions / Cloud Run see the
 * Express wrapper at the bottom.
 *
 * Required environment variable: GEMINI_API_KEY
 * Optional: GEMINI_MODEL (default gemini-2.5-flash), ALLOWED_ORIGIN
 */

import { GoogleGenAI } from '@google/genai'

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'

/**
 * Keep this in sync with SYSTEM_INSTRUCTION in src/lib/gemini.ts.
 *
 * The front end builds its knowledge base from the site's own data files. When
 * you proxy, that text has to live here instead — the simplest way to keep one
 * copy is to send the instruction from the client, but that lets anyone rewrite
 * it, so it is pinned server-side on purpose.
 */
const SYSTEM_INSTRUCTION = `
You are the Comfort Advisor for Little Nap Subhav India Pvt. Ltd., an OEM/ODM
motion-furniture manufacturer in Dewas, Madhya Pradesh, India.

Answer only from what the company publishes: eight ranges (Super Economical,
Economical, Premium, Luxury, Reserved, Motion Sofa, Sofa Cum Bed, Cinema
Seating), a capacity of 3,200 seats per month, a four-stage quality process, a
twelve-area factory and a workforce that is more than 80% women.

Never invent a number. Dimensions, recline angles, foam densities, lead times,
MOQs and prices are specified per programme — say so and point the visitor to
inquiry@lnsindia.co.in or +91 8817852528. This is not an online store.

Be concise and practical: two to four short sentences, plain British English,
no emoji, no markdown headings.
`.trim()

const MAX_MESSAGES = 24
const MAX_CHARS = 4000

function cors(extra = {}) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...extra,
  }
}

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors() })
  }
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: cors() })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Advisor is not configured.' }), {
      status: 503,
      headers: cors({ 'Content-Type': 'application/json' }),
    })
  }

  let messages
  try {
    const body = await request.json()
    messages = body?.messages
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON.' }), {
      status: 400,
      headers: cors({ 'Content-Type': 'application/json' }),
    })
  }

  // Validate rather than trust: this endpoint is public.
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages supplied.' }), {
      status: 400,
      headers: cors({ 'Content-Type': 'application/json' }),
    })
  }

  const contents = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string')
    .map((m) => ({ role: m.role, parts: [{ text: m.text.slice(0, MAX_CHARS) }] }))

  if (contents.length === 0) {
    return new Response(JSON.stringify({ error: 'No usable messages.' }), {
      status: 400,
      headers: cors({ 'Content-Type': 'application/json' }),
    })
  }

  try {
    const ai = new GoogleGenAI({ apiKey })
    const result = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    })

    const text = (result.text || '').trim()
    if (!text) throw new Error('Empty response from model')

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: cors({ 'Content-Type': 'application/json' }),
    })
  } catch (err) {
    // Never leak the upstream error (it can echo key material) to the browser.
    console.error('Advisor upstream error:', err)
    return new Response(JSON.stringify({ error: 'The advisor could not answer that just now.' }), {
      status: 502,
      headers: cors({ 'Content-Type': 'application/json' }),
    })
  }
}

/*
 * --- Google Cloud Functions / Cloud Run (Express) ---------------------------
 *
 * import express from 'express'
 * const app = express()
 * app.use(express.json())
 * app.post('/api/advisor', async (req, res) => {
 *   const response = await handler(
 *     new Request('http://local/api/advisor', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(req.body),
 *     }),
 *   )
 *   res.status(response.status)
 *   response.headers.forEach((v, k) => res.setHeader(k, v))
 *   res.send(await response.text())
 * })
 * app.listen(process.env.PORT || 8080)
 */
