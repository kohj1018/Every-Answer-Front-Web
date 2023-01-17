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
        'sm-custom': '0px 1px 24px rgba(0, 0, 0, 0.04)',
        'floating-action-btn': '0px 4px 20px rgba(0, 0, 0, 0.08)',
        'button': '0px 4px 24px rgba(0, 0, 0, 0.14)'
      }
    },
    screens: {
      'md': '768px',  //
      // => @media (min-width: 768px) { ... }
      'lg': '1024px'  // laptop
      // => @media (min-width: 1024px) { ... }
    }
  },

  plugins: [require("tailwind-scrollbar-hide")],
}
