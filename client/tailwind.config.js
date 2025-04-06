/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      roboto: ['Roboto', 'sans-serif'], // Add Roboto as a font family
    },},
  },
  plugins: [],
}

