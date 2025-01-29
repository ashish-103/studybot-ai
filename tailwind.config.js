/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#003060",
        "primary-orange": "#F9943B",
      },
      padding: {
        web: "40px",
      },
      margin: {
        web: "40px",
      },
      boxShadow: {
        counter: "0 8px 30px rgb(0,0,0,0.12)",
        courses:
          "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08);",
      },
    },
  },
  plugins: [],
};
