/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gain-green": "#080",
        "loser-red": "#a00",
      },
    },
  },
  plugins: [],
};
