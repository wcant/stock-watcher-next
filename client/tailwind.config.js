/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
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
});
