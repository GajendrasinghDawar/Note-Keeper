import {
  gray,
  red,
  grass,
  sand,
  tomato,
  amber,
  jade,
  iris,
  blackA,
  whiteA,
  yellow,
  crimson,
  green
} from '@radix-ui/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray,
        sand,
        yellow,
        iris,
        amber,
        crimson,
        grass,
        jade,
        green,
        red,
        tomato,
        blackA,
        whiteA
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

