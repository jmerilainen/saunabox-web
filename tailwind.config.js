const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        'body': 'Poppins',
        'display': 'Syne',
      },
    },
  },
  plugins: [
    require('tailwind-easing-gradients')({
        variants: ['responsive'],
        // required
        gradients: {
          'map': ['#faf9f9', 'rgba(250, 249, 249, 0)'], // must be two colors
          'map-dark': ['#080D21', 'rgba(8, 13, 33, 0)'], // must be two colors
        },
        // defaults
        alphaDecimals: 5,
        colorMode: 'lrgb',
        type: 'linear',
        easing: 'ease', // default settings
        colorStops: 15,
        directions: {
          't': 'to top',
          'r': 'to right',
          'b': 'to bottom',
          'l': 'to left'
        },
    }),
    plugin(function({ addUtilities, addComponents }) {
      addUtilities({
        '.stretched::after': {
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          background: 'transparent',
          zIndex: '10',
          pointerEvents: 'auto',
          content: '\'\''
        },
      });
    })
  ],
}
