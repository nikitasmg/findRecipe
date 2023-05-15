module.exports = {
  "postcss-import": {},
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#118782",
          5: "rgba(17,135,130,0.05)",
          10: "rgba(17,135,130,0.1)",
          30: "rgba(17,135,130,0.3)",
          dark: "#0d6965",
          light: "#E5EBE7"
        },
        secondary: "#08205C",
        mainBg: "#ffffff",
        secondaryBg: "#F8FAFC",
        mainText: "#1C1C1C",
        secondaryText: "#828282",
        blueText: "#2F80ED",
        mainError: "#D23C3C",
        grayLight: "#BDBDBD"
      }
    }
  },
  plugins: []
};
