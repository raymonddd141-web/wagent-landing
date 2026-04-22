/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C35A',
          dark: '#B8942F',
        },
        navy: {
          DEFAULT: '#1A1A2E',
          deep: '#0F0F1E',
        },
        ink: '#0D0D0D',
        cream: '#F5F5F0',
        parchment: '#F9F8F6',
        'border-light': '#E5E0D8',
        'border-dark': '#2A2A2A',
        'card-light': '#F9F8F6',
        'card-dark': '#141414',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E6C35A 50%, #B8942F 100%)',
        'african-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23D4AF37' fill-opacity='0.04'%3E%3Cpath d='M30 0l5 10-5 5-5-5zM30 60l-5-10 5-5 5 5zM0 30l10-5 5 5-5 5zM60 30l-10 5-5-5 5-5z'/%3E%3Cpath d='M15 15l7 7-7 7-7-7zM45 15l7 7-7 7-7-7zM15 45l7 7-7 7-7-7zM45 45l7 7-7 7-7-7z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
