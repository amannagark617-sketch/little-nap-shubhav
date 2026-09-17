# Little Nap Subhav — Corporate Website

A six-page marketing and capability website for **Little Nap Subhav India Pvt.
Ltd.**, an OEM/ODM motion-furniture manufacturer in Dewas, Madhya Pradesh.

Built to replace a single-page brochure site with something a buyer can actually
use: a filterable catalogue, an interactive walkthrough of the factory floor, a
quality-assurance breakdown, and an enquiry basket that turns browsing into a
structured RFQ.

**This is deliberately not an e-commerce site.** Nothing is priced, and there is
no checkout anywhere. Every enquiry is quoted individually, which is how the
business actually works.

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:5173
```

```bash
npm run build          # production build to dist/
npm run preview        # serve the build locally
npm run typecheck      # tsc, no emit
npm run images         # regenerate imagery (see scripts/README.md)
```

No environment variables are required. The site builds and runs completely
without them — the AI advisor simply does not appear.

---

## What's in it

| Page | What it does |
|---|---|
| **Home** | Hero, capability figures with count-up, the five differentiators, range navigator, construction features, vision, client marquee |
| **Products** | 22 models across 8 ranges. Filter by range, free-text search, URL-synced state, detail modal |
| **Manufacturing** | Interactive 12-stage walkthrough of the plant, capability figures, photo gallery with lightbox |
| **Quality** | The four-stage inspection process and what traceability means per unit |
| **About** | Vision and mission, the women-led workforce, culture, partnership model, clients |
| **Contact** | Enquiry form pre-loaded with the visitor's selected models |

### Features worth knowing about

- **Enquiry list** — the non-commercial answer to a shopping cart. Collect
  models, set indicative quantities, and the list is carried into the contact
  form as a ready-made RFQ. Persisted to `localStorage`, so a specification
  built over several visits survives.
- **Sofa ↔ bed toggle** — sofa beds were photographed in both states, so the
  detail view lets you switch between them.
- **Comfort Advisor** — an optional Gemini-powered assistant. See below.
- **Accessibility** — keyboard-navigable throughout, focus trapping in every
  dialog, focus restored on close, a skip link, visible focus rings, and full
  `prefers-reduced-motion` support.
- **Never-blank content** — scroll animations degrade safely. Anything already
  on screen renders immediately, and a failsafe reveals anything an observer
  misses, so content can never be trapped invisible.

---

## The Comfort Advisor (optional)

A floating assistant that answers questions about ranges, capacity, the factory
process and OEM customisation.

Its system prompt is **generated from the site's own data files** at build time,
so it cannot drift away from what the pages say. It is explicitly instructed
never to invent a number — dimensions, recline angles, foam densities, lead
times, MOQs and prices are all deferred to the sales team, because guessing one
could put a real order at risk.

Two ways to run it:

**A. Direct** (how Google AI Studio works) — set `GEMINI_API_KEY` and build.
No backend. The key is embedded in the JavaScript bundle and is publicly
readable, so only use a key you have restricted and quota-capped.

**B. Proxied** (recommended for production) — deploy `server/gemini-proxy.js`,
set `VITE_AI_PROXY_URL`, and the key stays on the server. See
[`server/README.md`](server/README.md).

Set neither and the advisor is hidden entirely. The Gemini SDK is loaded on
demand, so visitors who never open it never download it.

---

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for Google AI Studio, Cloud Run, Netlify,
Vercel and Cloudflare Pages, plus pointing `lnsindia.co.in` at the result.

The short version: it is a static SPA. Build with `npm run build`, serve
`dist/`, and add one rewrite rule sending unknown paths to `index.html`.

---

## Project structure

```
src/
  data/           Company facts, product catalogue, factory process
  components/     Header, Footer, Logo, cards, modals, drawer, advisor, icons
  context/        Enquiry list state (localStorage-backed)
  lib/            Gemini client
  pages/          One file per route
scripts/          Image pipeline (see scripts/README.md)
server/           Optional Gemini proxy (see server/README.md)
public/images/    Optimised WebP — the source of truth for imagery
```

### Editing content

Almost all copy lives in three files, so changes rarely need component edits:

- `src/data/company.ts` — vision, mission, differentiators, figures, quality
  stages, clients, contact details
- `src/data/products.ts` — the eight ranges and 22 models
- `src/data/factory.ts` — the twelve process areas

The Comfort Advisor reads from these same files, so updating a fact updates the
pages *and* the assistant together.

---

## Known gaps

Worth knowing before this goes live:

- **Photography is deck-resolution.** Product shots are 500–720 px on the long
  edge, which is fine at the sizes used but will not survive enlargement.
  `scripts/README.md` explains how to drop in studio photography without
  touching code.
- **Model-level specifications are not published.** Ranges carry
  construction-level detail; individual models deliberately carry none, because
  the deck publishes none. Add them to `specHighlights` when engineering
  supplies them.
- **Cinema Seating lists "Miller" twice in the deck.** They appear to be two
  finishes of one model, so the site treats them as one product with two
  gallery images. Worth confirming.
- **Client names are set as text, not logos.** The logos in the deck are
  photographs of signage and printed marks, too low-quality to use. Text
  wordmarks read better and avoid misusing third-party trademarks.
- **The logo is a raster mark plus live type.** No vector original was
  available. Replacing `public/images/brand/mark.png` with an SVG is easy if
  one exists.

---

## Tech

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · React Router 7 ·
`@google/genai` (lazy-loaded)

Initial load is roughly 100 kB gzipped; interior pages are code-split and
fetched on navigation.
