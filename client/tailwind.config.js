/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.15rem",
      "2xl": "1.30rem",
      "3xl": "1.55rem",
      "4xl": "1.9rem",
      "5xl": "2.3rem",
    },
    extend: {
      colors: {
        "gain-green": "#080",
        "loser-red": "#a00",
      },
    },
  },
  plugins: [],
};
