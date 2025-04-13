/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1.5s ease-in-out',
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(1800deg)' },
          '100%': { transform: 'rotateY(3600deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}