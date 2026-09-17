/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Gemini API key. Injected by vite.config.ts from VITE_GEMINI_API_KEY,
   * GEMINI_API_KEY or API_KEY so the same build works locally and in Google
   * AI Studio. Leave unset to ship the site without the advisor.
   */
  readonly VITE_GEMINI_API_KEY?: string
  /** Optional server-side endpoint that holds the key. Preferred in production. */
  readonly VITE_AI_PROXY_URL?: string
  /** Overrides the Gemini model id. Defaults to gemini-2.5-flash. */
  readonly VITE_GEMINI_MODEL?: string
  /** Sub-path the site is served from. Defaults to '/'. */
  readonly VITE_BASE?: string
  /** Optional form backend for the contact page. Falls back to mailto. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
