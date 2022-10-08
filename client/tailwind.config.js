/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/*.js", "./src/components/*.js"],
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
