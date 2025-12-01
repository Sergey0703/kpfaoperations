// Warm Modern Style - Elegant, warm, and alive
import * as React from 'react';
import { useDataContext } from '../Context';
import { IBuilding } from '../../models/IBuilding';
import { Formatters } from '../../utils/Formatters';

export const WarmModern: React.FC = () => {
  const { state } = useDataContext();
  const [selectedBuilding, setSelectedBuilding] = React.useState<IBuilding | undefined>();

  React.useEffect(() => {
    if (!selectedBuilding && state.filteredBuildings.length > 0) {
      setSelectedBuilding(state.filteredBuildings[0]);
    }
  }, [state.filteredBuildings, selectedBuilding]);

  // Warm, Natural Color Palette
  const colors = {
    // Warm neutrals
    cream: '#F5F1E8', // Beige background from Heritage
    warmWhite: '#FDFBF7',
    sand: '#E8DCC4',

    // Earthy accents
    terracotta: '#D4735A', // Warm coral/terracotta
    sage: '#8B9D83', // Soft sage green
    clay: '#C17B5A', // Clay brown

    // Blues (less corporate, more natural)
    skyBlue: '#6BA3C8', // Natural sky blue
    deepTeal: '#4A7C8F', // Deep teal

    // Text
    charcoal: '#2D2A26',
    warmGray: '#6B6660',
    lightGray: '#9B9690'
  };

  return (
    <div style={{
      display: 'flex',
      height: '550px',
      background: `
        linear-gradient(135deg, ${colors.cream} 0%, ${colors.sand} 100%),
        radial-gradient(circle at 20% 80%, rgba(212, 115, 90, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(107, 163, 200, 0.08) 0%, transparent 50%)
      `,
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif'
    }}>
      {/* Left Panel - Warm & Textured */}
      <div style={{
        width: '300px',
        background: colors.warmWhite,
        borderRight: `1px solid ${colors.sand}`,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(45, 42, 38, 0.08)'
      }}>
        {/* Header with Character */}
        <div style={{
          padding: '32px 24px',
          background: `linear-gradient(135deg, ${colors.deepTeal} 0%, ${colors.skyBlue} 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Organic shapes in background */}
          <svg style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: '120px',
            height: '120px',
            opacity: 0.15
          }}>
            <circle cx="60" cy="60" r="50" fill="white" />
            <circle cx="80" cy="40" r="30" fill="white" />
          </svg>

          <div style={{
            position: 'relative',
            zIndex: 1,
            color: 'white'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '1.5px',
              opacity: 0.85,
              marginBottom: '12px',
              textTransform: 'uppercase'
            }}>
              Property Portfolio
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>
              Buildings
            </h2>
            <div style={{
              marginTop: '16px',
              height: '3px',
              width: '60px',
              background: colors.terracotta,
              borderRadius: '2px'
            }} />
          </div>
        </div>

        {/* Filters with warmth */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: `1px solid ${colors.sand}`
        }}>
          <input
            type="text"
            placeholder="Search properties..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${colors.sand}`,
              borderRadius: '8px',
              fontSize: '14px',
              background: colors.cream,
              color: colors.charcoal,
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.skyBlue;
              e.currentTarget.style.background = colors.warmWhite;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.sand;
              e.currentTarget.style.background = colors.cream;
            }}
          />
        </div>

        {/* Building List with Texture */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px'
        }}>
          {state.filteredBuildings.map((building, index) => (
            <div
              key={building.Id}
              onClick={() => setSelectedBuilding(building)}
              style={{
                padding: '20px 16px',
                marginBottom: '12px',
                background: selectedBuilding?.Id === building.Id
                  ? `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`
                  : colors.warmWhite,
                border: `2px solid ${selectedBuilding?.Id === building.Id ? colors.terracotta : 'transparent'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: selectedBuilding?.Id === building.Id
                  ? '0 8px 24px rgba(212, 115, 90, 0.15), 0 0 0 1px rgba(212, 115, 90, 0.1)'
                  : '0 2px 8px rgba(45, 42, 38, 0.04)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (selectedBuilding?.Id !== building.Id) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(45, 42, 38, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedBuilding?.Id !== building.Id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.04)';
                }
              }}
            >
              {/* Accent bar for selected */}
              {selectedBuilding?.Id === building.Id && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '60%',
                  background: `linear-gradient(180deg, ${colors.terracotta}, ${colors.clay})`,
                  borderRadius: '0 4px 4px 0'
                }} />
              )}

              {/* Building number badge */}
              <div style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: selectedBuilding?.Id === building.Id
                  ? `${colors.terracotta}15`
                  : `${colors.sage}12`,
                color: selectedBuilding?.Id === building.Id ? colors.terracotta : colors.sage,
                fontSize: '11px',
                fontWeight: '700',
                borderRadius: '6px',
                marginBottom: '12px',
                letterSpacing: '0.5px'
              }}>
                #{String(index + 1).padStart(2, '0')}
              </div>

              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: '700',
                color: selectedBuilding?.Id === building.Id ? colors.deepTeal : colors.charcoal,
                lineHeight: '1.3',
                letterSpacing: '-0.2px'
              }}>
                {building.PropertyName}
              </h3>

              <p style={{
                margin: '0 0 16px 0',
                fontSize: '13px',
                color: colors.warmGray,
                lineHeight: '1.5'
              }}>
                {building.Address}
              </p>

              {/* Info row with icons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                paddingTop: '12px',
                borderTop: `1px solid ${selectedBuilding?.Id === building.Id ? colors.sand : 'transparent'}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: colors.warmGray,
                  fontWeight: '500'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 6h12M6 2v12" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {building.YearBuilt}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: colors.warmGray,
                  fontWeight: '500'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8l6-6 6 6-6 6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  {(building.AreaSquareFootage / 1000).toFixed(1)}K
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Spacious & Elegant */}
      <div style={{
        flex: 1,
        background: colors.warmWhite,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {selectedBuilding ? (
          <>
            {/* Hero Section */}
            <div style={{
              padding: '48px 56px',
              background: `
                linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)
              `,
              borderBottom: `2px solid ${colors.sand}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circles */}
              <div style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: `2px solid ${colors.terracotta}15`,
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${colors.terracotta}08, transparent)`,
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Status pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  background: colors.warmWhite,
                  border: `2px solid ${colors.sage}30`,
                  borderRadius: '24px',
                  marginBottom: '24px',
                  boxShadow: '0 2px 8px rgba(139, 157, 131, 0.1)'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: colors.sage
                  }} />
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: colors.sage,
                    letterSpacing: '0.5px'
                  }}>
                    Active Property
                  </span>
                </div>

                <h1 style={{
                  margin: '0 0 16px 0',
                  fontSize: '42px',
                  fontWeight: '700',
                  color: colors.charcoal,
                  letterSpacing: '-1px',
                  lineHeight: '1.1'
                }}>
                  {selectedBuilding.PropertyName}
                </h1>

                <p style={{
                  margin: 0,
                  fontSize: '17px',
                  color: colors.warmGray,
                  lineHeight: '1.6',
                  maxWidth: '600px'
                }}>
                  {selectedBuilding.Address}
                </p>

                {/* Decorative line */}
                <div style={{
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '4px',
                    background: `linear-gradient(90deg, ${colors.terracotta}, ${colors.clay})`,
                    borderRadius: '2px'
                  }} />
                  <div style={{
                    width: '40px',
                    height: '4px',
                    background: colors.skyBlue,
                    borderRadius: '2px'
                  }} />
                  <div style={{
                    width: '20px',
                    height: '4px',
                    background: colors.sage,
                    borderRadius: '2px'
                  }} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: '40px 56px',
              overflowY: 'auto'
            }}>
              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '40px'
              }}>
                <button style={{
                  padding: '14px 28px',
                  background: `linear-gradient(135deg, ${colors.deepTeal}, ${colors.skyBlue})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(74, 124, 143, 0.25)',
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 124, 143, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(74, 124, 143, 0.25)';
                }}>
                  Edit Property
                </button>
                <button style={{
                  padding: '14px 28px',
                  background: colors.warmWhite,
                  color: colors.terracotta,
                  border: `2px solid ${colors.sand}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.terracotta;
                  e.currentTarget.style.background = `${colors.terracotta}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.sand;
                  e.currentTarget.style.background = colors.warmWhite;
                }}>
                  Delete
                </button>
              </div>

              {/* Information Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {/* Year Built Card */}
                <div style={{
                  padding: '32px',
                  background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
                  border: `2px solid ${colors.sand}`,
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colors.skyBlue}12, transparent)`
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: colors.lightGray,
                      marginBottom: '12px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Year Built
                    </div>
                    <div style={{
                      fontSize: '48px',
                      fontWeight: '800',
                      color: colors.skyBlue,
                      lineHeight: '1',
                      marginBottom: '8px',
                      letterSpacing: '-2px'
                    }}>
                      {selectedBuilding.YearBuilt}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: colors.warmGray,
                      fontWeight: '500'
                    }}>
                      {new Date().getFullYear() - selectedBuilding.YearBuilt} years of history
                    </div>
                  </div>
                </div>

                {/* Area Card */}
                <div style={{
                  padding: '32px',
                  background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
                  border: `2px solid ${colors.sand}`,
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colors.terracotta}12, transparent)`
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: colors.lightGray,
                      marginBottom: '12px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Total Area
                    </div>
                    <div style={{
                      fontSize: '38px',
                      fontWeight: '800',
                      color: colors.terracotta,
                      lineHeight: '1',
                      marginBottom: '8px',
                      letterSpacing: '-1px'
                    }}>
                      {selectedBuilding.AreaSquareFootage.toLocaleString()}
                      <span style={{ fontSize: '20px', color: colors.warmGray, fontWeight: '600' }}> ft²</span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: colors.warmGray,
                      fontWeight: '500'
                    }}>
                      {(selectedBuilding.AreaSquareFootage * 0.092903).toFixed(0)} m² metric
                    </div>
                  </div>
                </div>

                {/* Commissioned Date */}
                {selectedBuilding.CommissioningDate && (
                  <div style={{
                    gridColumn: '1 / -1',
                    padding: '32px',
                    background: `linear-gradient(135deg, ${colors.sage}08, ${colors.sage}15)`,
                    border: `2px solid ${colors.sage}30`,
                    borderRadius: '16px'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: colors.sage,
                      marginBottom: '12px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Commissioned
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: colors.charcoal,
                      letterSpacing: '-0.5px'
                    }}>
                      {Formatters.formatDate(selectedBuilding.CommissioningDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Separator */}
              <div style={{
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${colors.sand}, transparent)`,
                margin: '40px 0'
              }} />

              {/* Additional Info */}
              <div style={{
                padding: '24px',
                background: colors.cream,
                borderRadius: '12px',
                border: `1px solid ${colors.sand}`
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: colors.warmGray,
                  lineHeight: '1.7',
                  fontStyle: 'italic'
                }}>
                  This property represents {new Date().getFullYear() - selectedBuilding.YearBuilt} years
                  of architectural heritage and continues to serve its community with distinction.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
            padding: '40px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.sand}, ${colors.cream})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: `3px solid ${colors.warmWhite}`,
              boxShadow: '0 8px 32px rgba(45, 42, 38, 0.08)'
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="12" width="32" height="28" rx="2" stroke={colors.warmGray} strokeWidth="2"/>
                <path d="M16 20h16M16 28h16M20 36v-8" stroke={colors.warmGray} strokeWidth="2"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: colors.charcoal,
              margin: '0 0 12px 0',
              letterSpacing: '-0.5px'
            }}>
              Select a Property
            </h2>
            <p style={{
              fontSize: '16px',
              color: colors.warmGray,
              margin: 0,
              textAlign: 'center',
              maxWidth: '320px',
              lineHeight: '1.6'
            }}>
              Choose a building from the list to explore its details and history
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
