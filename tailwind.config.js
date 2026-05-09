/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#F0D080',
          dim: '#7A5F25',
        },
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        'app-text': 'var(--app-text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
