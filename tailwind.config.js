module.exports = {
  "postcss-import": {},
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(17, 135, 130, 0.85)",
        primaryActive: "#118782",
        secondary: "#08205C",
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
