import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Google AI Studio injects the key as GEMINI_API_KEY / API_KEY at build time.
  // Locally we read the same names from .env. Both are surfaced to the client as
  // import.meta.env.VITE_GEMINI_API_KEY so there is a single lookup in app code.
  const geminiKey =
    env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || env.API_KEY || ''

  return {
    plugins: [react()],
    // Served from the domain root by default, which suits Cloud Run, Netlify,
    // Vercel and a custom domain. Deploying under a sub-path (a GitHub Pages
    // project site, say) only needs VITE_BASE='/repo-name/' at build time.
    base: env.VITE_BASE || '/',
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiKey),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  }
})
