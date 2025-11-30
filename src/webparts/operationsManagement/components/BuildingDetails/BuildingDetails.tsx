// Building Details Component - Right panel with Details/Documents tabs

import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { useDataContext } from '../Context';
import { DetailsTab } from './DetailsTab';
import { DocumentsTab } from './DocumentsTab';

export const BuildingDetails: React.FC = () => {
  const { state, actions } = useDataContext();
  const { selectedBuilding, activeTab } = state;

  if (!selectedBuilding) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#605e5c'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 8px 0'
        }}>
          Select a building
        </h2>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Choose a building from the list to view details
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      {/* Building Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #edebe9',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{
          margin: '0 0 4px 0',
          fontSize: '24px',
          fontWeight: '600',
          color: '#323130'
        }}>
          {selectedBuilding.PropertyName}
        </h2>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#605e5c'
        }}>
          {selectedBuilding.Address}
        </p>
      </div>

      {/* Tabs */}
      <Pivot
        selectedKey={activeTab}
        onLinkClick={(item) => {
          if (item && item.props.itemKey) {
            actions.setActiveTab(item.props.itemKey as 'details' | 'documents');
          }
        }}
        styles={{
          root: {
            borderBottom: '1px solid #edebe9',
            paddingLeft: '24px'
          }
        }}
      >
        <PivotItem headerText="Details" itemKey="details" itemIcon="Info" />
        <PivotItem headerText="Documents" itemKey="documents" itemIcon="Documentation" />
      </Pivot>

      {/* Tab Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px'
      }}>
        {activeTab === 'details' && <DetailsTab building={selectedBuilding} />}
        {activeTab === 'documents' && <DocumentsTab building={selectedBuilding} />}
      </div>
    </div>
  );
};
