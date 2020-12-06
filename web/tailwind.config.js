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
        'app': '5vw 95vw',
        'auth': 'auto 30vw auto',
        'server': '15vw auto 15vw'
      },
      gridTemplateRows: {
        'app': '2vh 98vh',
        'auth': 'auto 60vh auto',
        'server': '4vh auto 4vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
