module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1140px",
        "2xl": "1440px",
        "3xl": { raw: "(min-width: 1680px)" },
      },
      dropShadow: {
        social: "0px 5px 30px 0px rgba(61, 141, 255, 1)",
      },
      boxShadow: {
        "card-usefull": "0px 46px 56px -48px rgba(15, 15, 15, 0.1)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#1D1A49",
        primary_hovered: "#312E6B",
        border_primary: "#3C3971",
        secondary: "#3A2F7D",
        text_secondary: "#A2A0B3",
        gold_gradient:
          "background: linear-gradient(67.87deg, #F4D974 3.68%, #B88114 49.93%, #EFD26C 82.76%, rgba(255, 153, 42, 0) 118.99%),linear-gradient(0deg, #FFFFFF, #FFFFFF);",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
