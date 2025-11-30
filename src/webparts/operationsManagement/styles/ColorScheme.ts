// Color Scheme - Google Rainbow

import { IButtonStyles } from '@fluentui/react';

export const ColorScheme = {
  // Primary Gradients - Google Rainbow
  primaryGradient: 'linear-gradient(90deg, #EA4335 0%, #FBBC04 25%, #34A853 50%, #4285F4 75%, #8B5CF6 100%)', // red → yellow → green → blue → purple
  primaryGradientBorder: 'linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)', // rainbow border
  secondaryGradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)', // blue → green
  accentColor: '#4285F4', // Google blue

  // Shadow with multicolor glow
  cardShadow: '0 4px 20px rgba(66, 133, 244, 0.3)',
  cardShadowHover: '0 6px 25px rgba(66, 133, 244, 0.4)',
  buttonShadow: '0 4px 15px rgba(66, 133, 244, 0.3)',
  headerShadow: '0 4px 20px rgba(66, 133, 244, 0.25)',

  // Status Badge Colors
  badges: {
    active: {
      bg: '#F0FDF4',
      color: '#14532D',
      accent: '#84CC16' // lime green
    },
    maintenance: {
      bg: '#FEF9C3',
      color: '#713F12',
      accent: '#FBBF24' // bright amber
    },
    overdue: {
      bg: '#FFE4E6',
      color: '#9F1239',
      accent: '#F43F5E' // rose
    }
  },

  // Border
  borderRadius: '12px',
  borderWidth: '3px',

  // Primary Blue Button Styles (Solid Blue - for Add Building)
  getPrimaryButtonStyles: (): IButtonStyles => ({
    root: {
      background: '#4285F4',
      border: 'none',
      borderRadius: '6px',
      color: '#ffffff',
      boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
      transition: 'all 0.2s ease',
      height: '36px',
      padding: '0 20px',
      fontWeight: '600'
    },
    rootHovered: {
      background: '#3367D6',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(66, 133, 244, 0.4)',
      transform: 'translateY(-1px)'
    },
    rootPressed: {
      background: '#2C5BB3',
      color: '#ffffff',
      transform: 'translateY(0)'
    }
  }),

  // Outlined Blue Button Styles (White background, Blue text - for Edit Building)
  getOutlinedButtonStyles: (): IButtonStyles => ({
    root: {
      background: '#ffffff',
      border: '1px solid #4285F4',
      borderRadius: '6px',
      color: '#4285F4',
      boxShadow: 'none',
      transition: 'all 0.2s ease',
      height: '36px',
      padding: '0 20px',
      fontWeight: '600'
    },
    rootHovered: {
      background: '#F0F7FF',
      border: '1px solid #3367D6',
      color: '#3367D6',
      transform: 'translateY(-1px)'
    },
    rootPressed: {
      background: '#E3F0FF',
      border: '1px solid #2C5BB3',
      color: '#2C5BB3',
      transform: 'translateY(0)'
    }
  })
};
