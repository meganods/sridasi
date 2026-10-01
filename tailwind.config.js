/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sridasi: {
          // Primary Brand Shades
          forest: '#0B5D45',
          dark: '#126B4F',
          green: '#4F9D39',
          
          // Supporting Brand Colors
          water: '#3FA9D8',
          yellow: '#F4C63D',
          cream: '#FFF9E8',
          surface: '#F4F7F4',
          
          // Extended Palettes for Design System
          primary: {
            50: '#EDF8F4',
            100: '#D5EFE7',
            200: '#ADDDCF',
            300: '#79C3AE',
            400: '#4CA48C',
            500: '#126B4F', // Dark Green
            600: '#0B5D45', // Forest Green
            700: '#084836',
            800: '#06392B',
            900: '#04281E',
            950: '#021812',
          },
          leaf: {
            50: '#F2F9EE',
            100: '#E1F2D9',
            200: '#C5E6B4',
            300: '#A1D487',
            400: '#79BF59',
            500: '#4F9D39', // Fresh Natural Green
            600: '#3D802B',
            700: '#306424',
            800: '#27501F',
            900: '#22431C',
          },
          aqua: {
            50: '#F0F9FD',
            100: '#DCF1FA',
            200: '#BEE4F6',
            300: '#8FD1F0',
            400: '#58B8E6',
            500: '#3FA9D8', // Water Blue
            600: '#218CBF',
            700: '#1A709B',
            800: '#185D7F',
            900: '#194E69',
          },
          gold: {
            50: '#FEFAF0',
            100: '#FDF3DB',
            200: '#FBE5B4',
            300: '#F8D485',
            400: '#F5C453',
            500: '#F4C63D', // Warm Yellow
            600: '#D4A01D',
            700: '#A77614',
            800: '#875B16',
            900: '#714B17',
          },
          earth: {
            50: '#FAF8F5',
            100: '#F4EFE8',
            200: '#E8DED1',
            300: '#D7C4B0',
            400: '#C2A58B',
            500: '#B28E70',
            600: '#9B7457',
            700: '#7D5C45',
            800: '#674C3B',
            900: '#553F33',
          },
          neutral: {
            50: '#FAFBF9',
            100: '#F4F7F4', // Soft Neutral Gray / Canvas
            200: '#E7ECE7',
            300: '#D4DDD4',
            400: '#A9B7A9',
            500: '#7E8F7E',
            600: '#5D6E5D',
            700: '#465346',
            800: '#343E34',
            900: '#1A211A',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(11, 93, 69, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'soft': '0 8px 24px -4px rgba(11, 93, 69, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 12px 32px -4px rgba(11, 93, 69, 0.10), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 20px 48px -6px rgba(11, 93, 69, 0.12), 0 8px 20px -4px rgba(0, 0, 0, 0.05)',
        'glow-green': '0 0 24px 0 rgba(79, 157, 57, 0.25)',
        'glow-primary': '0 0 28px 0 rgba(11, 93, 69, 0.22)',
        'glow-aqua': '0 0 24px 0 rgba(63, 169, 216, 0.25)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
