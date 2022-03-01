module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ['IBM Plex Sans']
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: {
      myTheme: {
        primary: '#1C4ED8'
      }
    },
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: "dark",
  },
}