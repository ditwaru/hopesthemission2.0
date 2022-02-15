module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './pages/**/*.{js,jsx,ts,tsx,}',
    './components/**/*.{js,jsx,ts,tsx,}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '387px',
        '555px': '555px',
      },
      colors: {
        darkTeal: '#b6cac9',
        tomato: 'rgb(237,85,60)',
      },
      fontSize: {
        tiny: ['.50rem', '.75rem'],
      },
      borderRadius: {
        'sm+': '.32rem',
      },
      fontFamily: {
        rockSalt: ['Rock Salt', 'cursive'],
        nanumGothic: ['Nanum Gothic Coding', 'monospace'],
        nanumPen: ['Nanum Pen Script', 'cursive'],
      },
      animation: {
        slideLeft: '1s ease-out 0s 1 slideInFromLeft',
        slideRight: '1s ease-out 0s 1 slideInFromRight',
        fadeIn: '2s ease-out 0s 1 fade',
      },
      keyframes: {
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0%)', opacity: 1 },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0%)', opacity: 1 },
        },
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
