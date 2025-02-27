/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FCE100', // Montamo primary color (yellow)
        secondary: '#012B3F', // Montamo secondary color (dark blue)
        success: '#4CAF50', // Green for available weeks
        warning: '#FFC107', // Yellow for partially available weeks
        danger: '#F44336', // Red for unavailable weeks
        disabled: '#9E9E9E', // Gray for disabled weeks
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
} 