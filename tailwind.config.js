const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [require("flowbite/plugin")],

  theme: {
    extend: {
      colors: {
        primary: {
          100: "#545FFF",
          200: "#F6F7FF",
        },
        dark: {
          100: "#797979",
          200: "#424242",
          300: "#E1E1E1",
        },
        light: {
          100: "#F8F8F8",
          200: "#B4B4B4",
          300: "#F0F0F0",
          400: "#C5C5C5",
        },
        danger: {
          100: "#ED5145",
        },
      },
      fontFamily: {
        fractul: "Fractul",
      },
      container: {
        center: true,
        padding: "1rem",
        margin: "auto",
        screens: {
          sm: "600px",
          md: "600px",
          lg: "600px",
          xl: "600px",
          "2xl": "600px",
        },
      },
    },
  },
};

module.exports = config;
