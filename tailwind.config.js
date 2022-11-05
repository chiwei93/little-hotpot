/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontWeight: {
      thin: 200,
      extralight: 300,
      light: 400,
      normal: 500,
      medium: 600,
      semibold: 700,
      bold: 800,
      extrabold: 900,
      black: 1000,
    },
    colors: {
      primary: "#49111C",
      white: "#ffffff",
      black: {
        100: "#0A0908",
        200: "#2E4651",
        900: "#000000",
      },
      gray: {
        100: "#E6E6E6",
        900: "#808080",
      },
      background: {
        100: "#F2F1F8",
        200: "#DFDDEE",
        300: "#EAEAFB",
        900: "#FAFAFE",
      },
      green: "#01B047",
      red: "#FF1C1C",
      transparent: "transparent"
    },
    fontSize: {
      xxs: "0.58rem",
      xs: "0.69rem",
      sm: "0.83rem",
      base: "1rem",
      lg: "1.2rem",
      xl: "1.44rem",
      "2xl": "1.73rem",
      "3xl": "2.07rem",
      "4xl": "2.49rem"
    },
    screens: {
      mediumMobile: "360px",
      largeMobile: "400px",
      tablet: "744px",
      desktop: "1200px",
      largeDesktop: "1440px"
    },
  },
  plugins: [],
}
