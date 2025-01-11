/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fly: "fly 4s ease-in-out infinite",
      },
      keyframes: {
        fly: {
          "0%": { transform: "translateX(-5rem)" },
          "100%": { transform: "translateX(calc(100vw + 5rem))" },
        },
      },
      colors: {
        gray: {
          30: "#FBFCFE",
          50: "#F4F8FA",
          70: "#E9EEF1",
          100: "#CDD9E4",
          200: "#90A2B7",
          300: "#768797",
          400: "#56687A",
          500: "#41505B",
          black: "#1E272E",
        },
        green: {
          light: "#C1F57C",
          dark: "#518E00",
        },
        blue: {
          100: "#DCEFFF",
          300: "#7FC3FF",
          500: "#217DFF",
        },
        pink: "#FF8BF5",
        orange: "#FF9852",
        black: "#1E272E",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
