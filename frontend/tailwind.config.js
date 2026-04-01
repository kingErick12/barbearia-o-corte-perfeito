/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Dark premium
        surface: '#171717',    // Slightly lighter dark for cards
        primary: '#D4AF37',    // Classic Gold
        secondary: '#B8860B',  // Dark Goldenrod hover
        wood: '#2E1503',       // Dark wood accent
        textPrimary: '#F5F5F5',
        textSecondary: '#A3A3A3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Classy elegant serif for titles
      }
    },
  },
  plugins: [],
}
