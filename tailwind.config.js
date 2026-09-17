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
          50: '#FDF8EA',
          100: '#F9EDC7',
          200: '#F1DA8D',
          300: '#E6C258',
          400: '#D3A320', // primary gold
          500: '#B98B16',
          600: '#996F12',
          700: '#7A5713',
          800: '#5E4315',
          900: '#3F2D0F',
        },
        sand: {
          50: '#FBFAF7',
          100: '#F5F2EB',
          200: '#EAE4D8',
          300: '#D9CFBC',
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
      },
    },
  },
  plugins: [],
}
