const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{js, ts, vue}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}',
    './content/**/*.{md,yml,json,yaml,toml,csv}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      animation: {
        'text-pop-up-top':
          'text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both'
      },
      keyframes: {
        'text-pop-up-top': {
          '0%': {
            transform: 'translateY(0)',
            'transform-origin': '50% 50%',
            'text-shadow': 'none'
          },
          to: {
            transform: 'translateY(-50px)',
            'transform-origin': '50% 50%',
            'text-shadow':
              '0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc, 0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc, 0 50px 30px rgba(0, 0, 0, .3)'
          }
        }
      },
      colors: {
        primary: {
          DEFAULT: colors.violet[700],
          ...colors.violet
        },
        fontFamily: {
          sans: ['Inter']
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
