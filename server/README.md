# Comfort Advisor proxy

Optional. Use this when you would rather not ship the Gemini API key to the
browser.

## The trade-off

| | Direct (default) | Proxied (this folder) |
|---|---|---|
| Setup | Set `GEMINI_API_KEY` and build | Deploy a function, set `VITE_AI_PROXY_URL` |
| Key location | Inside the JS bundle — publicly readable | On the server only |
| Backend needed | No | Yes |
| Good for | Google AI Studio, a restricted and quota-capped key | Production on a public domain |

The site works either way, and works fine with neither — the advisor just does
not appear.

## Deploying

The handler in `gemini-proxy.js` takes a `Request` and returns a `Response`, so
it drops into Netlify Functions, Vercel Functions, Cloudflare Workers and Deno
Deploy unchanged. A commented Express wrapper for Cloud Functions / Cloud Run is
at the bottom of the file.

1. Deploy `gemini-proxy.js` with `@google/genai` as a dependency.
2. Set these environment variables on the function:
   - `GEMINI_API_KEY` — required
   - `GEMINI_MODEL` — optional, defaults to `gemini-2.5-flash`
   - `ALLOWED_ORIGIN` — set to `https://www.lnsindia.co.in` in production
     rather than leaving it as `*`
3. Set `VITE_AI_PROXY_URL` to the deployed URL and rebuild the site.

Once `VITE_AI_PROXY_URL` is set, the browser never sees a key and
`GEMINI_API_KEY` is not needed in the site build at all.

## Keeping the system prompt in step

The browser build generates its system instruction from the site's own data
files, so the advisor can never contradict the pages. The proxy cannot import
those files, so it carries its own condensed copy near the top of
`gemini-proxy.js`. It is pinned server-side deliberately — accepting the prompt
from the client would let anyone rewrite the assistant's rules.

If you materially change the product ranges or the company facts, update that
copy too.
