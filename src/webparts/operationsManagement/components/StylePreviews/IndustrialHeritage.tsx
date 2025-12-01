// Industrial Heritage Style - Universal for Buildings & Vehicles
import * as React from 'react';
import { useDataContext } from '../Context';
import { IBuilding } from '../../models/IBuilding';
import { Formatters } from '../../utils/Formatters';

export const IndustrialHeritage: React.FC = () => {
  const { state } = useDataContext();
  const [selectedBuilding, setSelectedBuilding] = React.useState<IBuilding | undefined>();
  const [assetType] = React.useState<'buildings' | 'vehicles'>('buildings'); // Toggle between assets

  React.useEffect(() => {
    if (!selectedBuilding && state.filteredBuildings.length > 0) {
      setSelectedBuilding(state.filteredBuildings[0]);
    }
  }, [state.filteredBuildings, selectedBuilding]);

  // Universal colors for both buildings and vehicles
  const colors = {
    primary: '#2C1810', // Dark Brown - leather/wood
    secondary: '#8B4513', // Saddle Brown
    accent: '#B87333', // Copper/Bronze - для металла
    gold: '#D4AF37', // Gold - для premium элементов
    cream: '#F5F1E8', // Cream - фон
    darkGreen: '#1E4620', // Irish Green - для зданий
    engineRed: '#8B0000', // Dark Red - для автомобилей
    steel: '#708090' // Slate Gray - для металлических деталей
  };

  return (
    <div style={{
      display: 'flex',
      height: '550px',
      background: `
        linear-gradient(180deg, ${colors.cream} 0%, #EDE8DC 100%),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 40px,
          rgba(44, 24, 16, 0.02) 40px,
          rgba(44, 24, 16, 0.02) 41px
        )
      `,
      fontFamily: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative'
    }}>
      {/* Riveted Border Top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: colors.accent,
            border: '1px solid #4A3020',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
          }} />
        ))}
      </div>

      {/* Left Panel - Asset Registry */}
      <div style={{
        width: '300px',
        marginTop: '8px',
        borderRight: `3px solid ${colors.accent}`,
        background: `linear-gradient(180deg, ${colors.cream} 0%, #E8DCC4 100%)`,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 16px rgba(44, 24, 16, 0.15)',
        position: 'relative'
      }}>
        {/* Metal Corner Plates */}
        <div style={{
          position: 'absolute',
          top: 8,
          left: 8,
          width: '32px',
          height: '32px',
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.steel})`,
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          opacity: 0.6
        }} />
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: '32px',
          height: '32px',
          background: `linear-gradient(135deg, ${colors.steel}, ${colors.accent})`,
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          opacity: 0.6
        }} />

        {/* Nameplate Header */}
        <div style={{
          padding: '32px 24px',
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: colors.gold,
          position: 'relative',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          {/* Decorative Rivets */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: 12,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: colors.accent,
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
          }} />
          <div style={{
            position: 'absolute',
            top: 8,
            right: 12,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: colors.accent,
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
          }} />

          <div style={{
            textAlign: 'center',
            border: `2px solid ${colors.gold}`,
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: '400',
              fontFamily: '"Playfair Display", Georgia, serif',
              letterSpacing: '0.1em',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {assetType === 'buildings' ? 'PROPERTIES' : 'MOTOR FLEET'}
            </h2>
            <div style={{
              marginTop: '8px',
              fontSize: '10px',
              letterSpacing: '0.3em',
              fontWeight: '600',
              opacity: 0.9
            }}>
              REGISTRY · {assetType === 'buildings' ? 'EST. 1878' : 'EST. 1920'}
            </div>
          </div>
        </div>

        {/* Asset Type Toggle */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(139, 69, 19, 0.1)',
          borderBottom: `2px solid ${colors.accent}`,
          display: 'flex',
          gap: '8px'
        }}>
          <div style={{
            flex: 1,
            padding: '8px',
            textAlign: 'center',
            background: assetType === 'buildings'
              ? `linear-gradient(135deg, ${colors.darkGreen}, #2D6B32)`
              : 'transparent',
            color: assetType === 'buildings' ? colors.cream : colors.primary,
            border: `2px solid ${assetType === 'buildings' ? colors.gold : colors.steel}`,
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: assetType === 'buildings' ? 'inset 0 2px 8px rgba(0, 0, 0, 0.3)' : 'none'
          }}>
            🏛️ BUILDINGS
          </div>
          <div style={{
            flex: 1,
            padding: '8px',
            textAlign: 'center',
            background: assetType === 'vehicles'
              ? `linear-gradient(135deg, ${colors.engineRed}, #B22222)`
              : 'transparent',
            color: assetType === 'vehicles' ? colors.cream : colors.primary,
            border: `2px solid ${assetType === 'vehicles' ? colors.gold : colors.steel}`,
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: assetType === 'vehicles' ? 'inset 0 2px 8px rgba(0, 0, 0, 0.3)' : 'none'
          }}>
            🚗 VEHICLES
          </div>
        </div>

        {/* Item List with Leather Texture */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          background: `
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>')
          `
        }}>
          {state.filteredBuildings.map((building, index) => (
            <div
              key={building.Id}
              onClick={() => setSelectedBuilding(building)}
              style={{
                padding: '20px',
                marginBottom: '16px',
                background: selectedBuilding?.Id === building.Id
                  ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                  : '#ffffff',
                border: selectedBuilding?.Id === building.Id
                  ? `3px solid ${colors.gold}`
                  : `2px solid ${colors.steel}`,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: selectedBuilding?.Id === building.Id
                  ? `0 8px 24px rgba(184, 115, 51, 0.4), inset 0 2px 8px rgba(0, 0, 0, 0.3)`
                  : '0 2px 8px rgba(44, 24, 16, 0.1)'
              }}
            >
              {/* Metal Corner Brackets for Selected */}
              {selectedBuilding?.Id === building.Id && (
                <>
                  {/* Rivets on corners */}
                  {[
                    { top: -6, left: -6 },
                    { top: -6, right: -6 },
                    { bottom: -6, left: -6 },
                    { bottom: -6, right: -6 }
                  ].map((pos, i) => (
                    <div key={i} style={{
                      position: 'absolute',
                      ...pos,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${colors.accent}, ${colors.steel})`,
                      border: `2px solid ${colors.gold}`,
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)'
                    }} />
                  ))}
                </>
              )}

              {/* Asset Number Plate */}
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.steel})`,
                color: colors.primary,
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                marginBottom: '12px',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                {assetType === 'buildings' ? 'PROP' : 'VEH'}-{String(index + 1).padStart(3, '0')}
              </div>

              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: selectedBuilding?.Id === building.Id ? colors.gold : colors.primary
              }}>
                {building.PropertyName}
              </h3>

              <p style={{
                margin: '0 0 16px 0',
                fontSize: '13px',
                color: selectedBuilding?.Id === building.Id ? colors.cream : '#5C4A2F',
                lineHeight: '1.6'
              }}>
                {building.Address}
              </p>

              {/* Gauge-style Divider */}
              <div style={{
                height: '2px',
                background: selectedBuilding?.Id === building.Id
                  ? `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`
                  : `linear-gradient(90deg, transparent, ${colors.steel}, transparent)`,
                margin: '12px 0',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
              }} />

              {/* Technical Details with Brass Plates */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div style={{
                  padding: '8px',
                  background: selectedBuilding?.Id === building.Id
                    ? 'rgba(212, 175, 55, 0.1)'
                    : 'rgba(139, 69, 19, 0.05)',
                  border: `1px solid ${selectedBuilding?.Id === building.Id ? colors.gold : colors.steel}`,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: selectedBuilding?.Id === building.Id ? colors.gold : colors.steel,
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.1em'
                  }}>
                    {assetType === 'buildings' ? 'BUILT' : 'YEAR'}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: selectedBuilding?.Id === building.Id ? colors.gold : colors.primary
                  }}>
                    {building.YearBuilt}
                  </div>
                </div>

                <div style={{
                  padding: '8px',
                  background: selectedBuilding?.Id === building.Id
                    ? 'rgba(212, 175, 55, 0.1)'
                    : 'rgba(139, 69, 19, 0.05)',
                  border: `1px solid ${selectedBuilding?.Id === building.Id ? colors.gold : colors.steel}`,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: selectedBuilding?.Id === building.Id ? colors.gold : colors.steel,
                    marginBottom: '4px',
                    fontWeight: '700',
                    letterSpacing: '0.1em'
                  }}>
                    {assetType === 'buildings' ? 'AREA' : 'ENGINE'}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: selectedBuilding?.Id === building.Id ? colors.gold : colors.primary
                  }}>
                    {(building.AreaSquareFootage / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Metal Plate */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          width: '32px',
          height: '32px',
          background: `linear-gradient(135deg, ${colors.steel}, ${colors.accent})`,
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
          opacity: 0.6
        }} />
        <div style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          width: '32px',
          height: '32px',
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.steel})`,
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
          opacity: 0.6
        }} />
      </div>

      {/* Right Details Panel */}
      <div style={{
        flex: 1,
        marginTop: '8px',
        background: colors.cream,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {selectedBuilding ? (
          <>
            {/* Brass Nameplate Header */}
            <div style={{
              padding: '48px 48px 40px',
              background: `
                linear-gradient(135deg, ${colors.accent} 0%, ${colors.gold} 50%, ${colors.accent} 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="200" height="200" filter="url(%23noise)" opacity="0.1"/></svg>')
              `,
              position: 'relative',
              boxShadow: '0 4px 16px rgba(44, 24, 16, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2)',
              borderBottom: `4px solid ${colors.primary}`
            }}>
              {/* Engraved Border */}
              <div style={{
                position: 'absolute',
                inset: '16px',
                border: `2px solid ${colors.primary}`,
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.3)',
                pointerEvents: 'none'
              }} />

              {/* Classification Badge */}
              <div style={{
                display: 'inline-block',
                padding: '8px 24px',
                background: colors.primary,
                color: colors.gold,
                fontSize: '11px',
                letterSpacing: '0.25em',
                fontWeight: '700',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                border: `2px solid ${colors.gold}`,
                position: 'relative',
                zIndex: 1
              }}>
                {assetType === 'buildings' ? '🏛️ HERITAGE PROPERTY' : '🚗 CLASSIC MOTOR VEHICLE'}
              </div>

              <h1 style={{
                margin: '0 0 16px 0',
                fontSize: '42px',
                fontWeight: '400',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: colors.primary,
                letterSpacing: '0.02em',
                lineHeight: '1.2',
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>
                {selectedBuilding.PropertyName}
              </h1>

              <p style={{
                margin: 0,
                fontSize: '16px',
                color: colors.secondary,
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 1
              }}>
                {selectedBuilding.Address}
              </p>
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: '40px 48px',
              overflowY: 'auto'
            }}>
              {/* Specification Panels with Industrial Gauges */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {/* Year Gauge */}
                <div style={{
                  padding: '28px',
                  background: '#ffffff',
                  border: `4px solid ${colors.accent}`,
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(44, 24, 16, 0.15), inset 0 2px 4px rgba(184, 115, 51, 0.2)'
                }}>
                  {/* Corner Rivets */}
                  {[
                    { top: -2, left: -2 },
                    { top: -2, right: -2 },
                    { bottom: -2, left: -2 },
                    { bottom: -2, right: -2 }
                  ].map((pos, i) => (
                    <div key={i} style={{
                      position: 'absolute',
                      ...pos,
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${colors.steel}, ${colors.primary})`,
                      border: `2px solid ${colors.accent}`,
                      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
                    }} />
                  ))}

                  <div style={{
                    fontSize: '11px',
                    color: colors.steel,
                    letterSpacing: '0.2em',
                    marginBottom: '12px',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    {assetType === 'buildings' ? 'YEAR ESTABLISHED' : 'MODEL YEAR'}
                  </div>
                  <div style={{
                    fontSize: '48px',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: colors.primary,
                    fontWeight: '700',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(184, 115, 51, 0.2)'
                  }}>
                    {selectedBuilding.YearBuilt}
                  </div>

                  {/* Age Indicator */}
                  <div style={{
                    marginTop: '16px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: colors.secondary,
                    fontWeight: '600',
                    fontStyle: 'italic'
                  }}>
                    {new Date().getFullYear() - selectedBuilding.YearBuilt} years of heritage
                  </div>
                </div>

                {/* Area/Capacity Gauge */}
                <div style={{
                  padding: '28px',
                  background: '#ffffff',
                  border: `4px solid ${colors.steel}`,
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(44, 24, 16, 0.15), inset 0 2px 4px rgba(112, 128, 144, 0.2)'
                }}>
                  {/* Corner Rivets */}
                  {[
                    { top: -2, left: -2 },
                    { top: -2, right: -2 },
                    { bottom: -2, left: -2 },
                    { bottom: -2, right: -2 }
                  ].map((pos, i) => (
                    <div key={i} style={{
                      position: 'absolute',
                      ...pos,
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${colors.accent}, ${colors.primary})`,
                      border: `2px solid ${colors.steel}`,
                      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)'
                    }} />
                  ))}

                  <div style={{
                    fontSize: '11px',
                    color: colors.steel,
                    letterSpacing: '0.2em',
                    marginBottom: '12px',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    {assetType === 'buildings' ? 'TOTAL AREA' : 'ENGINE SIZE'}
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: colors.primary,
                    fontWeight: '700',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(112, 128, 144, 0.2)'
                  }}>
                    {selectedBuilding.AreaSquareFootage.toLocaleString()}
                    <span style={{ fontSize: '18px', color: colors.secondary }}>
                      {assetType === 'buildings' ? ' ft²' : ' cc'}
                    </span>
                  </div>
                </div>

                {/* Commissioned Date */}
                {selectedBuilding.CommissioningDate && (
                  <div style={{
                    gridColumn: '1 / -1',
                    padding: '24px',
                    background: `linear-gradient(135deg, ${colors.cream} 0%, #ffffff 100%)`,
                    border: `3px solid ${colors.gold}`,
                    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.2), inset 0 2px 4px rgba(212, 175, 55, 0.1)'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: colors.secondary,
                      letterSpacing: '0.2em',
                      marginBottom: '12px',
                      fontWeight: '700',
                      textAlign: 'center'
                    }}>
                      {assetType === 'buildings' ? 'DATE COMMISSIONED' : 'REGISTRATION DATE'}
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: colors.primary,
                      fontStyle: 'italic',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {Formatters.formatDate(selectedBuilding.CommissioningDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Certification Seal */}
              <div style={{
                marginTop: '32px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  border: `6px double ${colors.gold}`,
                  background: `
                    radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 100%),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.1"/></svg>')
                  `,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 12px 32px rgba(44, 24, 16, 0.4), inset 0 4px 8px rgba(0, 0, 0, 0.3)',
                  margin: '0 auto'
                }}>
                  {/* Wax Seal Texture */}
                  <div style={{
                    position: 'absolute',
                    inset: '12px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.accent}`,
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(255, 255, 255, 0.2)'
                  }} />

                  <div style={{
                    textAlign: 'center',
                    color: colors.gold,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div style={{
                      fontSize: '42px',
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: '700',
                      lineHeight: '1',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>
                      {assetType === 'buildings' ? '🏛️' : '🚗'}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      marginTop: '8px',
                      fontWeight: '700'
                    }}>
                      CERTIFIED
                    </div>
                  </div>
                </div>

                {/* Certification Text */}
                <div style={{
                  marginTop: '20px',
                  fontSize: '13px',
                  color: colors.secondary,
                  fontStyle: 'italic',
                  maxWidth: '400px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  lineHeight: '1.6'
                }}>
                  This {assetType === 'buildings' ? 'property' : 'vehicle'} has been inspected and certified
                  for {assetType === 'buildings' ? 'heritage preservation' : 'classic status'} according to
                  established standards.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <div style={{
              textAlign: 'center',
              fontFamily: '"Playfair Display", Georgia, serif',
              color: colors.secondary
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>
                Select an Asset
              </div>
              <div style={{ fontSize: '14px', fontStyle: 'italic' }}>
                from the registry to view details
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
