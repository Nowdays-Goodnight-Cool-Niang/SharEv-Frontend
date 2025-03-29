/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    animation: {
      'fade-in': 'fade-in 1s ease-out forwards',
      'bounce-delay-1': 'bounce-y 0.8s infinite ease-in-out',
      'bounce-delay-2': 'bounce-y 0.8s infinite ease-in-out 0.2s',
      'bounce-delay-3': 'bounce-y 0.8s infinite ease-in-out 0.4s',
    },
    keyframes: {
      'fade-in': {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
      'bounce-y': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#DEDEDE',
          400: '#BDBDBD',
          500: '#7C7C7C',
          600: '#4B4B4B',
          700: '#282828',
          800: '#1E1E1E',
          900: '#0D0D0D',
        },
        orange: {
          500: '#FF6A29',
          700: '#ED4700',
        },
      },
    },
  },
  plugins: [],
};
