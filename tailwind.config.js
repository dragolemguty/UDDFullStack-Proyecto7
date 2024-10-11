/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#a0e1eb',
        // Otros colores personalizados
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        // Otras fuentes
      },
    },
  },
  plugins: [],
};
