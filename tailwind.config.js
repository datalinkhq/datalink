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
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
