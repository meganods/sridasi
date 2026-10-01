/**
 * SRIDASI Farms & Organics Design System Tokens
 * Master token specifications for colors, typography, spacing, shadows, and curves.
 */

export const SRIDASI_TOKENS = {
  colors: {
    // Primary Brand Shades
    forest: '#0B5D45',
    dark: '#126B4F',
    green: '#4F9D39',

    // Supporting Brand Shades
    water: '#3FA9D8',
    yellow: '#F4C63D',
    cream: '#FFF9E8',
    surface: '#F4F7F4',
    white: '#FFFFFF',

    // Neutral Scale
    neutral: {
      50: '#FAFBF9',
      100: '#F4F7F4',
      200: '#E7ECE7',
      300: '#D4DDD4',
      400: '#A9B7A9',
      500: '#7E8F7E',
      600: '#5D6E5D',
      700: '#465346',
      800: '#343E34',
      900: '#1A211A',
    },

    // Extended Semantic Palettes
    primary: {
      50: '#EDF8F4',
      100: '#D5EFE7',
      200: '#ADDDCF',
      300: '#79C3AE',
      400: '#4CA48C',
      500: '#126B4F',
      600: '#0B5D45',
      700: '#084836',
      800: '#06392B',
      900: '#04281E',
    },
    leaf: {
      50: '#F2F9EE',
      100: '#E1F2D9',
      200: '#C5E6B4',
      300: '#A1D487',
      400: '#79BF59',
      500: '#4F9D39',
      600: '#3D802B',
      700: '#306424',
    },
    aqua: {
      50: '#F0F9FD',
      100: '#DCF1FA',
      200: '#BEE4F6',
      300: '#8FD1F0',
      400: '#58B8E6',
      500: '#3FA9D8',
      600: '#218CBF',
    },
    gold: {
      50: '#FEFAF0',
      100: '#FDF3DB',
      200: '#FBE5B4',
      300: '#F8D485',
      400: '#F5C453',
      500: '#F4C63D',
      600: '#D4A01D',
    }
  },
  typography: {
    fonts: {
      heading: "'Outfit', 'Plus Jakarta Sans', sans-serif",
      sans: "'Plus Jakarta Sans', sans-serif",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    }
  },
  radii: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    '3xl': '1.75rem',
    full: '9999px',
  },
  shadows: {
    softSm: '0 2px 8px -2px rgba(11, 93, 69, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
    soft: '0 8px 24px -4px rgba(11, 93, 69, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
    softMd: '0 12px 32px -4px rgba(11, 93, 69, 0.10), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
    softLg: '0 20px 48px -6px rgba(11, 93, 69, 0.12), 0 8px 20px -4px rgba(0, 0, 0, 0.05)',
  }
};

export default SRIDASI_TOKENS;
