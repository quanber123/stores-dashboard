/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      darkBlue: 'var(--dark-blue)',
      darkGreen: 'var(--dark-green)',
      white: 'var(--white)',
      orange: 'var(--orange)',
      blue: 'var(--blue)',
      mdBlue: 'var(--md-blue)',
      green: 'var(--green)',
      lightGreen: 'var(--light-green)',
      darkRed: 'var(--dark-red)',
      red: 'var(--red)',
      yellow: 'var(--yellow)',
      gray: 'var(--gray)',
      lightGray: 'var(--light-gray)',
      darkGray: 'var(--dark-gray)',
      cyan: 'var(--cyan)',
      opacityGray: 'var(--opacity-gray)',
    },
  },
  plugins: [],
};
