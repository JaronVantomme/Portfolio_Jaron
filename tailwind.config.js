/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': ['#ffffff'],
      'black': ['#000000'],
      'gray': ['#AAAAAA'],
      'background_dark': ['#1C1F24'],
      'background_light': ['#212326'],
      'primary': ['#FEC76A'],
      'skillsBackground': ['#303133'],
    },
  },
  plugins: [],
}