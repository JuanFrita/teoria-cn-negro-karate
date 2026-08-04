/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: 'rgb(var(--gold-rgb) / <alpha-value>)',
          light: 'rgb(var(--gold-light-rgb) / <alpha-value>)',
          dim: 'rgb(var(--gold-dim-rgb) / <alpha-value>)',
          fill: 'rgb(var(--gold-fill-rgb) / <alpha-value>)',
        },
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        'app-text': 'var(--app-text)',
        muted: 'var(--muted)',
        ok: 'var(--ok)',
        'ok-soft': 'var(--ok-soft)',
        err: 'var(--err)',
        'err-soft': 'var(--err-soft)',
      },
      // `border-theme` must be a first-class utility: declaring it in an
      // `@layer utilities` block only resolves in `@apply` when main.css happens
      // to be processed first, which is not guaranteed per-SFC.
      borderColor: {
        theme: 'var(--border-color)',   // separadores decorativos
        strong: 'var(--border-strong)', // contorno de controles, 3:1
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
