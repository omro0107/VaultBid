/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.js",
    "./auth/**/*.html",
    "./auctions/**/*.html",
    "./about/**/*.html",
    "./contact/**/*.html",
    "./legal/**/*.html",
    "./profile/**/*.html",
  ],
  theme: {
    fontSize: {
        xs: "0.7rem",
        sm: "0.9rem",
        lg: "1.3rem",
        xl: "1.5rem",
      },
    extend: {
      fontFamily: {
	        heading: ["Playfair display", "serif"],
	        body: ["Playfair display", "serif"],
	      },
      colors: {
	        brand: {
	          light: "#FFFFFF",
	          DEFAULT: "#B7ADA7",
	          dark: "#1F1C1A",
	        },
	        accent: {
	          DEFAULT: "#544B45",
	        },
	      },
    },
  },
  plugins: [],
};

