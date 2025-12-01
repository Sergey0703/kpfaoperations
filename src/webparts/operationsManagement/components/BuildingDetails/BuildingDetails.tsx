// Building Details Component - Right panel with Details/Documents tabs

import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { useDataContext } from '../Context';
import { DetailsTab } from './DetailsTab';
import { DocumentsTab } from './DocumentsTab';
import { ColorScheme } from '../../styles/ColorScheme';

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
        color: '#6B7280',
        backgroundColor: '#F9FAFB',
        gap: '16px'
      }}>
        <div style={{ fontSize: '64px', opacity: 0.2 }}>🏢</div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: 0,
          color: '#374151'
        }}>
          Select a building
        </h2>
        <p style={{ fontSize: '15px', margin: 0 }}>
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
      backgroundColor: '#F9FAFB' // Light gray background for the whole panel
    }}>
      {/* Building Header with Rainbow Underline */}
      <div style={{
        padding: '32px 40px',
        background: '#ffffff',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        zIndex: 5
      }}>
        {/* Rainbow underline */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: ColorScheme.primaryGradientBorder
        }} />

        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '800',
          color: '#111827',
          letterSpacing: '-0.02em'
        }}>
          {selectedBuilding.PropertyName}
        </h2>

        <p style={{
          margin: '4px 0 0 0',
          fontSize: '16px',
          fontWeight: '500',
          color: '#6B7280'
        }}>
          {selectedBuilding.Address}
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        backgroundColor: '#ffffff',
        paddingLeft: '24px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <Pivot
          selectedKey={activeTab}
          onLinkClick={(item) => {
            if (item && item.props.itemKey) {
              actions.setActiveTab(item.props.itemKey as 'details' | 'documents');
            }
          }}
          styles={{
            root: { height: '48px' },
            link: { height: '48px', fontSize: '14px', fontWeight: '600' },
            linkIsSelected: { height: '48px', fontSize: '14px', fontWeight: '700' }
          }}
        >
          <PivotItem headerText="Details" itemKey="details" itemIcon="Info" />
          <PivotItem headerText="Documents" itemKey="documents" itemIcon="Documentation" />
        </Pivot>
      </div>

      {/* Tab Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '32px 40px'
      }}>
        {activeTab === 'details' && <DetailsTab building={selectedBuilding} />}
        {activeTab === 'documents' && <DocumentsTab building={selectedBuilding} />}
      </div>
    </div>
  );
};
