// Dublin Heritage Style Preview - Victorian elegance
import * as React from 'react';
import { useDataContext } from '../Context';
import { IBuilding } from '../../models/IBuilding';
import { Formatters } from '../../utils/Formatters';

export const DublinHeritage: React.FC = () => {
  const { state } = useDataContext();
  const [selectedBuilding, setSelectedBuilding] = React.useState<IBuilding | undefined>();

  React.useEffect(() => {
    if (!selectedBuilding && state.filteredBuildings.length > 0) {
      setSelectedBuilding(state.filteredBuildings[0]);
    }
  }, [state.filteredBuildings, selectedBuilding]);

  return (
    <div style={{
      display: 'flex',
      height: '550px',
      background: '#FBF8F3',
      fontFamily: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Left Gallery */}
      <div style={{
        width: '300px',
        borderRight: '1px solid #D4AF37',
        background: 'linear-gradient(180deg, #FBF8F3 0%, #F5F1E8 100%)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 12px rgba(30, 70, 32, 0.1)'
      }}>
        {/* Ornamental Header */}
        <div style={{
          padding: '32px 24px',
          borderBottom: '2px solid #D4AF37',
          background: '#1E4620',
          color: '#FBF8F3',
          position: 'relative'
        }}>
          {/* Corner Flourish - Top Left */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: '24px',
            height: '24px',
            border: '2px solid #D4AF37',
            borderRight: 'none',
            borderBottom: 'none',
            opacity: 0.6
          }}>
            <div style={{
              position: 'absolute',
              top: -2,
              left: -2,
              width: '8px',
              height: '8px',
              borderTop: '2px solid #D4AF37',
              borderLeft: '2px solid #D4AF37'
            }} />
          </div>

          {/* Corner Flourish - Top Right */}
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: '24px',
            height: '24px',
            border: '2px solid #D4AF37',
            borderLeft: 'none',
            borderBottom: 'none',
            opacity: 0.6
          }}>
            <div style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: '8px',
              height: '8px',
              borderTop: '2px solid #D4AF37',
              borderRight: '2px solid #D4AF37'
            }} />
          </div>

          <h2 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '400',
            fontFamily: '"Playfair Display", Georgia, serif',
            letterSpacing: '0.05em',
            textAlign: 'center'
          }}>
            Buildings
          </h2>
          <div style={{
            marginTop: '8px',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textAlign: 'center',
            color: '#D4AF37',
            fontWeight: '600'
          }}>
            DUBLIN PROPERTY REGISTRY
          </div>
        </div>

        {/* Building List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px'
        }}>
          {state.filteredBuildings.map((building) => (
            <div
              key={building.Id}
              onClick={() => setSelectedBuilding(building)}
              style={{
                padding: '20px',
                marginBottom: '16px',
                background: selectedBuilding?.Id === building.Id
                  ? 'linear-gradient(135deg, #1E4620 0%, #2D6B32 100%)'
                  : '#ffffff',
                border: `2px solid ${selectedBuilding?.Id === building.Id ? '#D4AF37' : '#E8DCC4'}`,
                borderRadius: '2px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: selectedBuilding?.Id === building.Id
                  ? '0 8px 24px rgba(212, 175, 55, 0.3)'
                  : '0 2px 8px rgba(30, 70, 32, 0.08)'
              }}
            >
              {/* Victorian Corner Ornaments for Selected */}
              {selectedBuilding?.Id === building.Id && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    width: '16px',
                    height: '16px',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    border: '2px solid #FBF8F3'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: '16px',
                    height: '16px',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    border: '2px solid #FBF8F3'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: -8,
                    left: -8,
                    width: '16px',
                    height: '16px',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    border: '2px solid #FBF8F3'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    width: '16px',
                    height: '16px',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    border: '2px solid #FBF8F3'
                  }} />
                </>
              )}

              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: selectedBuilding?.Id === building.Id ? '#FBF8F3' : '#1E4620'
              }}>
                {building.PropertyName}
              </h3>

              <p style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                color: selectedBuilding?.Id === building.Id ? '#E8DCC4' : '#5C4A2F',
                lineHeight: '1.6'
              }}>
                {building.Address}
              </p>

              {/* Decorative Separator */}
              <div style={{
                height: '1px',
                background: selectedBuilding?.Id === building.Id
                  ? 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
                  : 'linear-gradient(90deg, transparent, #E8DCC4, transparent)',
                margin: '12px 0'
              }} />

              {/* Details */}
              <div style={{
                display: 'flex',
                gap: '16px',
                fontSize: '12px'
              }}>
                <div style={{
                  color: selectedBuilding?.Id === building.Id ? '#FBF8F3' : '#1E4620',
                  fontWeight: '600'
                }}>
                  Est. {building.YearBuilt}
                </div>
                <div style={{
                  color: selectedBuilding?.Id === building.Id ? '#D4AF37' : '#8B7355'
                }}>
                  {building.AreaSquareFootage.toLocaleString()} sq ft
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Details Panel */}
      <div style={{
        flex: 1,
        background: '#FBF8F3',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {selectedBuilding ? (
          <>
            {/* Ornamental Header */}
            <div style={{
              padding: '48px 48px 40px',
              background: 'linear-gradient(180deg, #ffffff 0%, #FBF8F3 100%)',
              borderBottom: '3px double #D4AF37',
              position: 'relative'
            }}>
              {/* Decorative Border Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: `repeating-linear-gradient(
                  90deg,
                  #D4AF37 0px,
                  #D4AF37 4px,
                  transparent 4px,
                  transparent 12px
                )`
              }} />

              {/* Heritage Shield */}
              <div style={{
                display: 'inline-block',
                padding: '6px 20px',
                background: '#1E4620',
                color: '#D4AF37',
                fontSize: '10px',
                letterSpacing: '0.2em',
                marginBottom: '16px',
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
                fontWeight: '700'
              }}>
                HERITAGE PROPERTY
              </div>

              <h1 style={{
                margin: '0 0 12px 0',
                fontSize: '42px',
                fontWeight: '400',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#1E4620',
                letterSpacing: '0.02em',
                lineHeight: '1.2'
              }}>
                {selectedBuilding.PropertyName}
              </h1>

              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#5C4A2F',
                fontStyle: 'italic'
              }}>
                {selectedBuilding.Address}
              </p>

              {/* Ornamental Divider */}
              <div style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#D4AF37',
                  transform: 'rotate(45deg)'
                }} />
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: 'linear-gradient(90deg, #D4AF37, transparent)'
                }} />
              </div>
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: '40px 48px',
              overflowY: 'auto'
            }}>
              {/* Property Details in Elegant Layout */}
              <div style={{
                background: '#ffffff',
                padding: '32px',
                border: '2px solid #E8DCC4',
                borderRadius: '4px',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(30, 70, 32, 0.1)'
              }}>
                {/* Corner Decorations */}
                <div style={{
                  position: 'absolute',
                  top: -1,
                  left: -1,
                  width: '32px',
                  height: '32px',
                  borderTop: '3px solid #D4AF37',
                  borderLeft: '3px solid #D4AF37'
                }} />
                <div style={{
                  position: 'absolute',
                  top: -1,
                  right: -1,
                  width: '32px',
                  height: '32px',
                  borderTop: '3px solid #D4AF37',
                  borderRight: '3px solid #D4AF37'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: -1,
                  left: -1,
                  width: '32px',
                  height: '32px',
                  borderBottom: '3px solid #D4AF37',
                  borderLeft: '3px solid #D4AF37'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  width: '32px',
                  height: '32px',
                  borderBottom: '3px solid #D4AF37',
                  borderRight: '3px solid #D4AF37'
                }} />

                <h3 style={{
                  margin: '0 0 24px 0',
                  fontSize: '20px',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: '#1E4620',
                  textAlign: 'center',
                  letterSpacing: '0.05em'
                }}>
                  Property Information
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#8B7355',
                      letterSpacing: '0.15em',
                      marginBottom: '8px',
                      fontWeight: '700'
                    }}>
                      YEAR ESTABLISHED
                    </div>
                    <div style={{
                      fontSize: '36px',
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#1E4620',
                      fontWeight: '700'
                    }}>
                      {selectedBuilding.YearBuilt}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#8B7355',
                      letterSpacing: '0.15em',
                      marginBottom: '8px',
                      fontWeight: '700'
                    }}>
                      TOTAL AREA
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#1E4620',
                      fontWeight: '700'
                    }}>
                      {selectedBuilding.AreaSquareFootage.toLocaleString()}
                      <span style={{ fontSize: '16px', color: '#8B7355' }}> sq ft</span>
                    </div>
                  </div>

                  {selectedBuilding.CommissioningDate && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '16px' }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#8B7355',
                        letterSpacing: '0.15em',
                        marginBottom: '8px',
                        fontWeight: '700'
                      }}>
                        COMMISSIONED
                      </div>
                      <div style={{
                        fontSize: '20px',
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: '#1E4620',
                        fontStyle: 'italic'
                      }}>
                        {Formatters.formatDate(selectedBuilding.CommissioningDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Heritage Seal */}
              <div style={{
                marginTop: '40px',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '4px double #D4AF37',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, #1E4620 0%, #2D6B32 100%)',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
                }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#D4AF37'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: '700',
                      lineHeight: '1'
                    }}>
                      {new Date().getFullYear() - selectedBuilding.YearBuilt}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      marginTop: '4px'
                    }}>
                      YEARS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#8B7355'
          }}>
            <div style={{
              textAlign: 'center',
              fontFamily: '"Playfair Display", Georgia, serif'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>Select a Property</div>
              <div style={{ fontSize: '14px', fontStyle: 'italic' }}>to view heritage details</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
