/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ds: {
          primary: '#0066CC',
          'primary-dark': '#0052A3',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          blue: '#0066CC',
          'blue-dark': '#0052A3',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          text: '#1E293B',
          'text-secondary': '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
