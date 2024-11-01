/** @type {import('tailwindcss').Config} */

const { createThemes } = require('tw-colors');

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
      screens: {
        'xl': '1100px',
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
  plugins: [
    createThemes({
      light: {
        'badge-play': '#DA5D77',
        'bilibili': '#00AEEC',
        'music-player-bg': '#DEEFFD',
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
        'oen-red-2': '#E97365',
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

        'pome-bg': '#eaeaff',
        'pome-fg': '#3b37fd',

        'weibo-bg': '#ffe8ec',
        'weibo-fg': '#f44152',

        'bilibili-bg': '#e3faff',
        'bilibili-fg': '#37abe9',

        'vr-bg': '#e5feee',
        'vr-fg': '#53e383',

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
        'accent-bg': '#E4F7FF',
        'accent-fg': '#49a4ed',
        'accent-oen': '#87EAFF',
        'accent-oen-2': '#DA5D77',
        'accent-2': '#FBF2C6',
        'accent-3': '#E97365',
        'placeholder': '#E7E2E3',
        'background': '#B3D6F6',
        'background-2': '#99C7F3',
        'secondary-background': '#F0F8FD',
        'tertiary-background': '#FEFEFE',

        'main-page-background': '#F0F8FD',

        'normal-label': '#FFFFFF',
      },

      dark: {
        // ["34281c","733e2e","fdfded","edc69a","170e0c","3c2b1f","6f474c"]
        'badge-play': '#DA5D77',
        'bilibili': '#00AEEC',
        'music-player-bg': '#6F474C',
        'item-hover': '#45BEEA',

        'pome-bg': '#171A35',
        'pome-fg': '#6866ff',

        'weibo-bg': '#341A1D',
        'weibo-fg': '#F3526F',

        'bilibili-bg': '#1B2932',
        'bilibili-fg': '#37abe9',

        'vr-bg': '#1D3222',
        'vr-fg': '#6BE98C',

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
        'oen-red-2': '#E97365',
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

        'label': '#F0D59E',
        'secondary-label': '#EDC69A',
        'tertiary-label': '#733E2E',
        'accent': '#AC2523',
        'accent-bg': '#2F1E1F',
        'accent-fg': '#C43C39',
        'accent-oen': '#87EAFF',
        'accent-oen-2': '#DA5D77',
        'accent-2': '#FBF2C6',
        'accent-3': '#E97365',
        'placeholder': '#34281C',
        'background': '#3C2B1F',
        'background-2': '#6F474C',
        'secondary-background': '#2A1D16',
        'tertiary-background': '#33241B',
        'main-page-background': '#170E0C'

      },
      flower: {
        // ["A282A1", "895F65", "D35B68", "FBF9FC", "F9E7F7", "DEE4F7", "F9CCD7", "312025"]
        'badge-play': '#DA5D77',
        'bilibili': '#00AEEC',
        'music-player-bg': '#F9CCD7',
        'item-hover': '#45BEEA',

        'pome-bg': '#eaeaff',
        'pome-fg': '#3b37fd',

        'weibo-bg': '#ffe8ec',
        'weibo-fg': '#f44152',

        'bilibili-bg': '#e3faff',
        'bilibili-fg': '#37abe9',

        'vr-bg': '#e5feee',
        'vr-fg': '#53e383',
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
        'oen-red-2': '#E97365',
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

        'label': '#895F65',
        'secondary-label': '#A282A1',
        'tertiary-label': '#D35B68',
        'accent': '#D35B68',
        'accent-2': '#F9E7F7',
        'accent-3': '#D35B68',
        'accent-oen': '#F9D9E9',
        'accent-oen-2': '#312025',
        'accent-bg': '#fbd8dc',
        'accent-fg': '#b52e3d',
        'background': '#F9E7F7',
        'background-2': '#F9CCD7',
        'main-page-background': '#DEE4F7',
        'secondary-background': '#312025',
        'tertiary-background': '#FBF9FC',
      },

      marvelous: {
        'badge-play': '#DA5D77',
        'bilibili': '#00AEEC',
        'music-player-bg': '#63392C',
        'item-hover': '#45BEEA',

        'pome-bg': '#171A35',
        'pome-fg': '#6866ff',

        'weibo-bg': '#341A1D',
        'weibo-fg': '#F3526F',

        'bilibili-bg': '#1B2932',
        'bilibili-fg': '#37abe9',

        'vr-bg': '#1D3222',
        'vr-fg': '#6BE98C',


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
        'oen-red-2': '#E97365',
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

        'label': '#A18FA3',
        'secondary-label': '#9C818E',
        'tertiary-label': '#4A414F',
        'accent': '#812722',
        'accent-bg': '#311016',
        'accent-fg': '#946170',
        'accent-oen': '#87EAFF',
        'accent-oen-2': '#DA5D77',
        'accent-2': '#FBF2C6',
        'accent-3': '#E97365',
        'placeholder': '#34281C',
        'background': '#4A414F',
        'background-2': '#534E54',
        'secondary-background': '#060608',
        'tertiary-background': '#534E54',
        'main-page-background': '#25253a'
      }
    })
  ],
}

