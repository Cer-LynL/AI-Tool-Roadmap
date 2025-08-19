/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: {
          850: '#0F3E42',
          500: '#279FAA',
        }
      },
    },
  },
  plugins: [],
};
