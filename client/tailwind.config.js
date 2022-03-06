module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ['IBM Plex Sans']
    },
    container: false,
    extend: {},
  },
  plugins: [require("daisyui"),
  function ({ addComponents }) {
    addComponents({
      '.container': {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        '@screen sm': { maxWidth: '640px' },
        '@screen md': { maxWidth: '768px' },
        '@screen lg': { maxWidth: '975px' },
      }
    })
  }
  ],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: "dark",
  },
}