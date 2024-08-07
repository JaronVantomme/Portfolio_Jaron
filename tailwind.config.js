/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins'],
    },
    extend: {},
    colors: {
      'white': ['#ffffff'],
      'black': ['#000000'],
      'gray': ['#AAAAAA'],
      'background_dark': ['#1C1F24'],
      'background_light': ['#212326'],
      'primary': ['#89CFF0'],
      'skillsBackground': ['#303133'],
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.desktopTitle1': {
          'font-family': 'Poppins, cursive',
          'font-size': '20px',
        },  
        '.desktopTitle2': {
          'font-family': 'Poppins, cursive',
          'font-size': '55px',
        },  
        '.desktopTitle3': {
          'font-family': 'Poppins, cursive',
          'font-size': '20px',
        },  
      });
    },
  ],
}