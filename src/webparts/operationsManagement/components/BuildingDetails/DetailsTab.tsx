// Details Tab - Shows building information

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
    <div>
      {/* Action Buttons */}
      <Stack horizontal tokens={{ childrenGap: 12 }} style={{ marginBottom: '32px' }}>
        <button
          onClick={handleEdit}
          style={{
            background: '#ffffff',
            border: '1px solid #4285F4', // Blue border for better visibility
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#4285F4', // Blue text
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(66, 133, 244, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F0F7FF'; // Light blue background on hover
            e.currentTarget.style.borderColor = '#3367D6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#4285F4';
          }}
        >
          <span>✏️</span> Edit Building
        </button>

        <button
          onClick={handleDelete}
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#991B1B',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FEE2E2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FEF2F2';
          }}
        >
          <span>🗑️</span> Delete
        </button>
      </Stack>

      {/* Building Information Card */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(229, 231, 235, 0.5)'
      }}>
        <h3 style={{
          margin: '0 0 24px 0',
          fontSize: '18px',
          fontWeight: '700',
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          Building Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px 24px' }}>
          {/* Property Name */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '700',
              color: '#9CA3AF',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Property Name
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827',
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
              color: '#9CA3AF',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Address
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827',
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
              color: '#9CA3AF',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Year Built
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827',
              fontWeight: '500'
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
              color: '#9CA3AF',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Area
            </label>
            <div style={{
              fontSize: '16px',
              color: '#111827',
              fontWeight: '500'
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
              color: '#9CA3AF',
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
                    borderRadius: '8px',
                    selectors: {
                      '.ms-TextField-fieldGroup': {
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        height: '40px'
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
            borderTop: '1px solid #F3F4F6',
            fontSize: '12px',
            color: '#9CA3AF',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div>
              Created {Formatters.formatDateTime(building.Created)}
              {building.Author && <span style={{ color: '#6B7280' }}> • {Formatters.formatPerson(building.Author)}</span>}
            </div>
            {building.Modified && (
              <div>
                Modified {Formatters.formatDateTime(building.Modified)}
                {building.Editor && <span style={{ color: '#6B7280' }}> • {Formatters.formatPerson(building.Editor)}</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
