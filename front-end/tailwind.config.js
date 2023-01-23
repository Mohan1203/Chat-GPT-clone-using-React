/** @type {import('tailwindcss').Config} */

module.exports = {


  content: ["*"],
  theme: {
    extend: {},
    fontFamily:{
      display:["Roboto"],
      body:["Roboto"]
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
}
}
