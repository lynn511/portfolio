import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#ffffff',
        green: {
          DEFAULT: '#00C24A',
          deep: '#00A03D',
        },
        hairline: '#e6e6e6',
        muted: '#5a5a5a',
        faint: '#9a9a9a',
        // kept for any remnant usage
        brand: {
          orange: '#D35400',
          blue: '#135480',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['Calibri', 'Calibri Light', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        livePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.75)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
        livePulse: 'livePulse 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.2,0.7,0.2,1) forwards',
        bob: 'bob 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
