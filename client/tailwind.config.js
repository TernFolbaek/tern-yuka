/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.tw-header': {
          fontSize: '2rem',
          fontWeight: '700',
          lineHeight: '1.2',
          paddingBottom: '1rem',
        },
        '.tw-sub-header': {
          fontSize: '1.5rem',
          fontWeight: '600',
          lineHeight: '1.3',
        },
        '.tw-subtitle': {
          fontSize: '1.1rem',
          fontWeight: '300',
          lineHeight: '1.6',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}