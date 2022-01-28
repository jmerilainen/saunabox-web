const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [
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
