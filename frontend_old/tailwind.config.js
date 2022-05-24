module.exports = {
    purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
    darkMode: false, // or 'media' or 'class'
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
    variants: {
        extend: {
            opacity: ['disabled'],
            cursor: ['disabled'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
