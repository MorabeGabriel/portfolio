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
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(22px)' }, '100%': { opacity: '1', transform: 'none' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        drift: {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(14px,-10px) rotate(14deg)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp .8s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
        drift: 'drift 9s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
