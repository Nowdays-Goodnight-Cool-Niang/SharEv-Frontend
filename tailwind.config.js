/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    animation: {
      "fade-in": "fade-in 1s ease-out forwards",
    },
    keyframes: {
      "fade-in": {
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
    },
    extend: {
      colors: {
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#DEDEDE",
          400: "#BDBDBD",
          500: "#7C7C7C",
          600: "#4B4B4B",
          700: "#282828",
          800: "#1E1E1E",
          900: "#0D0D0D",
        },
        orange: {
          500: "#FF6A29",
          700: "#ED4700",
        },
      },
    },
  },
  plugins: [],
};
