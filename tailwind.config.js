const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        'sm-custom': '0px 1px 24px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
