/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins'],
    },
    extend: {
      animation: {
        'loop-scroll': 'loop-scroll 50s linear infinite',
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      },
      aspectRatio: {
        '1/2': '1 / 2',
      },                   
    },
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
          'font-size': '25px',
        },  
        '.mobileTitle1': {
          'font-family': 'Poppins, cursive',
          'font-size': '21px',
        },  
        '.desktopTitle2': {
          'font-family': 'Poppins, cursive',
          'font-size': '60px',
        },  
        '.mobileTitle2': {
          'font-family': 'Poppins, cursive',
          'font-size': '42px',
        },  
        '.desktopTitle3': {
          'font-family': 'Poppins, cursive',
          'font-size': '16px',
        },  
        '.mobileTitle3': {
          'font-family': 'Poppins, cursive',
          'font-size': '16px',
        },  
      });
    },
  ],
}