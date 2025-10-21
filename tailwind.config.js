/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(2, 0, 14)",
        transWhite:"rgba(255,255,255,0.6)",
        transPrimary:"rgb(2, 0, 14, 0.8)"
      
      },

      fontFamily: {
        space: ["Space Grotesk", "san-serif"],
      },
    },
  },
  plugins: [],
};
