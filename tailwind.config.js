module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './pages/**/*.{js,jsx,ts,tsx,}',
    './components/**/*.{js,jsx,ts,tsx,}',
  ],
  theme: {
    extend: {
      colors: {
        darkTeal: '#b6cac9',
      },
      fontSize: {
        tiny: ['.50rem', '.75rem'],
      },
      borderRadius: {
        'sm+': '.32rem',
      },
      fontFamily: {
        shadowsIntoLight: ['Shadows Into Light Two'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
