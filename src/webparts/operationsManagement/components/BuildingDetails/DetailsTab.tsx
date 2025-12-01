// Details Tab - Shows building information

import * as React from 'react';
import { PrimaryButton, DefaultButton, Stack, DatePicker, DayOfWeek } from '@fluentui/react';
import { IBuilding } from '../../models/IBuilding';
import { useDataContext } from '../Context';
import { Formatters } from '../../utils/Formatters';
import { ColorScheme } from '../../styles/ColorScheme';

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
      <Stack horizontal tokens={{ childrenGap: 8 }} style={{ marginBottom: '24px' }}>
        <PrimaryButton
          text="Edit Building"
          iconProps={{ iconName: 'Edit' }}
          onClick={handleEdit}
          styles={ColorScheme.getOutlinedButtonStyles()}
        />
        <DefaultButton
          text="Delete"
          iconProps={{ iconName: 'Delete' }}
          onClick={handleDelete}
          styles={{
            root: {
              color: '#d13438',
              border: '1px solid #edebe9'
            },
            rootHovered: {
              color: '#a4262c',
              backgroundColor: '#FEE2E2'
            }
          }}
        />
      </Stack>

      {/* Building Information - Grid Layout */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: ColorScheme.borderRadius,
        border: '1px solid #edebe9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827'
        }}>
          Building Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Property Name */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#605e5c',
              marginBottom: '4px',
              textTransform: 'uppercase'
            }}>
              Property Name
            </label>
            <div style={{
              fontSize: '14px',
              color: '#323130'
            }}>
              {building.PropertyName}
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#605e5c',
              marginBottom: '4px',
              textTransform: 'uppercase'
            }}>
              Address
            </label>
            <div style={{
              fontSize: '14px',
              color: '#323130'
            }}>
              {building.Address}
            </div>
          </div>

          {/* Year Built & Area - Two columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#605e5c',
                marginBottom: '4px',
                textTransform: 'uppercase'
              }}>
                Year Built
              </label>
              <div style={{
                fontSize: '14px',
                color: '#323130'
              }}>
                {building.YearBuilt}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#605e5c',
                marginBottom: '4px',
                textTransform: 'uppercase'
              }}>
                Area
              </label>
              <div style={{
                fontSize: '14px',
                color: '#323130'
              }}>
                {Formatters.formatArea(building.AreaSquareFootage)}
              </div>
            </div>
          </div>

          {/* Commissioning Date - Full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#605e5c',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Дата начала эксплуатации
            </label>
            <DatePicker
              value={building.CommissioningDate ? new Date(building.CommissioningDate) : undefined}
              onSelectDate={handleCommissioningDateChange}
              firstDayOfWeek={DayOfWeek.Monday}
              placeholder="Выберите дату"
              ariaLabel="Выберите дату начала эксплуатации"
              formatDate={(date) => date ? Formatters.formatDate(date) : ''}
              styles={{
                root: { maxWidth: '300px' },
                textField: {
                  fieldGroup: {
                    borderRadius: '6px',
                    border: '1px solid #edebe9'
                  }
                }
              }}
            />
          </div>

          {/* Metadata */}
          {building.Created && (
            <div style={{
              marginTop: '8px',
              paddingTop: '16px',
              borderTop: '1px solid #edebe9'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#8a8886',
                marginBottom: '4px'
              }}>
                Created: {Formatters.formatDateTime(building.Created)}
                {building.Author && ` by ${Formatters.formatPerson(building.Author)}`}
              </div>
              {building.Modified && (
                <div style={{
                  fontSize: '12px',
                  color: '#8a8886'
                }}>
                  Modified: {Formatters.formatDateTime(building.Modified)}
                  {building.Editor && ` by ${Formatters.formatPerson(building.Editor)}`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
