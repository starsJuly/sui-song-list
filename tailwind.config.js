/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'main-cursor': "url('/assets/cursor/v2/pointer.png'), pointer",
      }
    },
    colors: {
      'badge-play': '#DA5D77',
      'bilibili': '#00AEEC',
      'music-player-bg': '#655E66',
      'white': '#FFFFFF',
      'label': '#000000',
      'secondary-label': '#4b5258',
      'secondary-bg': '#AFAFAF',
      'item-hover': '#45BEEA',

      // generated from #87EAFF
      'oen-blue': '#87EAFF',
      'oen-color-1': "#e1fdff",
      'oen-color-2': "#ccf8ff",
      'oen-color-3': "#9ceeff",
      'oen-color-4': "#68e4fe",
      'oen-color-5': "#43dbfd",
      'oen-color-6': "#2fd6fd",
      'oen-color-7': "#1dd4fe",
      'oen-color-8': "#00bbe3",
      'oen-color-9': "#00a7cb",
      'oen-color-10': "#0090b3",
      
      // generated from #DA5D77
      'oen-red': '#DA5D77',
      'oen-color-11': "#ffeaf1",
      'oen-color-12': "#fbd6df",
      'oen-color-13': "#efadbb",
      'oen-color-14': "#e38095",
      'oen-color-15': "#da5b75",
      'oen-color-16': "#d44361",
      'oen-color-17': "#d23657",
      'oen-color-18': "#bb2747",
      'oen-color-19': "#a71f3f",
      'oen-color-20': "#941335"
    },
    fontSize: {
      'base': '1rem',
      'sm': '0.8rem',
    }
  },
  plugins: [],
}

