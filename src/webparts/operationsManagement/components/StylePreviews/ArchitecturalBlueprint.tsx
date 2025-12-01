// Architectural Blueprint Style Preview - Technical drawing aesthetic
import * as React from 'react';
import { useDataContext } from '../Context';
import { IBuilding } from '../../models/IBuilding';
import { Formatters } from '../../utils/Formatters';

export const ArchitecturalBlueprint: React.FC = () => {
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
      background: 'linear-gradient(0deg, rgba(30, 58, 138, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 58, 138, 0.03) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      backgroundColor: '#F8FAFC',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Left Gallery */}
      <div style={{
        width: '300px',
        borderRight: '2px solid #1E3A8A',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Corner Brackets - Top Left */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderTop: '2px solid #1E3A8A',
          borderLeft: '2px solid #1E3A8A'
        }} />

        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '2px solid #1E3A8A'
        }}>
          <h2 style={{
            margin: '0 0 4px 0',
            fontSize: '18px',
            fontWeight: '700',
            color: '#1E3A8A',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: '"JetBrains Mono", monospace'
          }}>
            BUILDINGS
          </h2>
          <div style={{
            fontSize: '10px',
            color: '#64748B',
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.1em'
          }}>
            PROPERTY REGISTRY / SHEET 01
          </div>
        </div>

        {/* Building List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px'
        }}>
          {state.filteredBuildings.map((building, index) => (
            <div
              key={building.Id}
              onClick={() => setSelectedBuilding(building)}
              style={{
                padding: '16px',
                marginBottom: '12px',
                background: selectedBuilding?.Id === building.Id ? '#EFF6FF' : '#ffffff',
                border: selectedBuilding?.Id === building.Id ? '2px solid #1E3A8A' : '1px dashed #CBD5E1',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Corner Brackets for Selected */}
              {selectedBuilding?.Id === building.Id && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    width: '12px',
                    height: '12px',
                    borderTop: '3px solid #1E3A8A',
                    borderLeft: '3px solid #1E3A8A'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: '12px',
                    height: '12px',
                    borderTop: '3px solid #1E3A8A',
                    borderRight: '3px solid #1E3A8A'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: -2,
                    left: -2,
                    width: '12px',
                    height: '12px',
                    borderBottom: '3px solid #1E3A8A',
                    borderLeft: '3px solid #1E3A8A'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: '12px',
                    height: '12px',
                    borderBottom: '3px solid #1E3A8A',
                    borderRight: '3px solid #1E3A8A'
                  }} />
                </>
              )}

              {/* Building Number */}
              <div style={{
                fontSize: '10px',
                color: '#64748B',
                fontFamily: '"JetBrains Mono", monospace',
                marginBottom: '4px',
                letterSpacing: '0.1em'
              }}>
                PROP-{String(index + 1).padStart(3, '0')}
              </div>

              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '14px',
                fontWeight: '700',
                color: '#1E3A8A'
              }}>
                {building.PropertyName}
              </h3>

              <p style={{
                margin: '0 0 12px 0',
                fontSize: '12px',
                color: '#475569',
                lineHeight: '1.4'
              }}>
                {building.Address}
              </p>

              {/* Technical Specs */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '11px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '9px' }}>YEAR</div>
                  <div style={{ color: '#1E3A8A', fontWeight: '600' }}>{building.YearBuilt}</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '9px' }}>AREA</div>
                  <div style={{ color: '#1E3A8A', fontWeight: '600' }}>
                    {building.AreaSquareFootage.toLocaleString()} ft²
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Details Panel */}
      <div style={{
        flex: 1,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Corner Brackets - Top Right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '20px',
          height: '20px',
          borderTop: '2px solid #1E3A8A',
          borderRight: '2px solid #1E3A8A'
        }} />

        {selectedBuilding ? (
          <>
            {/* Header with Diagonal Hatch Pattern */}
            <div style={{
              padding: '32px 40px',
              borderBottom: '2px solid #1E3A8A',
              background: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(30, 58, 138, 0.03) 10px,
                  rgba(30, 58, 138, 0.03) 11px
                )
              `,
              position: 'relative'
            }}>
              {/* Title Block */}
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: '#1E3A8A',
                color: '#ffffff',
                fontSize: '11px',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.1em',
                marginBottom: '12px'
              }}>
                PROPERTY DETAILS
              </div>

              <h1 style={{
                margin: '0 0 8px 0',
                fontSize: '32px',
                fontWeight: '800',
                color: '#1E3A8A',
                letterSpacing: '-0.02em'
              }}>
                {selectedBuilding.PropertyName}
              </h1>

              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#475569'
              }}>
                {selectedBuilding.Address}
              </p>

              {/* Dimension Lines */}
              <div style={{
                position: 'absolute',
                bottom: -10,
                left: 40,
                right: 40,
                height: '2px',
                background: '#1E3A8A',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderRight: '6px solid #1E3A8A'
                }} />
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: '6px solid #1E3A8A'
                }} />
              </div>
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: '32px 40px',
              overflowY: 'auto'
            }}>
              {/* Technical Specifications Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '32px'
              }}>
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: '#94A3B8',
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: '0.1em',
                    marginBottom: '8px'
                  }}>
                    CONSTRUCTION YEAR
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1E3A8A',
                    fontFamily: '"JetBrains Mono", monospace'
                  }}>
                    {selectedBuilding.YearBuilt}
                  </div>
                </div>

                <div>
                  <div style={{
                    fontSize: '10px',
                    color: '#94A3B8',
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: '0.1em',
                    marginBottom: '8px'
                  }}>
                    TOTAL AREA
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1E3A8A',
                    fontFamily: '"JetBrains Mono", monospace'
                  }}>
                    {selectedBuilding.AreaSquareFootage.toLocaleString()} ft²
                  </div>
                </div>

                {selectedBuilding.CommissioningDate && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{
                      fontSize: '10px',
                      color: '#94A3B8',
                      fontFamily: '"JetBrains Mono", monospace',
                      letterSpacing: '0.1em',
                      marginBottom: '8px'
                    }}>
                      COMMISSIONED
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1E3A8A',
                      fontFamily: '"JetBrains Mono", monospace'
                    }}>
                      {Formatters.formatDate(selectedBuilding.CommissioningDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Stamp */}
              <div style={{
                display: 'inline-block',
                padding: '12px 24px',
                border: '3px solid #1E3A8A',
                transform: 'rotate(-5deg)',
                marginTop: '32px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#1E3A8A',
                  letterSpacing: '0.1em',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  APPROVED
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
            color: '#94A3B8'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '14px',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.1em'
              }}>
                SELECT PROPERTY
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
