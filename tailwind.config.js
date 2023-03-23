module.exports = {
  "postcss-import": {},
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#02B381",
        primaryActive: "#008E66",
        secondary: "#9c27b0",
        mainBg: "white",
        secondaryBg: "rgb(241 245 249)",
        mainText: "black",
        secondaryText: "rgb(75 85 99)",
        mainError: "rgb(239 68 68)"
      }
    }
  },
  plugins: []
};
