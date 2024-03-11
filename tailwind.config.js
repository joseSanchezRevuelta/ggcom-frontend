/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#349988',
        'main2': '#42BFAA',
        'main3': '#f8df96',
      },
      backgroundColor: {
        'main': '#349988',
        'main2': '#b99a54'
      },
      fontFamily: {
        'main': ['lato'],
        // body: ['MantinaRegular']
      },
      textColor: {
        'main': '#349988',
        'main2': '#b99a54',
      },
      borderColor: {
        'main': '#349988'
      },
      ringColor: {
        'main': '#349988'
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

