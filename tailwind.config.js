/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fcfbf9",
        "primary-light": "#ffffff",

        secondary: "#0d9488",
        "secondary-dark": "#0f766e",

        accent: "#8b5cf6",
        "accent-light": "#f43f5e",

        "glass-bg": "rgba(255, 255, 255, 0.85)",
        "glass-border": "rgba(13, 148, 136, 0.15)",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}