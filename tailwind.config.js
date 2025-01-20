// /** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui";
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [daisyui],
// };

/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D2D2D", // Dark Gray
        secondary: "#FFFFFF", // White
        accent: "#60A5FA", // Light Blue
        accentDark: "#3183e7" /* Darker Blue for Dark Mode */
      },
    },
  },
  plugins: [daisyui],
};
