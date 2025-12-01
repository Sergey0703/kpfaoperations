// Vehicles Warm Modern Style - Automotive with warmth
import * as React from 'react';
import { useDataContext } from '../Context';
import { Formatters } from '../../utils/Formatters';

// Mock vehicle data structure (using building data as placeholder)
interface IVehicle {
  Id?: number;
  Make: string;
  Model: string;
  Year: number;
  VIN: string;
  Mileage: number;
  Status: 'Active' | 'Maintenance' | 'Retired';
  CommissioningDate?: Date;
}

export const VehiclesWarmModern: React.FC = () => {
  const { state } = useDataContext();
  const [selectedVehicle, setSelectedVehicle] = React.useState<IVehicle | undefined>();

  // Convert building data to vehicle mock data
  const vehicles: IVehicle[] = state.filteredBuildings.map((building, index) => ({
    Id: building.Id,
    Make: index === 0 ? 'Ford' : index === 1 ? 'Toyota' : index === 2 ? 'Chevrolet' : 'Mercedes',
    Model: building.PropertyName.split(' ')[0], // Use first word as model
    Year: building.YearBuilt,
    VIN: `1HGBH41JXMN${String(building.Id).padStart(6, '0')}`,
    Mileage: building.AreaSquareFootage, // Mock mileage
    Status: index === 1 ? 'Maintenance' : 'Active',
    CommissioningDate: building.CommissioningDate
  }));

  React.useEffect(() => {
    if (!selectedVehicle && vehicles.length > 0) {
      setSelectedVehicle(vehicles[0]);
    }
  }, [vehicles.length]);

  // Warm Automotive Color Palette
  const colors = {
    // Base warm colors
    cream: '#F5F1E8',
    warmWhite: '#FDFBF7',
    sand: '#E8DCC4',

    // Automotive accents
    engineRed: '#C85A4A', // Engine/power red
    roadGray: '#7A7B7D', // Asphalt gray
    chrome: '#B8C5D6', // Chrome/metal
    leather: '#8B6F47', // Leather brown

    // Status colors
    activeGreen: '#6B9D7A',
    maintenanceOrange: '#D4955A',
    retiredGray: '#9B9690',

    // Dynamic accents
    speedBlue: '#5A8FB8', // Motion blue
    sunsetOrange: '#D4845A', // Sunset orange

    // Text
    charcoal: '#2D2A26',
    warmGray: '#6B6660',
    lightGray: '#9B9690'
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active': return colors.activeGreen;
      case 'Maintenance': return colors.maintenanceOrange;
      case 'Retired': return colors.retiredGray;
      default: return colors.roadGray;
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '550px',
      background: `
        linear-gradient(135deg, ${colors.cream} 0%, ${colors.sand} 100%),
        radial-gradient(circle at 15% 85%, ${colors.engineRed}08 0%, transparent 50%),
        radial-gradient(circle at 85% 15%, ${colors.speedBlue}08 0%, transparent 50%)
      `,
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif'
    }}>
      {/* Left Panel - Fleet List */}
      <div style={{
        width: '300px',
        background: colors.warmWhite,
        borderRight: `1px solid ${colors.sand}`,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(45, 42, 38, 0.08)'
      }}>
        {/* Header with Speed Lines */}
        <div style={{
          padding: '32px 24px',
          background: `linear-gradient(135deg, ${colors.speedBlue} 0%, ${colors.chrome} 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Speed Lines Effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: -50,
            width: '200px',
            height: '2px',
            background: 'white',
            opacity: 0.2,
            transform: 'translateY(-50%) skewY(-5deg)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: -30,
            width: '150px',
            height: '2px',
            background: 'white',
            opacity: 0.15,
            transform: 'translateY(-20px) skewY(-5deg)'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: -40,
            width: '180px',
            height: '2px',
            background: 'white',
            opacity: 0.1,
            transform: 'translateY(20px) skewY(-5deg)'
          }} />

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
              Vehicle Fleet
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 11l7-7 7 7M5 19l7-7 7 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Vehicles
            </h2>
            <div style={{
              marginTop: '16px',
              height: '3px',
              width: '60px',
              background: colors.engineRed,
              borderRadius: '2px',
              boxShadow: `0 0 12px ${colors.engineRed}`
            }} />
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: `1px solid ${colors.sand}`
        }}>
          <input
            type="text"
            placeholder="Search by make, model, VIN..."
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
              e.currentTarget.style.borderColor = colors.speedBlue;
              e.currentTarget.style.background = colors.warmWhite;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.sand;
              e.currentTarget.style.background = colors.cream;
            }}
          />
        </div>

        {/* Vehicle List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px'
        }}>
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.Id}
              onClick={() => setSelectedVehicle(vehicle)}
              style={{
                padding: '20px 16px',
                marginBottom: '12px',
                background: selectedVehicle?.Id === vehicle.Id
                  ? `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`
                  : colors.warmWhite,
                border: `2px solid ${selectedVehicle?.Id === vehicle.Id ? colors.engineRed : 'transparent'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: selectedVehicle?.Id === vehicle.Id
                  ? `0 8px 24px ${colors.engineRed}20`
                  : '0 2px 8px rgba(45, 42, 38, 0.04)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (selectedVehicle?.Id !== vehicle.Id) {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(45, 42, 38, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedVehicle?.Id !== vehicle.Id) {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.04)';
                }
              }}
            >
              {/* Side Stripe for Selected */}
              {selectedVehicle?.Id === vehicle.Id && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '60%',
                  background: `linear-gradient(180deg, ${colors.engineRed}, ${colors.sunsetOrange})`,
                  borderRadius: '0 4px 4px 0'
                }} />
              )}

              {/* Status Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: `${getStatusColor(vehicle.Status)}15`,
                color: getStatusColor(vehicle.Status),
                fontSize: '11px',
                fontWeight: '700',
                borderRadius: '6px',
                marginBottom: '12px',
                border: `1px solid ${getStatusColor(vehicle.Status)}30`
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: getStatusColor(vehicle.Status)
                }} />
                {vehicle.Status}
              </div>

              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: '17px',
                fontWeight: '700',
                color: selectedVehicle?.Id === vehicle.Id ? colors.speedBlue : colors.charcoal,
                lineHeight: '1.2',
                letterSpacing: '-0.3px'
              }}>
                {vehicle.Make} {vehicle.Model}
              </h3>

              <p style={{
                margin: '0 0 12px 0',
                fontSize: '12px',
                color: colors.warmGray,
                fontFamily: 'monospace',
                letterSpacing: '0.5px'
              }}>
                VIN: {vehicle.VIN.substring(0, 10)}...
              </p>

              {/* Vehicle Info Icons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                paddingTop: '12px',
                borderTop: `1px solid ${selectedVehicle?.Id === vehicle.Id ? colors.sand : 'transparent'}`
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
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {vehicle.Year}
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
                    <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {(vehicle.Mileage / 1000).toFixed(0)}K mi
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Vehicle Details */}
      <div style={{
        flex: 1,
        background: colors.warmWhite,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {selectedVehicle ? (
          <>
            {/* Hero Header */}
            <div style={{
              padding: '48px 56px',
              background: `
                linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)
              `,
              borderBottom: `2px solid ${colors.sand}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Speedometer Arc Decoration */}
              <svg style={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: '300px',
                height: '300px',
                opacity: 0.06
              }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke={colors.engineRed} strokeWidth="2"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke={colors.speedBlue} strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="30" fill="none" stroke={colors.sunsetOrange} strokeWidth="1"/>
              </svg>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Status Pill */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 24px',
                  background: colors.warmWhite,
                  border: `2px solid ${getStatusColor(selectedVehicle.Status)}40`,
                  borderRadius: '24px',
                  marginBottom: '24px',
                  boxShadow: `0 4px 16px ${getStatusColor(selectedVehicle.Status)}15`
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: getStatusColor(selectedVehicle.Status),
                    boxShadow: `0 0 12px ${getStatusColor(selectedVehicle.Status)}`
                  }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: getStatusColor(selectedVehicle.Status),
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    {selectedVehicle.Status}
                  </span>
                </div>

                <h1 style={{
                  margin: '0 0 8px 0',
                  fontSize: '42px',
                  fontWeight: '700',
                  color: colors.charcoal,
                  letterSpacing: '-1px',
                  lineHeight: '1.1'
                }}>
                  {selectedVehicle.Make}
                </h1>

                <h2 style={{
                  margin: '0 0 20px 0',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: colors.speedBlue,
                  letterSpacing: '-0.5px'
                }}>
                  {selectedVehicle.Model}
                </h2>

                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: colors.warmGray,
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}>
                  VIN: {selectedVehicle.VIN}
                </p>

                {/* Racing Stripes Decoration */}
                <div style={{
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '100px',
                    height: '5px',
                    background: `linear-gradient(90deg, ${colors.engineRed}, ${colors.sunsetOrange})`,
                    borderRadius: '2px',
                    boxShadow: `0 2px 8px ${colors.engineRed}30`
                  }} />
                  <div style={{
                    width: '60px',
                    height: '4px',
                    background: colors.speedBlue,
                    borderRadius: '2px'
                  }} />
                  <div style={{
                    width: '30px',
                    height: '3px',
                    background: colors.activeGreen,
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
                  background: `linear-gradient(135deg, ${colors.speedBlue}, ${colors.chrome})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 16px ${colors.speedBlue}40`,
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${colors.speedBlue}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 16px ${colors.speedBlue}40`;
                }}>
                  Edit Vehicle
                </button>
                <button style={{
                  padding: '14px 28px',
                  background: colors.warmWhite,
                  color: colors.engineRed,
                  border: `2px solid ${colors.sand}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.engineRed;
                  e.currentTarget.style.background = `${colors.engineRed}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.sand;
                  e.currentTarget.style.background = colors.warmWhite;
                }}>
                  Remove
                </button>
              </div>

              {/* Vehicle Specs Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {/* Year Card */}
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
                    top: -30,
                    right: -30,
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colors.speedBlue}10, transparent)`
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
                      Model Year
                    </div>
                    <div style={{
                      fontSize: '48px',
                      fontWeight: '800',
                      color: colors.speedBlue,
                      lineHeight: '1',
                      marginBottom: '8px',
                      letterSpacing: '-2px'
                    }}>
                      {selectedVehicle.Year}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: colors.warmGray,
                      fontWeight: '500'
                    }}>
                      {new Date().getFullYear() - selectedVehicle.Year} years old
                    </div>
                  </div>
                </div>

                {/* Mileage Card */}
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
                    top: -30,
                    right: -30,
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colors.engineRed}10, transparent)`
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
                      Odometer
                    </div>
                    <div style={{
                      fontSize: '38px',
                      fontWeight: '800',
                      color: colors.engineRed,
                      lineHeight: '1',
                      marginBottom: '8px',
                      letterSpacing: '-1px'
                    }}>
                      {selectedVehicle.Mileage.toLocaleString()}
                      <span style={{ fontSize: '20px', color: colors.warmGray, fontWeight: '600' }}> mi</span>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: colors.warmGray,
                      fontWeight: '500'
                    }}>
                      {(selectedVehicle.Mileage * 1.60934).toFixed(0)} km
                    </div>
                  </div>
                </div>

                {/* Purchase Date */}
                {selectedVehicle.CommissioningDate && (
                  <div style={{
                    gridColumn: '1 / -1',
                    padding: '32px',
                    background: `linear-gradient(135deg, ${colors.activeGreen}08, ${colors.activeGreen}15)`,
                    border: `2px solid ${colors.activeGreen}30`,
                    borderRadius: '16px'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: colors.activeGreen,
                      marginBottom: '12px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Purchase Date
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: colors.charcoal,
                      letterSpacing: '-0.5px'
                    }}>
                      {Formatters.formatDate(selectedVehicle.CommissioningDate)}
                    </div>
                  </div>
                )}
              </div>

              {/* Gauge Visualization */}
              <div style={{
                padding: '32px',
                background: `linear-gradient(135deg, ${colors.roadGray}05, ${colors.chrome}10)`,
                borderRadius: '16px',
                border: `1px solid ${colors.sand}`,
                textAlign: 'center'
              }}>
                {/* Speedometer-style gauge */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 24px',
                  borderRadius: '50%',
                  border: `8px solid ${colors.sand}`,
                  background: `conic-gradient(
                    ${colors.activeGreen} 0deg,
                    ${colors.maintenanceOrange} 120deg,
                    ${colors.engineRed} 240deg,
                    ${colors.sand} 240deg
                  )`,
                  position: 'relative',
                  boxShadow: '0 8px 32px rgba(45, 42, 38, 0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: '16px',
                    borderRadius: '50%',
                    background: colors.warmWhite,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: colors.charcoal
                  }}>
                    {Math.round((selectedVehicle.Mileage / 150000) * 100)}%
                  </div>
                </div>
                <div style={{
                  fontSize: '15px',
                  color: colors.warmGray,
                  fontWeight: '600'
                }}>
                  Lifecycle Status
                </div>
                <div style={{
                  marginTop: '8px',
                  fontSize: '13px',
                  color: colors.lightGray
                }}>
                  Based on {selectedVehicle.Mileage.toLocaleString()} miles
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
            flexDirection: 'column',
            padding: '40px'
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.sand}, ${colors.cream})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              border: `3px solid ${colors.warmWhite}`,
              boxShadow: '0 8px 32px rgba(45, 42, 38, 0.08)'
            }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M12 32h40M8 40l8-8 8 8M40 40l8-8 8 8" stroke={colors.warmGray} strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: colors.charcoal,
              margin: '0 0 12px 0',
              letterSpacing: '-0.5px'
            }}>
              Select a Vehicle
            </h2>
            <p style={{
              fontSize: '16px',
              color: colors.warmGray,
              margin: 0,
              textAlign: 'center',
              maxWidth: '320px',
              lineHeight: '1.6'
            }}>
              Choose a vehicle from the fleet to view details and specifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
