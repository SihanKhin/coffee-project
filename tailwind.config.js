/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Custom Font"', "sans-serif"],
        Roboto: ["Roboto", "sans-serif"]
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
}

