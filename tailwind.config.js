/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'main-cursor': 'url(/assets/cursor/v2/pointer.png), pointer',
      }
    },
    colors: {
      'theme-blue': '#87EAFF',
      'theme-red': '#DA5D77',
      'badge-play': '#DA5D77',
      'bilibili': '#00AEEC',
      'music-player-bg': '#655E66',
      'white': '#FFFFFF',
      'secondary-label': '#4b5258',
      'secondary-bg': '#AFAFAF',
    },
    fontSize: {
      'base': '1rem',
      'sm': '0.8rem',
    }
  },
  plugins: [],
}

