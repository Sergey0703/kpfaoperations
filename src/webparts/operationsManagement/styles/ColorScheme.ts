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

  // Glassmorphism Button Styles
  getGlassmorphismButtonStyles: (): IButtonStyles => ({
    root: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid transparent',
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)
      `,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      borderRadius: '8px',
      color: '#111827',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.2s ease',
      height: '36px',
      padding: '0 16px'
    },
    rootHovered: {
      background: 'rgba(255, 255, 255, 0.9)',
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)
      `,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      color: '#111827',
      boxShadow: '0 4px 20px rgba(66, 133, 244, 0.2)',
      transform: 'translateY(-1px)'
    },
    rootPressed: {
      background: 'rgba(255, 255, 255, 0.9)',
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
        linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)
      `,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      color: '#111827',
      transform: 'translateY(0)'
    }
  })
};
