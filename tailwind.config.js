/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        card: 'var(--card)',
        border: 'var(--border)',
      },
      boxShadow: {
        brand: 'var(--shadow)',
      },
    },
  },
  plugins: [],
}

