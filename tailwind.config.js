/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b4ecc',
        'primary-hover': '#123c98',
        'off-white': '#fbf9f9',
      },
      fontFamily: {
        sans: ['var(--font-cirka-regular)', 'Josefin Sans', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
