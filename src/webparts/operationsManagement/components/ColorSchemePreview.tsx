// Color Scheme Preview - Demo page to compare 3 design variants

import * as React from 'react';

export const ColorSchemePreview: React.FC = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Color Scheme Variants Comparison</h1>

      {/* VARIANT 1: Modern Dashboard (Green) */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>VARIANT 1: Modern Dashboard (Salad Green)</h2>

        {/* Building Card Example */}
        <div style={{
          display: 'inline-block',
          marginRight: '20px',
          padding: '16px',
          backgroundColor: '#ffffff',
          border: '3px solid transparent',
          background: `
            linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #84CC16, #22C55E, #06B6D4) border-box
          `,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
          minWidth: '250px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>The Gandon Building</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280' }}>15-19 Amiens St, Dublin 1</p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6B7280' }}>
            <span>Built 1878</span>
            <span>45,000 sq ft</span>
          </div>
        </div>

        {/* Button Example */}
        <button style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #84CC16 0%, #22C55E 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)',
          marginRight: '20px'
        }}>
          Add Building
        </button>

        {/* Status Badges */}
        <div style={{ display: 'inline-flex', gap: '12px', verticalAlign: 'top', marginTop: '8px' }}>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Active
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Maintenance
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Overdue
          </span>
        </div>

        {/* Header Example */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'linear-gradient(135deg, #84CC16 0%, #22C55E 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <h2 style={{ margin: '0 0 4px 0' }}>Heuston South Quarter</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>St. John&apos;s Road West, Dublin 8</p>
        </div>
      </div>

      {/* VARIANT 2: Vibrant Neon (Purple-Pink) */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>VARIANT 2: Vibrant Neon (Purple-Pink)</h2>

        {/* Building Card Example */}
        <div style={{
          display: 'inline-block',
          marginRight: '20px',
          padding: '16px',
          backgroundColor: '#ffffff',
          border: '3px solid transparent',
          background: `
            linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #8B5CF6, #EC4899, #F97316) border-box
          `,
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          minWidth: '250px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>The Gandon Building</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280' }}>15-19 Amiens St, Dublin 1</p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6B7280' }}>
            <span>Built 1878</span>
            <span>45,000 sq ft</span>
          </div>
        </div>

        {/* Button Example */}
        <button style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)',
          marginRight: '20px'
        }}>
          Add Building
        </button>

        {/* Status Badges */}
        <div style={{ display: 'inline-flex', gap: '12px', verticalAlign: 'top', marginTop: '8px' }}>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#F0FDF4',
            color: '#14532D',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Active
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FEF9C3',
            color: '#713F12',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Maintenance
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FFE4E6',
            color: '#9F1239',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Overdue
          </span>
        </div>

        {/* Header Example */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
        }}>
          <h2 style={{ margin: '0 0 4px 0' }}>Heuston South Quarter</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>St. John&apos;s Road West, Dublin 8</p>
        </div>
      </div>

      {/* VARIANT 3: Professional Bright (Blue-Indigo) */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>VARIANT 3: Professional Bright (Blue-Indigo)</h2>

        {/* Building Card Example */}
        <div style={{
          display: 'inline-block',
          marginRight: '20px',
          padding: '16px',
          backgroundColor: '#ffffff',
          border: '2px solid transparent',
          background: `
            linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #0EA5E9, #6366F1) border-box
          `,
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.12)',
          minWidth: '250px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>The Gandon Building</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280' }}>15-19 Amiens St, Dublin 1</p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6B7280' }}>
            <span>Built 1878</span>
            <span>45,000 sq ft</span>
          </div>
        </div>

        {/* Button Example */}
        <button style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(14, 165, 233, 0.2)',
          marginRight: '20px'
        }}>
          Add Building
        </button>

        {/* Status Badges */}
        <div style={{ display: 'inline-flex', gap: '12px', verticalAlign: 'top', marginTop: '8px' }}>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Active
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Maintenance
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Overdue
          </span>
        </div>

        {/* Header Example */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <h2 style={{ margin: '0 0 4px 0' }}>Heuston South Quarter</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>St. John&apos;s Road West, Dublin 8</p>
        </div>
      </div>

      {/* VARIANT 4: Warm Cappuccino (Coffee-Milk-Carrot) */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>VARIANT 4: Warm Cappuccino (Coffee-Milk-Carrot)</h2>

        {/* Building Card Example */}
        <div style={{
          display: 'inline-block',
          marginRight: '20px',
          padding: '16px',
          backgroundColor: '#ffffff',
          border: '3px solid transparent',
          background: `
            linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #C8A882, #E9B872, #FF9A56) border-box
          `,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(200, 168, 130, 0.2)',
          minWidth: '250px'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>The Gandon Building</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280' }}>15-19 Amiens St, Dublin 1</p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6B7280' }}>
            <span>Built 1878</span>
            <span>45,000 sq ft</span>
          </div>
        </div>

        {/* Button Example */}
        <button style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #C8A882 0%, #E9B872 50%, #FF9A56 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(200, 168, 130, 0.3)',
          marginRight: '20px'
        }}>
          Add Building
        </button>

        {/* Status Badges */}
        <div style={{ display: 'inline-flex', gap: '12px', verticalAlign: 'top', marginTop: '8px' }}>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FFF4E6',
            color: '#E67E22',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Active
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FFF9E6',
            color: '#F39C12',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Maintenance
          </span>
          <span style={{
            padding: '6px 12px',
            backgroundColor: '#FFEBEE',
            color: '#C62828',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Overdue
          </span>
        </div>

        {/* Header Example */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'linear-gradient(135deg, #C8A882 0%, #E9B872 50%, #FF9A56 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <h2 style={{ margin: '0 0 4px 0' }}>Heuston South Quarter</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>St. John&apos;s Road West, Dublin 8</p>
        </div>
      </div>

      {/* GLASSMORPHISM BUTTON VARIANTS - Google Rainbow */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>BUTTON VARIANTS: Glassmorphism + Google Rainbow</h2>
        <p style={{ marginBottom: '20px', color: '#6B7280', fontSize: '14px' }}>
          Варианты кнопок с эффектом матового стекла (glassmorphism) - менее яркие, но элегантные
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Variant 1: Frosted Glass with Rainbow Border */}
          <div style={{ flex: '1 1 200px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>1. Glass + Rainbow Border</p>
            <button style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#111827',
              border: '2px solid transparent',
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
                linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)
              `,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
              Add Building
            </button>
          </div>

          {/* Variant 2: Frosted Glass with Google Blue Tint */}
          <div style={{ flex: '1 1 200px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>2. Glass + Blue Tint</p>
            <button style={{
              padding: '12px 24px',
              background: 'rgba(66, 133, 244, 0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#4285F4',
              border: '1px solid rgba(66, 133, 244, 0.3)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(66, 133, 244, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
              Add Building
            </button>
          </div>

          {/* Variant 3: Glass with Rainbow Shadow */}
          <div style={{ flex: '1 1 200px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>3. Glass + Rainbow Shadow</p>
            <button style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(234, 67, 53, 0.15), 0 4px 20px rgba(251, 188, 4, 0.15), 0 4px 20px rgba(52, 168, 83, 0.15), 0 4px 20px rgba(66, 133, 244, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
              Add Building
            </button>
          </div>

          {/* Variant 4: Minimal Glass with Rainbow Underline */}
          <div style={{ flex: '1 1 200px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>4. Glass + Rainbow Underline</p>
            <button style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#111827',
              border: 'none',
              borderBottom: '3px solid transparent',
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
                linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)
              `,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              borderRadius: '8px 8px 0 0',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
              Add Building
            </button>
          </div>

          {/* Variant 5: Gradient Glass (Blue-Purple) */}
          <div style={{ flex: '1 1 200px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>5. Glass + Gradient Tint</p>
            <button style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.2), rgba(139, 92, 246, 0.2))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#4285F4',
              border: '1px solid rgba(66, 133, 244, 0.4)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(66, 133, 244, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
              Add Building
            </button>
          </div>

          {/* Variant 6: White Glass with Subtle Rainbow Border */}
          <div style={{ flex: '1 1 200px' }}>
            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>6. White Glass + Thin Rainbow</p>
            <button style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#111827',
              border: '1px solid transparent',
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                linear-gradient(90deg, #EA4335, #FBBC04, #34A853, #4285F4, #8B5CF6)
              `,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
              Add Building
            </button>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#FEF3C7',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#92400E' }}>
          Выбери вариант и скажи номер (1, 2, 3, 4, 5 или 6 для кнопки)
        </p>
      </div>
    </div>
  );
};
