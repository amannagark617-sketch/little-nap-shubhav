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
| **Home** | Brand-led: hero, a photo quick-nav into the ranges, a campaign banner, who we are, the plant and showroom, capability figures, the women-led workforce, a partner banner, differentiators, culture, the product ranges, an Insights preview, clients, and the map |
| **Products** | 22 models across 8 ranges. Filter by range, free-text search, URL-synced state, detail modal |
| **Manufacturing** | Interactive 12-stage walkthrough of the plant, capability figures, photo gallery with lightbox |
| **Quality** | The four-stage inspection process and what traceability means per unit |
| **About** | Vision and mission, the women-led workforce, culture, partnership model, clients |
| **Contact** | Enquiry form pre-loaded with the visitor's selected models, plus the map, address and live opening hours |

### Design

Light and editorial: a cool porcelain base — white with a faint blue lean
pulled from the brand navy, deliberately not warm/ivory — with navy reserved
for type and gold for accents. Content sits on **frosted glass panels** over
saturated, slow-drifting colour fields (`<Aurora>`), which is what the blur
actually refracts; a thin colour wash alone reads as a flat card, so the
fields carry real saturation and the hero/closing sections get an extra
gold+indigo `signature` glow. A single deep navy band closes the page — it
grounds the layout rather than setting a dark theme.

Every glass surface declares a solid background colour first and only then
layers `backdrop-filter` (plus a diagonal sheen and a colour-tinted shadow)
behind an `@supports` guard, so a browser without backdrop-filter still gets
an opaque, readable card.

Typography leads with `-apple-system` / `BlinkMacSystemFont`, so Safari/macOS/
iOS render the OS's own San Francisco font — nothing bundled or licensed,
just invoked. Everyone else falls through to Inter. Headings are a bold,
tightly-tracked cut of that same sans face rather than a separate display
face, matching how Apple's own type system works.

