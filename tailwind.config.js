module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      borderColor: ["active"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
