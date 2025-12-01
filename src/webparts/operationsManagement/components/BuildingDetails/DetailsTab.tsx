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
    warmGray: '#6B6660'
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
            background: colors.warmWhite,
            border: `2px solid ${colors.sage}`,
            borderRadius: '12px',
            padding: '12px 20px',
            color: colors.sage,
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: `0 2px 8px rgba(139, 157, 131, 0.15)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${colors.sage}15`;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 12px rgba(139, 157, 131, 0.25)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.warmWhite;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 2px 8px rgba(139, 157, 131, 0.15)`;
          }}
        >
          {/* SVG Edit Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit Building
        </button>

        <button
          onClick={handleDelete}
          style={{
            background: '#FEF2F2',
            border: '2px solid #FECACA',
            borderRadius: '12px',
            padding: '12px 20px',
            color: '#991B1B',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(153, 27, 27, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FEE2E2';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(153, 27, 27, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FEF2F2';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(153, 27, 27, 0.1)';
          }}
        >
          {/* SVG Trash Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Delete
        </button>
      </Stack>

      {/* Building Information Card */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(45, 42, 38, 0.08)',
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
            <circle cx="10" cy="10" r="8" stroke={colors.terracotta} strokeWidth="1.5"/>
            <path d="M10 10v4M10 6h.01" stroke={colors.terracotta} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Building Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px 24px' }}>
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
              fontWeight: '500'
            }}>
              {building.PropertyName}
            </div>
          </div>

          {/* Address */}
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

          {/* Year Built */}
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
              Year Built
            </label>
            <div style={{
              display: 'inline-block',
              fontSize: '16px',
              color: colors.charcoal,
              fontWeight: '600',
              background: `${colors.sand}60`,
              padding: '6px 14px',
              borderRadius: '8px',
              border: `1px solid ${colors.sand}`
            }}>
              {building.YearBuilt}
            </div>
          </div>

          {/* Area */}
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
              Area
            </label>
            <div style={{
              display: 'inline-block',
              fontSize: '16px',
              color: colors.charcoal,
              fontWeight: '600',
              background: `${colors.skyBlue}15`,
              padding: '6px 14px',
              borderRadius: '8px',
              border: `1px solid ${colors.skyBlue}40`
            }}>
              {Formatters.formatArea(building.AreaSquareFootage)}
            </div>
          </div>

          {/* Commissioning Date */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              color: colors.warmGray,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Commissioning Date
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
                        border: `1px solid ${colors.sand}`,
                        height: '42px',
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
