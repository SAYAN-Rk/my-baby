/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
        ,
        peach: {
          50: '#fff6f0',
          100: '#fff0e6',
          200: '#ffd8c2',
          300: '#ffc4a8',
          400: '#ffb28a',
          500: '#ff9b6a',
          600: '#ff7f44',
          700: '#e5632f',
          800: '#bf4a22',
          900: '#8f301a',
        },
        nude: {
          50: '#fff8f2',
          100: '#fff5ee',
          200: '#fff1e6',
          300: '#ffe9d8',
          400: '#ffdcbf',
          500: '#ffcfaa',
          600: '#ffb88a',
          700: '#e69b6f',
          800: '#bf7f57',
          900: '#8f5c3f',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-heart': 'pulse-heart 1.5s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-heart': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
