/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "blognav": "#313131"
      },
      fontFamily: {
        'poppins': ['poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

