/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the Little Nap Subhav corporate deck.
        navy: {
          50: '#EEF1FA',
          100: '#D8DEF2',
          200: '#AEB9E0',
          300: '#7F8DC6',
          400: '#4E5C9C',
          500: '#2A3675',
          600: '#1B2560',
          700: '#151B53', // header bar
          800: '#0E1440',
          900: '#001F5F', // display headings
          950: '#070B2A',
        },
        gold: {
          50: '#FBEFC5',
          100: '#F9EDC7',
          200: '#F1DA8D',
          300: '#E6C258',
          400: '#D3A320', // primary gold — brand mark and accents on dark only
          // 500 and 600 are the text-safe steps on the light body (#F5F8FD):
          // 3.58:1 clears the 3:1 bar for icons and large display type, 5.04:1
          // clears 4.5:1 for body copy. Anything lighter fails WCAG AA there.
          500: '#A87B14',
          600: '#8A6410',
          700: '#7A5713',
          800: '#5E4315',
          900: '#3F2D0F',
        },
        // Cool porcelain base — a white that leans very slightly blue, pulled
        // from the navy rather than from beige. The site sits on light
        // surfaces; navy is reserved for type and small accents rather than
        // large blocks.
        porcelain: {
          50: '#FFFFFF',
          100: '#F5F8FD',
          200: '#E9EFF9',
          300: '#D7E0F0',
          400: '#BCC8E0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        prose: '72ch',
      },
      boxShadow: {
        glass: '0 8px 32px -8px rgba(21, 27, 83, 0.10), 0 2px 8px -2px rgba(21, 27, 83, 0.06)',
        'glass-lg': '0 24px 64px -16px rgba(21, 27, 83, 0.16), 0 4px 16px -4px rgba(21, 27, 83, 0.08)',
        lift: '0 28px 60px -24px rgba(21, 27, 83, 0.30)',
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
