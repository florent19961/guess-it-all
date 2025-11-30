/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#f19b9b',
          'pink-dark': '#e88b8b',
        },
        secondary: {
          cyan: '#7dd3c0',
          'cyan-dark': '#6ecbb8',
        },
        background: {
          main: '#1e293b',
          card: 'rgba(30, 41, 59, 0.6)',
        },
        team: {
          1: '#f19b9b',
          2: '#7dd3c0',
          3: '#a78bfa',
          4: '#fbbf24',
        }
      },
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
