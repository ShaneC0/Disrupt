const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      coolGray: colors.coolGray,
      teal: colors.teal,
      yellow: colors.yellow,
      warmGray: colors.warmGray,
      rose: colors.rose
    },
    extend: {
      gridTemplateColumns: {
        'app': '5vw 15vw 65vw 15vw',
        'auth': 'auto 30vw auto'
      },
      gridTemplateRows: {
        'app': '2vh auto',
        'auth': 'auto 60vh auto'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
