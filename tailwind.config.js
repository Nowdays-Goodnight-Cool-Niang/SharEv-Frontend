/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'bounce-delay-1': 'bounce-y 0.8s infinite ease-in-out',
        'bounce-delay-2': 'bounce-y 0.8s infinite ease-in-out 0.2s',
        'bounce-delay-3': 'bounce-y 0.8s infinite ease-in-out 0.4s',
        'modal-enter': 'modal-enter 0.3s ease-in-out forwards',
        'character-enter': 'character-enter 0.6s 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'tooltip-pop': 'tooltip-pop 0.5s ease-in-out forwards',
        'button-in': 'fade-in 0.2s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'character-enter': {
          '0%': {
            transform: 'translateY(0) scale(0.95)',
            opacity: 0,
          },
          '80%': {
            transform: 'translateY(calc(-100% + 6rem)) scale(1)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(calc(-100% + 6rem)) scale(1)',
            opacity: 1,
          },
        },
        'modal-enter': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'tooltip-pop': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px) scale(0.95)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateY(-1px) scale(1.05)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
      },
      colors: {
        orange: {
          500: '#FF6A29',
          700: '#ED4700',
        },
      },
    },
  },
  plugins: [require('tailwindcss-3d')],
};
