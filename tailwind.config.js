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
  whiteA
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

        iris,
        amber,

        grass,
        jade,

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

