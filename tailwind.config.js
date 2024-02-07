/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#349988'
      },
      backgroundColor: {
        'main': '#349988',
      },
      fontFamily: {
        'main': ['georgia'],
      },
      textColor: {
        'main': '#349988'
      },
      borderColor: {
        'main': '#349988'
      }
    },
  },
  plugins: [],
}

