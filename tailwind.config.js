/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Adding your new premium identity palette
        'royal-blue': {
          DEFAULT: '#4169E1', // Royal Blue base
          dark: '#1D3557',    // Deep Navy/Dark Royal for headers/banners
        },
        'gold': {
          DEFAULT: '#D4AF37', // Metallic Gold accent
          light: '#F3E5AB',   // Soft Cream Gold for subtle backgrounds
        }
      },
    },
  },
  plugins: [],
}