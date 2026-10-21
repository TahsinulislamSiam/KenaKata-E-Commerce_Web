/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep emerald - primary brand colour ("Emerald & Ivory" theme)
        brand: {
          50: '#f0faf5',
          100: '#dbf3e7',
          200: '#b9e6d1',
          300: '#8bd4b6',
          400: '#4fbb94',
          500: '#239f77',
          600: '#12815f',
          700: '#0e674e',
          800: '#0c5240',
          900: '#0a4235',
          950: '#05271f',
        },
        // Antique gold - CTAs & highlights (always paired with brand-950 text)
        accent: {
          50: '#fbf7ea',
          100: '#f7efcf',
          200: '#efdf9d',
          300: '#e7cb6a',
          400: '#dfb73f',
          500: '#d4a51d',
          600: '#8f6a0a',
          700: '#755609',
          800: '#5c440a',
          900: '#45330b',
        },
        // Warm ivory surfaces (light mode)
        surface: {
          50: '#fbf9f4',
          100: '#f5f1e7',
          200: '#ece6d7',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(10 66 53 / 0.06), 0 1px 3px 0 rgb(10 66 53 / 0.08)',
        'card-hover':
          '0 10px 25px -5px rgb(10 66 53 / 0.14), 0 8px 10px -6px rgb(10 66 53 / 0.08)',
        soft: '0 4px 14px -3px rgb(10 66 53 / 0.12)',
        crest: '0 2px 10px -2px rgb(10 66 53 / 0.35)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'carousel-slide': {
          '0%': { opacity: '0', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.35s ease-out both',
        'slide-in-right': 'slide-in-right 0.3s ease-out both',
        shimmer: 'shimmer 1.8s infinite',
        'carousel-slide': 'carousel-slide 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
