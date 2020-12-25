module.exports = {
    purge: false,
    theme: {
      extend: {
        colors: {
          primaryLight: '#F4B500',
          secondaryLight: '#FBFBFC', // an example of extending tailwind
          tertiaryLight: '#F3F3F4',
          '4thColorLight': '#32333C',
          '5thColorLight': '#666684',
          '6thColorLight': '#929497',
          '7thColorLight': '#FFFFFF',
  
          primaryDark: '#F4B500',
          secondaryDark: '#303131', // an example of extending tailwind
          tertiaryDark: '#2B2C2C',
          '4thColorDark': '#FFFFFF',
          '5thColorDark': '#CCCCCC',
          '6thColorDark': '#363737',
          '7thColorDark': '#727B86',
        },
        borderRadius: {
          20: '20px',
        },
        boxShadow: {
          '3xl': '28px 2px 18px 10px #101010',
        },
        fontSize: {
          '15r': '15rem',
          '10r': '10rem',
        },
        spacing: {
          0.08: '0.08rem',
          '-20r': '-20rem',
          '-10': '-10rem',
          0.2: '0.1rem',
        },
        height: {
          120: '120vh',
          '1/2': '50%',
          41.75: '41.75rem',
          fitContent: 'fit-content',
        },
        width: {
          '300p': '300px',
          '40%': '40%',
          '60r': '60rem',
        },
        minHeight: {
          10: '2.5rem',
          16: '4rem',
          full: '100%',
        },
        maxHeight: {
          70: '17rem',
        },
        minWidth: {
          20: '7rem',
          full: '100%',
        },
        maxWidth: {
          70: '27rem',
          full: '100%',
        },
        inset: {
          '10%': '10%',
          '60vh': '60vh',
          5: '5rem',
          3: '3rem',
        },
        screens: {
          x910: { max: '910px' },
          '878px': { min: '878px' },
        },
        skew: {
          '-20': '-20deg',
        },
      },
    },
  
    variants: {
      scale: ['hover'],
      backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
  
    plugins: [
      function ({ addComponents }) {
        const buttons = {
          '.main-gradient': {
            background: 'linear-gradient(270deg, #ffb421 11.7%, #ff7521 90.81%)',
          },
        };
  
        addComponents(buttons);
      },
    ],
  };
  