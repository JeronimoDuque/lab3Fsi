/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crm: {
          bone: "#fbfbfa",
          surface: "#faf9f5",
          border: "#ecebe6",
          coral: "#ea580c",
          coralLight: "#ffedd5",
          coralDark: "#c2410c",
          emerald: "#10b981",
          emeraldLight: "#f0fdf4",
          emeraldBorder: "#bbf7d0",
          indigo: "#6366f1"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
