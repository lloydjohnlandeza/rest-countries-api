/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-dm-dark-blue': 'hsl(209, 23%, 22%)',
        'my-dm-very-dark-blue': 'hsl(207, 26%, 17%)',
        'my-lm-very-dark-blue-light': 'hsl(200, 15%, 8%)',
        'my-lm-dark-gray': 'hsl(0, 0%, 52%)',
        'my-lm-very-light-gray': 'hsl(0, 0%, 98%)',
        'my-white': 'hsl(0, 0%, 100%)',
      },
      boxShadow: {
        'my': '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
      },
      fontFamily: {
        'nunito': "'nunito'",
      },
    },
  },
  plugins: [],
}