// Details Tab - Warm Modern Style

import * as React from 'react';
import { Stack, DatePicker, DayOfWeek } from '@fluentui/react';
import { IBuilding } from '../../models/IBuilding';
import { useDataContext } from '../Context';
import { Formatters } from '../../utils/Formatters';

export interface IDetailsTabProps {
  building: IBuilding;
}

export const DetailsTab: React.FC<IDetailsTabProps> = ({ building }) => {
  const { actions } = useDataContext();

  // Warm Modern Color Palette
  const colors = {
    cream: '#F5F1E8',
    terracotta: '#D4735A',
    sage: '#8B9D83',
    skyBlue: '#6BA3C8',
    sand: '#E8DCC4',
    warmWhite: '#FDFCFA',
    charcoal: '#2D2A26',
    warmGray: '#6B6660',
    lightGray: '#9B9690'
  };

  const handleEdit = (): void => {
    actions.openEditDialog(building);
  };

  const handleDelete = (): void => {
    actions.openDeleteDialog(building);
  };

  const handleCommissioningDateChange = (date: Date | null | undefined): void => {
    if (date && building.Id) {
      // Update building with new commissioning date
      actions.updateBuilding(building.Id, {
        CommissioningDate: date
      }).catch((error) => {
        console.error('Failed to update commissioning date:', error);
      });
    }
  };

  return (
    <div style={{ fontFamily: '"Inter", -apple-system, system-ui, sans-serif' }}>
      {/* Action Buttons */}
      <Stack horizontal tokens={{ childrenGap: 12 }} style={{ marginBottom: '32px' }}>
        <button
          onClick={handleEdit}
          style={{
            padding: '16px 32px',
            background: colors.skyBlue,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: 'none',
            letterSpacing: '0.2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '44px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          {/* SVG Edit Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Edit Building
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            color: colors.terracotta,
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '44px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.terracotta;
            e.currentTarget.style.background = `${colors.terracotta}08`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E0E0E0';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {/* SVG Trash Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Delete
        </button>
      </Stack>

      {/* Information Grid with Large Metrics */}
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
              {building.YearBuilt}
            </div>
            <div style={{
              fontSize: '14px',
              color: colors.warmGray,
              fontWeight: '500'
            }}>
              {new Date().getFullYear() - building.YearBuilt} years of history
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
              {building.AreaSquareFootage.toLocaleString()}
              <span style={{ fontSize: '20px', color: colors.warmGray, fontWeight: '600' }}> ft²</span>
            </div>
            <div style={{
              fontSize: '14px',
              color: colors.warmGray,
              fontWeight: '500'
            }}>
              {(building.AreaSquareFootage * 0.092903).toFixed(0)} m² metric
            </div>
          </div>
        </div>

        {/* Commissioning Date - Full Width */}
        {building.CommissioningDate && (
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
              {Formatters.formatDate(building.CommissioningDate)}
            </div>
          </div>
        )}
      </div>

      {/* Visual Separator */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${colors.sand}, transparent)`,
        margin: '40px 0 32px'
      }} />

      {/* Additional Details Card */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(45, 42, 38, 0.06)',
        border: `1px solid ${colors.sand}`,
        position: 'relative'
      }}>
        {/* Decorative corner accent */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.terracotta}08 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        <h3 style={{
          margin: '0 0 24px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: colors.charcoal,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          position: 'relative'
        }}>
          {/* SVG Info Icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke={colors.terracotta} strokeWidth="1.5" />
            <path d="M10 10v4M10 6h.01" stroke={colors.terracotta} strokeWidth="2" strokeLinecap="round" />
          </svg>
          Property Details
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {/* Property Name */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              color: colors.warmGray,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Property Name
            </label>
            <div style={{
              fontSize: '16px',
              color: colors.charcoal,
              fontWeight: '600'
            }}>
              {building.PropertyName}
            </div>
          </div>

          {/* Address */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              color: colors.warmGray,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Address
            </label>
            <div style={{
              fontSize: '16px',
              color: colors.charcoal,
              fontWeight: '500'
            }}>
              {building.Address}
            </div>
          </div>

          {/* Commissioning Date Editor */}
          <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              color: colors.warmGray,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Update Commissioning Date
            </label>
            <div style={{ maxWidth: '300px' }}>
              <DatePicker
                value={building.CommissioningDate ? new Date(building.CommissioningDate) : undefined}
                onSelectDate={handleCommissioningDateChange}
                firstDayOfWeek={DayOfWeek.Monday}
                placeholder="Select date"
                ariaLabel="Select commissioning date"
                formatDate={(date) => date ? Formatters.formatDate(date) : ''}
                styles={{
                  root: {
                    borderRadius: '10px',
                    selectors: {
                      '.ms-TextField-fieldGroup': {
                        borderRadius: '10px',
                        border: `2px solid ${colors.sand}`,
                        height: '44px',
                        background: colors.warmWhite,
                        transition: 'all 0.2s ease'
                      },
                      '.ms-TextField-fieldGroup:hover': {
                        borderColor: colors.sage
                      },
                      '.ms-TextField-field': {
                        color: colors.charcoal
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Metadata Footer */}
        {building.Created && (
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: `1px solid ${colors.sand}`,
            fontSize: '12px',
            color: colors.warmGray,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div>
              Created {Formatters.formatDateTime(building.Created)}
              {building.Author && <span style={{ color: colors.charcoal, fontWeight: '500' }}> • {Formatters.formatPerson(building.Author)}</span>}
            </div>
            {building.Modified && (
              <div>
                Modified {Formatters.formatDateTime(building.Modified)}
                {building.Editor && <span style={{ color: colors.charcoal, fontWeight: '500' }}> • {Formatters.formatPerson(building.Editor)}</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
