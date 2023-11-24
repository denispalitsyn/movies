/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#131313',
      },
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
