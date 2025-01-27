/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        cloudinary:{
          500: '#F9EBE9',
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        zoomIn: "zoomIn 0.8s ease-in-out",
        zoomOut: "zoomOut 0.8s ease-in-out",
        slideInLeft: "slideInLeft 1s ease-out",
        slideInRight: "slideInRight 1s ease-out",
        bounceIn: "bounceIn 1s ease-in-out",
        pulseSlow: "pulse 3s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
        zoomOut: {
          "0%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.5)", opacity: 0 },
          "50%": { transform: "scale(1.1)", opacity: 0.5 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
    },
  },
  plugins: [],
}

