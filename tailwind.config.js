/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "5vw": "5vw",
      },
      colors: {
        secondary: "#87CEEB",
        background: "#6acfeb",
      },
    },
  },
  plugins: [],
};
