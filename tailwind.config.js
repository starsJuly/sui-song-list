/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./config/constants.js",
  ],
  theme: {
    extend: {
      cursor: {
        'main-cursor': "url('/assets/cursor/v2/pointer.png'), pointer",
      },
      colors: {
        'badge-play': '#DA5D77',
        'bilibili': '#00AEEC',
        'music-player-bg': '#99C7F3',
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
        'oen-color-20': "#941335",

        'pome-bg-light': '#eaeaff',
        'pome-fg-light': '#3b37fd',

        'weibo-bg-light': '#ffe8ec',
        'weibo-fg-light': '#f44152',

        'bilibili-bg-light': '#e3faff',
        'bilibili-fg-light': '#37abe9',

        'vr-bg-light': '#e5feee',
        'vr-fg-light': '#53e383',

        'palette-1': '#E7E2E3', 
        'palette-2': '#E97365', 
        'palette-3': '#99C7F3', 
        'palette-4': '#B3D6F6', 
        'palette-5': '#F0F8FD', 
        'palette-6': '#FEFEFE', 
        'palette-7': '#70B9F2', 
        'palette-8': '#7C9DB4', 
        'palette-9': '#94B4CE', 
        'palette-10': '#FBF2C6',

        'label': '#7C9DB4',
        'secondary-label': '#94B4CE',
        'tertiary-label': '#99C7F3',
        'accent': '#70B9F2',
        'accent-oen': '#87EAFF',
        'accent-oen-2': '#DA5D77',
        'extra': '#FBF2C6',
        'extra-2': '#E97365',
        'placeholder': '#E7E2E3',
        'background': '#B3D6F6',
        'secondary-background': '#F0F8FD',
        'tertiary-background': '#FEFEFE',

        'platinum': { 
          DEFAULT: '#E7E2E3', 
          100: '#322a2b', 
          200: '#645457', 
          300: '#947f83', 
          400: '#beb1b4', 
          500: '#e7e2e3', 
          600: '#ece9e9', 
          700: '#f1eeef', 
          800: '#f6f4f4', 
          900: '#faf9fa' 
        }, 
        'non_photo_blue': { DEFAULT: '#9BE0FC', 100: '#02394f', 200: '#05739e', 300: '#07aced', 400: '#4dc9f9', 500: '#9be0fc', 600: '#b0e7fd', 700: '#c4edfd', 800: '#d7f3fe', 900: '#ebf9fe' }, 'jordy_blue': { DEFAULT: '#99C7F3', 100: '#082947', 200: '#11528e', 300: '#197ad6', 400: '#53a2eb', 500: '#99c7f3', 600: '#afd3f6', 700: '#c3def8', 800: '#d7e9fa', 900: '#ebf4fd' }, 'uranian_blue': { DEFAULT: '#B3D6F6', 100: '#092b4c', 200: '#125798', 300: '#1b82e3', 400: '#66aced', 500: '#b3d6f6', 600: '#c1ddf8', 700: '#d0e6fa', 800: '#e0eefb', 900: '#eff7fd' }, 'alice_blue': { DEFAULT: '#F0F8FD', 100: '#0c3a57', 200: '#1874ae', 300: '#43a7e5', 400: '#9ad0f1', 500: '#f0f8fd', 600: '#f4fafe', 700: '#f7fbfe', 800: '#fafcfe', 900: '#fcfeff' }, 'white': { DEFAULT: '#FEFEFE', 100: '#333333', 200: '#666666', 300: '#999999', 400: '#cccccc', 500: '#fefefe', 600: '#ffffff', 700: '#ffffff', 800: '#ffffff', 900: '#ffffff' }, 'argentinian_blue': { DEFAULT: '#70B9F2', 100: '#062740', 200: '#0c4e81', 300: '#1275c1', 400: '#2e99ec', 500: '#70b9f2', 600: '#8bc7f4', 700: '#a8d5f7', 800: '#c5e3fa', 900: '#e2f1fc' }, 'air_superiority_blue': { DEFAULT: '#7C9DB4', 100: '#162027', 200: '#2d404e', 300: '#436075', 400: '#59809b', 500: '#7c9db4', 600: '#97b1c3', 700: '#b1c5d2', 800: '#cbd8e1', 900: '#e5ecf0' }, 'columbia_blue': { DEFAULT: '#C1D1DA', 100: '#1f2c34', 200: '#3e5867', 300: '#5d849b', 400: '#8fabbc', 500: '#c1d1da', 600: '#cfdbe2', 700: '#dbe4e9', 800: '#e7edf0', 900: '#f3f6f8' }, 'lemon_chiffon': { DEFAULT: '#FBF2C6', 100: '#544706', 200: '#a88e0c', 300: '#efcc1e', 400: '#f5df72', 500: '#fbf2c6', 600: '#fcf5d1', 700: '#fdf7dd', 800: '#fdfae8', 900: '#fefcf4' }
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2560px',
      }
    },
    fontSize: {
      'header': '3rem',
      'title': '2rem',
      'subtitle': '1.2rem',
      'base': '0.9rem',
      'sm': '0.8rem',
      'xs': '0.7rem'
    }
  },
  plugins: [],
}

