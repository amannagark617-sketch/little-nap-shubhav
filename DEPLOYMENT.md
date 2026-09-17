# Deployment

The site is a static single-page app. Any host that can serve a folder of files
will do — the only requirement is **one rewrite rule** sending unknown paths to
`index.html`, so that refreshing `/products` does not 404.

Build output goes to `dist/`.

---

## Option 1 — Google AI Studio → Cloud Run

This is the path you asked about, and it is the one that makes the Comfort
Advisor easiest to switch on, because AI Studio injects the Gemini key for you.

1. Open [aistudio.google.com](https://aistudio.google.com) and create an app
   (**Build** → new app).
2. Upload this repository, or connect it from GitHub.
3. AI Studio reads `metadata.json` for the app's name and description.
4. Add your Gemini API key in the app's settings. AI Studio exposes it as
   `GEMINI_API_KEY`, which `vite.config.ts` already picks up — no code change
   needed.
5. Deploy. AI Studio builds the Vite app and deploys it to **Cloud Run** under
   your billing account.

**Cost.** Cloud Run bills per request with a monthly free tier; a brochure site
of this size normally costs very little, but it is not free-by-design the way
the static hosts below are.

**One thing to check.** AI Studio's Cloud Run container must serve `index.html`
for unknown paths. If `/products` 404s on refresh after deploying, either switch
to a static host below, or serve the build behind the nginx config in
"Cloud Run directly".

---

## Option 2 — Free static hosting (recommended)

For a marketing site with no server-side logic, a static host is faster,
simpler, and genuinely free at this traffic level. All three below include free
TLS and a global CDN.

### Netlify

`public/_redirects` is already in the repo, so SPA routing works with no extra
setup.

- Build command: `npm run build`
- Publish directory: `dist`
- Add any environment variables under **Site settings → Environment variables**

### Vercel

`vercel.json` is already in the repo, with SPA rewrites and long-lived caching
for images and hashed assets.

- Framework preset: Vite
- Everything else is picked up from `vercel.json`

### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Add a redirect rule: `/*` → `/index.html` (200), or commit a `_redirects`
  file — the one in `public/` works here too.

---

## Option 3 — Cloud Run directly

If you would rather run the container yourself:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
```

```nginx
# nginx.conf
server {
  listen 8080;
  root /usr/share/nginx/html;
  index index.html;

  # Hashed filenames, so these can be cached indefinitely.
  location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
  location /images/ { expires 1y; add_header Cache-Control "public, immutable"; }

  # Everything else falls through to the SPA.
  location / { try_files $uri $uri/ /index.html; }
}
```

```bash
gcloud run deploy lns-website \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

`asia-south1` (Mumbai) is the closest region to the audience.

---

## Option 4 — GitHub Pages

Works, but needs the base path set because project sites are served from a
sub-path:

```bash
VITE_BASE=/little-nap-shubhav/ npm run build
```

Pages has no rewrite support, so copy `dist/index.html` to `dist/404.html` as an
SPA fallback. If you are pointing a custom domain at the root, `VITE_BASE` is
not needed.

---

## Environment variables

Every one of these is optional. With none set, the site builds and works —
the advisor is hidden and the contact form composes an email instead.

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Comfort Advisor, direct from the browser. AI Studio sets this for you. **Embedded in the bundle and publicly readable.** |
| `VITE_AI_PROXY_URL` | Comfort Advisor via your own endpoint, keeping the key server-side. Takes precedence over `GEMINI_API_KEY`. |
| `VITE_GEMINI_MODEL` | Override the model. Defaults to `gemini-2.5-flash`. |
| `VITE_FORM_ENDPOINT` | JSON endpoint for the contact form (Formspree, Basin, Web3Forms, your own). Falls back to `mailto:`. |
| `VITE_BASE` | Sub-path when not serving from the domain root. |

### About the Gemini key

Anything prefixed `VITE_` — and `GEMINI_API_KEY`, which `vite.config.ts` maps
into the client — is **compiled into the JavaScript and visible to anyone who
opens developer tools**. That is inherent to a browser-only AI integration, not
a flaw in this build.

If you use the direct mode, protect the key:

- Restrict it to the Generative Language API only
- Add an HTTP-referrer restriction for `lnsindia.co.in`
- Set a low daily quota cap
- Rotate it if it is ever misused

For production on a public domain, prefer `server/gemini-proxy.js`, where the
key never reaches the browser at all.

---

## Pointing lnsindia.co.in at the deployment

Once the site is live and you are happy with it:

1. Add the custom domain in your host's dashboard (Netlify, Vercel, Cloudflare
   and Cloud Run all support this).
2. Update DNS at your registrar:
   - **Apex** (`lnsindia.co.in`) — an `A`/`ALIAS` record, or the `A` records
     your host specifies
   - **`www`** — a `CNAME` to the host's target
3. Let the host issue its TLS certificate (usually minutes).
4. Set one of the two as canonical and redirect the other. The site currently
   declares `https://www.lnsindia.co.in/` as canonical in `index.html`; if you
   prefer the apex, update that tag, `public/robots.txt` and
   `public/sitemap.xml` to match.

Keep the old site reachable until DNS has fully propagated.

---

## Pre-launch checklist

- [ ] Confirm the "Miller" duplicate in Cinema Seating (see README, Known gaps)
- [ ] Confirm client names may be listed publicly
- [ ] Replace deck photography with studio shots when available
- [ ] Decide on `www` vs apex and make the canonical tag, robots.txt and
      sitemap.xml agree
- [ ] Set `VITE_FORM_ENDPOINT` so enquiries arrive without relying on the
      visitor's mail client
- [ ] If using the advisor, restrict and quota-cap the key — or deploy the proxy
- [ ] Add analytics if wanted (none is included; nothing tracks visitors today)
