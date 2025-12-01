// Neon Future Style Preview - Cyberpunk aesthetic
import * as React from 'react';
import { useDataContext } from '../Context';
import { IBuilding } from '../../models/IBuilding';
import { Formatters } from '../../utils/Formatters';

export const NeonFuture: React.FC = () => {
  const { state } = useDataContext();
  const [selectedBuilding, setSelectedBuilding] = React.useState<IBuilding | undefined>();
  const [glitchActive, setGlitchActive] = React.useState(false);

  React.useEffect(() => {
    if (!selectedBuilding && state.filteredBuildings.length > 0) {
      setSelectedBuilding(state.filteredBuildings[0]);
    }
  }, [state.filteredBuildings, selectedBuilding]);

  const handleBuildingClick = (building: IBuilding): void => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 200);
    setSelectedBuilding(building);
  };

  return (
    <div style={{
      display: 'flex',
      height: '550px',
      background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0A0E27 100%)',
      fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(0deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      {/* Glitch Overlay */}
      {glitchActive && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, rgba(255, 0, 255, 0.1) 0px, transparent 2px, transparent 4px)',
          animation: 'glitch 0.2s steps(2)',
          pointerEvents: 'none',
          zIndex: 100
        }} />
      )}

      {/* Left Gallery */}
      <div style={{
        width: '300px',
        background: 'rgba(10, 14, 39, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(0, 240, 255, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '4px 0 32px rgba(0, 240, 255, 0.2)'
      }}>
        {/* Neon Corner Brackets */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderTop: '2px solid #00F0FF',
          borderLeft: '2px solid #00F0FF',
          boxShadow: '0 0 10px #00F0FF'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '24px',
          height: '24px',
          borderTop: '2px solid #00F0FF',
          borderRight: '2px solid #00F0FF',
          boxShadow: '0 0 10px #00F0FF'
        }} />

        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(0, 240, 255, 0.3)',
          background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.1) 0%, transparent 100%)'
        }}>
          <div style={{
            fontSize: '10px',
            color: '#00F0FF',
            letterSpacing: '0.3em',
            marginBottom: '8px',
            fontFamily: '"Fira Code", monospace',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.8)'
          }}>
            &gt;&gt; SYSTEM_ONLINE
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(0, 240, 255, 0.6)'
          }}>
            BUILDINGS
          </h2>
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
              onClick={() => handleBuildingClick(building)}
              style={{
                padding: '16px',
                marginBottom: '12px',
                background: selectedBuilding?.Id === building.Id
                  ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)'
                  : 'rgba(26, 31, 58, 0.6)',
                border: selectedBuilding?.Id === building.Id
                  ? '1px solid #00F0FF'
                  : '1px solid rgba(0, 240, 255, 0.2)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                boxShadow: selectedBuilding?.Id === building.Id
                  ? '0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.1)'
                  : 'none'
              }}
            >
              {/* Scanning Line Animation */}
              {selectedBuilding?.Id === building.Id && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00F0FF, transparent)',
                  animation: 'scan 2s linear infinite'
                }} />
              )}

              {/* ID Number */}
              <div style={{
                fontSize: '10px',
                color: '#FF00FF',
                fontFamily: '"Fira Code", monospace',
                marginBottom: '8px',
                letterSpacing: '0.15em',
                textShadow: selectedBuilding?.Id === building.Id ? '0 0 8px #FF00FF' : 'none'
              }}>
                ID: {String(building.Id).padStart(4, '0')}
              </div>

              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: '700',
                color: selectedBuilding?.Id === building.Id ? '#00F0FF' : '#ffffff',
                textShadow: selectedBuilding?.Id === building.Id ? '0 0 15px #00F0FF' : 'none',
                letterSpacing: '0.05em'
              }}>
                {building.PropertyName}
              </h3>

              <p style={{
                margin: '0 0 12px 0',
                fontSize: '12px',
                color: '#8B9DC3',
                lineHeight: '1.5'
              }}>
                {building.Address}
              </p>

              {/* Data Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(0, 240, 255, 0.2)'
              }}>
                <div>
                  <div style={{
                    fontSize: '9px',
                    color: '#00F0FF',
                    fontFamily: '"Fira Code", monospace',
                    marginBottom: '4px',
                    letterSpacing: '0.1em'
                  }}>
                    YEAR
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#ffffff',
                    fontFamily: '"Fira Code", monospace',
                    textShadow: selectedBuilding?.Id === building.Id ? '0 0 10px #00F0FF' : 'none'
                  }}>
                    {building.YearBuilt}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '9px',
                    color: '#FF00FF',
                    fontFamily: '"Fira Code", monospace',
                    marginBottom: '4px',
                    letterSpacing: '0.1em'
                  }}>
                    AREA
                  </div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#ffffff',
                    fontFamily: '"Fira Code", monospace'
                  }}>
                    {(building.AreaSquareFootage / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Corner Brackets */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderBottom: '2px solid #00F0FF',
          borderLeft: '2px solid #00F0FF',
          boxShadow: '0 0 10px #00F0FF'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '24px',
          height: '24px',
          borderBottom: '2px solid #00F0FF',
          borderRight: '2px solid #00F0FF',
          boxShadow: '0 0 10px #00F0FF'
        }} />
      </div>

      {/* Right Details Panel */}
      <div style={{
        flex: 1,
        background: 'rgba(10, 14, 39, 0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {selectedBuilding ? (
          <>
            {/* Holographic Header */}
            <div style={{
              padding: '40px 48px',
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
              borderBottom: '2px solid rgba(0, 240, 255, 0.5)',
              position: 'relative',
              boxShadow: '0 4px 32px rgba(0, 240, 255, 0.3)'
            }}>
              {/* Status Bar */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: '#00FF00',
                  boxShadow: '0 0 15px #00FF00',
                  borderRadius: '50%',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                <div style={{
                  fontSize: '11px',
                  color: '#00F0FF',
                  fontFamily: '"Fira Code", monospace',
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px #00F0FF'
                }}>
                  SYSTEM_ACTIVE
                </div>
              </div>

              <h1 style={{
                margin: '0 0 16px 0',
                fontSize: '42px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00F0FF 0%, #FF00FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.6))'
              }}>
                {selectedBuilding.PropertyName}
              </h1>

              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#8B9DC3',
                fontFamily: '"Fira Code", monospace'
              }}>
                &gt; {selectedBuilding.Address}
              </p>

              {/* Holographic Line */}
              <div style={{
                marginTop: '24px',
                height: '2px',
                background: 'linear-gradient(90deg, #00F0FF, #FF00FF, transparent)',
                boxShadow: '0 0 10px #00F0FF'
              }} />
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              padding: '40px 48px',
              overflowY: 'auto'
            }}>
              {/* Data Panels */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {/* Year Panel */}
                <div style={{
                  padding: '24px',
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  position: 'relative',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#00F0FF',
                    fontFamily: '"Fira Code", monospace',
                    marginBottom: '12px',
                    letterSpacing: '0.2em',
                    textShadow: '0 0 10px #00F0FF'
                  }}>
                    CONSTRUCTION_YEAR
                  </div>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    color: '#ffffff',
                    fontFamily: '"Fira Code", monospace',
                    textShadow: '0 0 30px rgba(0, 240, 255, 0.8)',
                    lineHeight: '1'
                  }}>
                    {selectedBuilding.YearBuilt}
                  </div>
                </div>

                {/* Area Panel */}
                <div style={{
                  padding: '24px',
                  background: 'rgba(255, 0, 255, 0.05)',
                  border: '1px solid rgba(255, 0, 255, 0.3)',
                  position: 'relative',
                  clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.2)'
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#FF00FF',
                    fontFamily: '"Fira Code", monospace',
                    marginBottom: '12px',
                    letterSpacing: '0.2em',
                    textShadow: '0 0 10px #FF00FF'
                  }}>
                    TOTAL_AREA
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    color: '#ffffff',
                    fontFamily: '"Fira Code", monospace',
                    textShadow: '0 0 30px rgba(255, 0, 255, 0.8)',
                    lineHeight: '1'
                  }}>
                    {selectedBuilding.AreaSquareFootage.toLocaleString()}
                    <span style={{ fontSize: '16px', color: '#8B9DC3' }}> ft²</span>
                  </div>
                </div>

                {/* Commissioned Date */}
                {selectedBuilding.CommissioningDate && (
                  <div style={{
                    gridColumn: '1 / -1',
                    padding: '24px',
                    background: 'rgba(0, 255, 0, 0.05)',
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                    boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#00FF00',
                      fontFamily: '"Fira Code", monospace',
                      marginBottom: '12px',
                      letterSpacing: '0.2em',
                      textShadow: '0 0 10px #00FF00'
                    }}>
                      COMMISSIONED_DATE
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#ffffff',
                      fontFamily: '"Fira Code", monospace',
                      textShadow: '0 0 20px rgba(0, 255, 0, 0.8)'
                    }}>
                      {Formatters.formatDate(selectedBuilding.CommissioningDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Holographic Badge */}
              <div style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
                border: '2px solid #00F0FF',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.5)',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#00F0FF',
                  letterSpacing: '0.15em',
                  fontFamily: '"Fira Code", monospace',
                  textShadow: '0 0 20px #00F0FF'
                }}>
                  AUTHORIZED
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
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '18px',
                color: '#00F0FF',
                fontFamily: '"Fira Code", monospace',
                letterSpacing: '0.2em',
                textShadow: '0 0 20px rgba(0, 240, 255, 0.8)',
                marginBottom: '8px'
              }}>
                &gt;&gt; SELECT_PROPERTY
              </div>
              <div style={{
                fontSize: '12px',
                color: '#8B9DC3'
              }}>
                Initialize data stream...
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};
