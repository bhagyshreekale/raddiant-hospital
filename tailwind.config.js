module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-x': {
          from: { transform: 'scaleX(0)' },
          to:   { transform: 'scaleX(1)' },
        },
        shimmer: {
          '0%, 100%': { transform: 'scale(1)', opacity: '.5' },
          '50%':      { transform: 'scale(1.15)', opacity: '1' },
        },
      },
      animation: {
        'fade-up':  'fade-up .65s ease both',
        'scale-x':  'scale-x .6s .3s ease both',
      },
    },
  },
};