Motion: headlines reveal word by word, the hero animates in on load (not just
on scroll — see the note in `Reveal.tsx` if you're touching it), sections
fade up on scroll, figures count up, the hero image drifts on a shallow
parallax, a gold hairline tracks scroll progress, and the client list
marquees. All of it is decoration — every animation is switched off under
`prefers-reduced-motion`, and no content's visibility depends on one.

### Features worth knowing about

- **Enquiry list** — the non-commercial answer to a shopping cart. Collect
  models, set indicative quantities, and the list is carried into the contact
  form as a ready-made RFQ. Persisted to `localStorage`, so a specification
  built over several visits survives.
- **Sofa ↔ bed toggle** — sofa beds were photographed in both states, so the
  detail view lets you switch between them.
- **Comfort Advisor** — an optional Gemini-powered assistant. See below.
- **Find us** — the Dewas plant on a map, with the address, a directions link
  and opening hours that highlight today and show a live open/closed badge
  computed in India Standard Time (not the visitor's own clock). The map is
  Google's keyless embed, so there is no Maps API key or billing to manage, and
  it sits over a styled panel that already carries the address — if a corporate
  network blocks the frame, the card still reads as intentional.
- **Facility gallery** — the plant and showroom photographs. See below.
- **Accessibility** — keyboard-navigable throughout, focus trapping in every
  dialog, focus restored on close, a skip link, visible focus rings, and full
  `prefers-reduced-motion` support.
- **Never-blank content** — scroll animations degrade safely. Anything already
  on screen renders immediately, and a failsafe reveals anything an observer
  misses, so content can never be trapped invisible.

---

## Facility photographs — action needed

The gallery on the home and About pages expects five photographs of the plant
and showroom. **They are not in the repository**, so that section currently does
not render at all.

`FacilitySection` probes for each file before painting anything: missing ones are
skipped, and if none are found the whole section removes itself. The site is
therefore correct whether zero, some or all of them are present — but it is
better with them.

To add them, drop the files into `public/images/facility/` using the filenames
in that folder's README, or drop the originals into `scripts/_source/facility/`
and run `npm run images`. Nothing else needs changing.

---

## Homepage creative slots — action needed

The homepage has three more sections built around photography that doesn't
exist yet, using the same self-healing pattern as the facility gallery:

- **Campaign banner** (`CampaignCarousel`) — a 3-slide rotating promotional
  strip under the hero. Files and sizes: `public/images/campaigns/README.md`.
- **Partner banner** (`PartnerBanner`) — the wide "one manufacturing partner"
  section. File and size: `public/images/partner/README.md`.
- **Insights teaser** (`InsightsTeaser`) — three preview cards for a blog that
  doesn't exist yet (see below). Files and sizes: `public/images/insights/README.md`.

Unlike the facility gallery, these don't hide themselves when the photo is
missing — each renders `<PlaceholderImage>` instead: a clearly labelled slot
stating what to shoot and at what size, with the exact file path to drop it
at. Once that file exists, the component starts rendering it automatically —
no code change needed either way. This is deliberate: the campaign and
partner sections carry real copy and calls to action regardless of whether
the photo exists yet, so they shouldn't disappear the way an empty photo
gallery should.

The homepage also has a photo-led quick-navigation strip (`RangeQuickNav`)
under the hero and photo thumbnails on the Products page's range filters —
both use the product photography already in the repository, so there is
nothing to supply for those.

### The "Insights" section is a preview, not a blog

There is no blog yet. `InsightsTeaser` renders three draft article titles
(`src/data/insights.ts`) as plain cards — not links, since there is nowhere
for them to go — each marked "Coming soon". When a real blog exists, give
each draft a `slug`, wrap the card in a `<Link>`, and drop the pill. See the
comment at the top of `insights.ts`.

### A floating WhatsApp button, with one unverified assumption

`WhatsAppButton` (bottom-left, mirroring the Comfort Advisor on the right)
opens a chat using `company.contact.whatsapp` in `src/data/company.ts` — the
Google-listing phone number, on the **unconfirmed** assumption that it is
also the WhatsApp Business number. If it isn't, update that one field.

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
- **The logo is a raster mark plus live type.** The deck's only full lockup
  (icon + wordmark together) is baked into one low-resolution slide image —
  confirmed by rendering the source PDF at up to 24x zoom, which did not
  sharpen the wordmark, meaning it is raster, not vector, and cannot be
  improved by re-extracting it. Used as a header logo it reads soft. The icon
  half is the real, unmodified asset (`public/images/brand/mark.png`); the
  wordmark is live text. If a proper source file exists — pulled from
  lnsindia.co.in's own site header, or a vector/AI file from whoever designed
  it — swap it in and `Logo.tsx` becomes unnecessary; see the comment at the
  top of that file.
- **The WhatsApp number is an unverified assumption.** The floating WhatsApp
  button uses the Google-listing phone number on the assumption that it is
  also the WhatsApp Business line — not confirmed. See
  `company.contact.whatsapp` in `src/data/company.ts`.

---

## Planned: a CMS and blog

Not built yet, but worth recording the intended shape so it lands as a clean
addition rather than a rewrite. This site is a static build with no backend —
that is why it is fast and free to host — so an editable admin panel needs
somewhere to persist content and a way to authenticate an editor.
Recommended approach: a headless CMS (Sanity, Contentful, or similar)
alongside the current site, rather than a bespoke backend. An editor changes
content there; the site rebuilds and redeploys automatically. This keeps the
static-hosting deployment story (see `DEPLOYMENT.md`) intact and adds no
server code to maintain.

The content in `src/data/*.ts` is already structured close to what such a CMS
would model (a `Product`, a `Range`, a `Campaign`, an `InsightDraft` are each
already a plain typed record) — migrating a data file to CMS-sourced content
later is a matter of swapping the import for a fetch call, not restructuring
the page components that consume it.

---

## Tech

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · React Router 7 ·
`@google/genai` (lazy-loaded)

Initial load is roughly 100 kB gzipped; interior pages are code-split and
fetched on navigation.
