/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // A neutral, no-hue palette by explicit client request — no navy, no
        // gold, anywhere in the design system. `ink` is the workhorse scale
        // for text, backgrounds and borders (Tailwind's own zinc ramp, with
        // ink-500 nudged one step darker than stock zinc-500 — #71717A only
        // clears 4.43:1 against the porcelain body, just short of the 4.5:1
        // AA bar for body text; #6B6B74 clears 4.84:1).
        ink: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#6B6B74',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
        // `accent` is where gold used to carry emphasis (eyebrows, icons,
        // active states, rules). With hue off the table, emphasis comes from
        // going darker/heavier rather than from colour — so this ramps to
        // black faster than `ink` does, giving accented elements a visibly
        // stronger, more deliberate weight than ordinary body text at the
        // same nominal "step". 400/500/600 all clear 4.5:1+ against the
        // porcelain body, so any of them is safe for small text.
        accent: {
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#52525B',
          500: '#33333A',
          600: '#232326',
          700: '#161618',
          800: '#000000',
          900: '#000000',
        },
        // The light base the site sits on — true neutral now, no blue lean.
        porcelain: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#D9D9D9',
          400: '#BFBFBF',
        },
      },
      fontFamily: {
        // -apple-system / BlinkMacSystemFont invoke the OS's own system font —
        // on macOS and iOS that is literally San Francisco. Nothing is
        // redistributed; every other platform falls through to Inter, which
        // was chosen specifically because its metrics and shapes are close to
        // SF Pro. `display` and `sans` share the same stack: headings are a
        // heavier weight of the same face rather than a separate serif, to
        // match Apple's own typographic system.
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'Segoe UI',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        /** Not used by any heading today — kept only in case a future page wants one deliberately editorial moment. */
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1200px',
        prose: '72ch',
      },
      boxShadow: {
        glass: '0 8px 32px -8px rgba(0, 0, 0, 0.10), 0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        'glass-lg': '0 24px 64px -16px rgba(0, 0, 0, 0.16), 0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        lift: '0 28px 60px -24px rgba(0, 0, 0, 0.30)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        /* Slow drifting colour fields that glass panels sit on top of. */
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%, 4%, 0) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(26px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 40s linear infinite',
        drift: 'drift 26s ease-in-out infinite',
        'drift-slow': 'drift 38s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        'rise-in': 'rise-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
