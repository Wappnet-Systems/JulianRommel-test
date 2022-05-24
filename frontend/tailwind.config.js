module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        'kblue': '#E5EDF6',
        'kgreen': '#E5EDF6',
    }),
    textColor:{
        'offgray': '#676767',
        'jet': '#0A0A0A',
        'white': '#FFFFFF',
        'kblue': '#E5EDF6',
    },
    extend: {
        fontFamily:{
            'sans': ['Nunito']
        },
        spacing:{
            '108': '27rem'
        }
    },
},
  plugins: [],
}