/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sanspro: ["'Source Sans Pro'", "sans-serif"],
        karla: ["Karla", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        romono: ["Roboto Mono", "monospace"],
      },
      colors: {
        primary: "#0E0E0E",
        secondary: "#1C1C1C",
        "primary-white": "#ECEEEC",
        "secondary-white": "#D3D3D3",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "15%": { transform: "rotate(14.0deg)" },
          "30%": { transform: "rotate(-8.0deg)" },
          "40%": { transform: "rotate(14.0deg)" },
          "50%": { transform: "rotate(-4.0deg)" },
          "60%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        wave: "wave 3.5s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
