/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F4EB',
        card: '#FFFFFF',
        charcoal: '#1E1E1E',
        terracotta: '#E04F3E',
        teal: '#2A9D8F',
        mustard: '#E9C46A',
        navy: '#264653',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'brutal': '2px 2px 0px #1E1E1E',
        'brutal-lg': '4px 4px 0px #1E1E1E',
      }
    },
  },
  plugins: [],
}
