/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#05893e",
          strong: "#047f39",
          content: "#f3fbf4",
          border: "#037333",
          light: "#eaf6ec",
        },
        base: {
          100: "#fafcfa",
          200: "#f0f5f0",
          300: "#e1e8e1",
          content: "#1d271f",
          muted: "#526054",
        },
        bazarSuccess: "#1a9951",
        bazarError: "#d03739",
      },
      fontFamily: {
        bengali: ["'Hind Siliguri'", "sans-serif"],
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        "ticker-fast": "ticker 25s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
