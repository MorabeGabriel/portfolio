/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'] },
      colors: {
        page: 'var(--bg)', ink: 'var(--text)', strong: 'var(--strong)',
        accent: 'var(--accent)', line: 'var(--line)', card: 'var(--card)',
      },
    },
  },
  plugins: [],
}
