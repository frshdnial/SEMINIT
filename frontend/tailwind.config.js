/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")], // 👈 CRITICAL: Tells Tailwind how to compile for NativeWind
  theme: {
    extend: {
      colors: {
        brandPrimary: "#1E3A8A",   // Navy Primary Accent color from designs
        brandSuccess: "#10B981",   // Highlight Active Accent
      },
    },
  },
  plugins: [],
}