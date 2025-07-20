/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7ff',
          300: '#a5a5ff',
          400: '#7f7fbd',
          500: '#6f6fad',
          600: '#5f5f9d',
          700: '#4f4f8d',
          800: '#3f3f7d',
          900: '#2f2f6d',
        }
      },
      fontFamily: {
        'marcellus': ['Marcellus', 'serif'],
      },
      maxWidth: {
        'custom': '1200px',
      }
    },
  },
  plugins: [],
} 