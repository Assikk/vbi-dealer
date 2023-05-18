/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-yellow': '#f7d145',
        'dim-yellow': '#fadd70',
        'gray': '#e5e5e5',
        'light-gray': '#e9ecef',
        'light-blue': '#17a2b8',
        'vbi-red': '#dc3545',
        'dark-red': '#c82333',
        'Vblack': '#1A202C',
        'Vgray': '#718096',
        'red': '#FF0000',
        'primary': '#F7BE00',
      },
      fontSize: {
        '2xl-1': ['28px', '33.6px'],
        '3xl-1': ['32px', '44.8px'],
        '3xl-2': ['32px', '40px'],
        '4xl-1': ['40px', '44px']
      }, 
    },
  },
  plugins: [],
}
