/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jomhuria: ['Jomhuria', 'sans-serif'],
        cabin: ['Cabin', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
