/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, html}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "body-background": "url('/src/assets/body-background.jpg')",
        "body-background-dark": "url('/src/assets/body-background-dark.jpg')"
      },
      colors: {
        primary: {
          light: '#7e22ce',
          dark: '#581c87'
        },
        background: {
          light: '#f5f3ff',
          dark: '#1e1b4b'
        },
        text: {
          light: '#1e1b4b',
          dark: '#e9d5ff'
        },
      }
    },
  },
  plugins: [],
}