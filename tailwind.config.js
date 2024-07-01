export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      '2xs': '360px',
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    colors: {
      primary: '#EEEDEB',
      secondary: '#E6B9A6',
      tertiary: '#939185',
      fourth: '#2F3645',
      submit: '#228B22',
      cancel: '#DC143C'
    }
  },
  plugins: []
}
