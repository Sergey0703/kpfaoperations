// Details Tab - Shows building information

import * as React from 'react';
import { PrimaryButton, DefaultButton, Stack } from '@fluentui/react';
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

  return (
    <div>
      {/* Action Buttons */}
      <Stack horizontal tokens={{ childrenGap: 8 }} style={{ marginBottom: '24px' }}>
        <PrimaryButton
          text="Edit Building"
          iconProps={{ iconName: 'Edit' }}
          onClick={handleEdit}
        />
        <DefaultButton
          text="Delete"
          iconProps={{ iconName: 'Delete' }}
          onClick={handleDelete}
          styles={{
            root: { color: '#d13438' },
            rootHovered: { color: '#a4262c' }
          }}
        />
      </Stack>

      {/* Building Information */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '4px',
        border: '1px solid #edebe9'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#323130'
        }}>
          Building Information
        </h3>

        <div style={{ display: 'grid', gap: '16px' }}>
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
