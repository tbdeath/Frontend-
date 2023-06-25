import { type Config } from "tailwindcss";

// export default {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// } satisfies Config;


module.exports = {
  //...
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          ".btn-twitter": {
            "background-color": "#1EA1F1",
            "border-color": "#1EA1F1",
          },
          ".btn-twitter:hover": {
            "background-color": "#1C96E1",
            "border-color": "#1C96E1",
          },
        },
      },
    ],
  },
};