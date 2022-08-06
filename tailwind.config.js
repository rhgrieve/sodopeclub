module.exports = {
  content: [
    "src/**/*.{html,liquid}",
    "_site/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
