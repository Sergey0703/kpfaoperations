// Modern Corporate Style - SharePoint Blue & White with elegance
import * as React from 'react';
import { useDataContext } from '../Context';
import { IBuilding } from '../../models/IBuilding';
import { Formatters } from '../../utils/Formatters';

export const ModernCorporate: React.FC = () => {
  const { state } = useDataContext();
  const [selectedBuilding, setSelectedBuilding] = React.useState<IBuilding | undefined>();

  React.useEffect(() => {
    if (!selectedBuilding && state.filteredBuildings.length > 0) {
      setSelectedBuilding(state.filteredBuildings[0]);
    }
  }, [state.filteredBuildings, selectedBuilding]);

  // SharePoint & Microsoft 365 Colors
  const colors = {
    primary: '#0078D4', // SharePoint Blue
    primaryDark: '#106EBE', // Darker blue
    primaryLight: '#2B88D8', // Lighter blue
    accent: '#00BCF2', // Cyan accent
    success: '#107C10', // Green
    white: '#FFFFFF',
    background: '#F3F2F1', // Neutral background
    surface: '#FAFAFA',
    border: '#EDEBE9',
    text: '#323130',
    textSecondary: '#605E5C',
    textLight: '#8A8886',
    hover: '#F3F2F1'
  };

  return (
    <div style={{
      display: 'flex',
      height: '550px',
      background: colors.background,
      fontFamily: '"Segoe UI", -apple-system, system-ui, sans-serif'
    }}>
      {/* Left Panel - Clean & Modern */}
      <div style={{
        width: '300px',
        background: colors.white,
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Modern Header with Fluent Design */}
        <div style={{
          padding: '24px 20px',
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
          color: colors.white,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Fluent Design Acrylic Effect */}
          <div style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: '150px',
            height: '150px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.5px',
              opacity: 0.9,
              marginBottom: '8px'
            }}>
              ASSET MANAGEMENT
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '600',
              letterSpacing: '-0.5px'
            }}>
              Buildings
            </h2>
          </div>
        </div>

        {/* Search Bar - Fluent Style */}
        <div style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${colors.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '4px',
            padding: '8px 12px',
            transition: 'all 0.2s ease'
          }}>
            <span style={{ color: colors.textLight, marginRight: '8px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search properties..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                flex: 1,
                fontSize: '14px',
                color: colors.text,
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Building List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px'
        }}>
          {state.filteredBuildings.map((building) => (
            <div
              key={building.Id}
              onClick={() => setSelectedBuilding(building)}
              style={{
                padding: '16px',
                marginBottom: '8px',
                background: selectedBuilding?.Id === building.Id ? colors.surface : colors.white,
                border: `1px solid ${selectedBuilding?.Id === building.Id ? colors.primary : colors.border}`,
                borderLeft: selectedBuilding?.Id === building.Id
                  ? `4px solid ${colors.primary}`
                  : `4px solid transparent`,
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedBuilding?.Id === building.Id
                  ? `0 2px 8px rgba(0, 120, 212, 0.15)`
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedBuilding?.Id !== building.Id) {
                  e.currentTarget.style.background = colors.hover;
                  e.currentTarget.style.borderLeft = `4px solid ${colors.border}`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedBuilding?.Id !== building.Id) {
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.borderLeft = '4px solid transparent';
                }
              }}
            >
              <h3 style={{
                margin: '0 0 6px 0',
                fontSize: '15px',
                fontWeight: '600',
                color: selectedBuilding?.Id === building.Id ? colors.primary : colors.text,
                lineHeight: '1.3'
              }}>
                {building.PropertyName}
              </h3>

              <p style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                color: colors.textSecondary,
                lineHeight: '1.4'
              }}>
                {building.Address}
              </p>

              {/* Info Pills */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  background: selectedBuilding?.Id === building.Id
                    ? 'rgba(0, 120, 212, 0.1)'
                    : colors.surface,
                  color: selectedBuilding?.Id === building.Id ? colors.primary : colors.textSecondary,
                  fontSize: '12px',
                  fontWeight: '500',
                  borderRadius: '12px'
                }}>
                  📅 {building.YearBuilt}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  background: selectedBuilding?.Id === building.Id
                    ? 'rgba(0, 120, 212, 0.1)'
                    : colors.surface,
                  color: selectedBuilding?.Id === building.Id ? colors.primary : colors.textSecondary,
                  fontSize: '12px',
                  fontWeight: '500',
                  borderRadius: '12px'
                }}>
                  📐 {(building.AreaSquareFootage / 1000).toFixed(1)}K ft²
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div style={{
        flex: 1,
        background: colors.white,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {selectedBuilding ? (
          <>
            {/* Hero Header */}
            <div style={{
              padding: '40px 48px',
              background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.surface} 100%)`,
              borderBottom: `1px solid ${colors.border}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative Elements */}
              <div style={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: '300px',
                height: '300px',
                background: `radial-gradient(circle, ${colors.primary}15, transparent)`,
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${colors.accent}10, transparent)`,
                borderRadius: '50%'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Status Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 16px',
                  background: `${colors.success}15`,
                  color: colors.success,
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  marginBottom: '16px',
                  border: `1px solid ${colors.success}30`
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colors.success,
                    marginRight: '8px'
                  }} />
                  ACTIVE PROPERTY
                </div>

                <h1 style={{
                  margin: '0 0 12px 0',
                  fontSize: '36px',
                  fontWeight: '600',
                  color: colors.text,
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2'
                }}>
                  {selectedBuilding.PropertyName}
                </h1>

                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  color: colors.textSecondary,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ marginRight: '8px' }}>📍</span>
                  {selectedBuilding.Address}
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div style={{
              flex: 1,
              padding: '32px 48px',
              overflowY: 'auto'
            }}>
              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '32px'
              }}>
                <button style={{
                  padding: '10px 24px',
                  background: colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0, 120, 212, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.primaryDark;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 120, 212, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 120, 212, 0.2)';
                }}>
                  ✏️ Edit Property
                </button>
                <button style={{
                  padding: '10px 24px',
                  background: colors.white,
                  color: colors.primary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.surface;
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.borderColor = colors.border;
                }}>
                  🗑️ Delete
                </button>
              </div>

              {/* Property Information Card */}
              <div style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  margin: '0 0 20px 0',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: colors.text
                }}>
                  Property Information
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '24px'
                }}>
                  {/* Year Built */}
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: colors.textLight,
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Year Built
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '600',
                      color: colors.primary,
                      lineHeight: '1'
                    }}>
                      {selectedBuilding.YearBuilt}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: colors.textSecondary,
                      marginTop: '4px'
                    }}>
                      {new Date().getFullYear() - selectedBuilding.YearBuilt} years ago
                    </div>
                  </div>

                  {/* Total Area */}
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: colors.textLight,
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Total Area
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '600',
                      color: colors.primary,
                      lineHeight: '1'
                    }}>
                      {selectedBuilding.AreaSquareFootage.toLocaleString()}
                      <span style={{ fontSize: '16px', color: colors.textSecondary }}> ft²</span>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: colors.textSecondary,
                      marginTop: '4px'
                    }}>
                      {(selectedBuilding.AreaSquareFootage * 0.092903).toFixed(0)} m²
                    </div>
                  </div>

                  {/* Commissioned Date */}
                  {selectedBuilding.CommissioningDate && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: colors.textLight,
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Commissioned Date
                      </div>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: colors.text
                      }}>
                        {Formatters.formatDate(selectedBuilding.CommissioningDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
              }}>
                <div style={{
                  padding: '20px',
                  background: `linear-gradient(135deg, ${colors.primary}08, ${colors.primary}15)`,
                  border: `1px solid ${colors.primary}20`,
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '8px'
                  }}>📄</div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: colors.primary,
                    marginBottom: '4px'
                  }}>12</div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.textSecondary,
                    fontWeight: '500'
                  }}>Documents</div>
                </div>

                <div style={{
                  padding: '20px',
                  background: `linear-gradient(135deg, ${colors.success}08, ${colors.success}15)`,
                  border: `1px solid ${colors.success}20`,
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '8px'
                  }}>✅</div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: colors.success,
                    marginBottom: '4px'
                  }}>Active</div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.textSecondary,
                    fontWeight: '500'
                  }}>Status</div>
                </div>

                <div style={{
                  padding: '20px',
                  background: `linear-gradient(135deg, ${colors.accent}08, ${colors.accent}15)`,
                  border: `1px solid ${colors.accent}20`,
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '8px'
                  }}>🔧</div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: colors.accent,
                    marginBottom: '4px'
                  }}>3</div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.textSecondary,
                    fontWeight: '500'
                  }}>Maintenance</div>
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
            flexDirection: 'column'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              opacity: 0.3
            }}>🏢</div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: colors.text,
              margin: '0 0 8px 0'
            }}>
              Select a Property
            </h2>
            <p style={{
              fontSize: '15px',
              color: colors.textSecondary,
              margin: 0
            }}>
              Choose a building from the list to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
