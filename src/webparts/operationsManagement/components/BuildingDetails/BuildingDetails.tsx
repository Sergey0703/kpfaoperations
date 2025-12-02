// Building Details Component - Warm Modern Style

import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { useDataContext } from '../Context';
import { DetailsTab } from './DetailsTab';
import { DocumentsTab } from './DocumentsTab';

export const BuildingDetails: React.FC = () => {
  const { state, actions } = useDataContext();
  const { selectedBuilding, activeTab } = state;

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

  if (!selectedBuilding) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: colors.warmGray,
        background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.sand}40 100%)`,
        gap: '16px',
        fontFamily: '"Inter", -apple-system, system-ui, sans-serif'
      }}>
        {/* SVG Building Icon */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ opacity: 0.3 }}>
          <rect x="20" y="24" width="40" height="40" rx="4" stroke={colors.charcoal} strokeWidth="2.5" />
          <path d="M20 32h40M28 24v40M40 24v40M52 24v40" stroke={colors.charcoal} strokeWidth="2.5" />
          <rect x="32" y="40" width="6" height="10" fill={colors.charcoal} />
          <rect x="42" y="40" width="6" height="10" fill={colors.charcoal} />
        </svg>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          margin: 0,
          color: colors.charcoal
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
      background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.sand}40 100%)`,
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif'
    }}>
      {/* Building Header */}
      <div style={{
        padding: '40px 40px 32px',
        background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
        position: 'relative'
      }}>
        {/* Decorative circular elements */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 40,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.terracotta}08 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: 60,
          right: 80,
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.sage}06 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        <h2 style={{
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '600',
          color: colors.charcoal,
          letterSpacing: '-0.01em',
          position: 'relative'
        }}>
          {selectedBuilding.PropertyName}
        </h2>

        <p style={{
          margin: '4px 0 0 0',
          fontSize: '16px',
          fontWeight: '500',
          color: colors.warmGray,
          position: 'relative'
        }}>
          {selectedBuilding.Address}
        </p>

        {/* Decorative line accent */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '80px',
            height: '4px',
            background: `linear-gradient(90deg, ${colors.terracotta}, #C17B5A)`,
            borderRadius: '2px'
          }} />
          <div style={{
            width: '40px',
            height: '4px',
            background: colors.skyBlue,
            borderRadius: '2px'
          }} />
          <div style={{
            width: '20px',
            height: '4px',
            background: colors.sage,
            borderRadius: '2px'
          }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: colors.warmWhite,
        paddingLeft: '24px',
        borderBottom: `1px solid ${colors.sand}`
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
            link: {
              height: '48px',
              fontSize: '14px',
              fontWeight: '600',
              color: colors.warmGray,
              selectors: {
                ':hover': {
                  color: colors.charcoal,
                  backgroundColor: `${colors.sand}40`
                }
              }
            },
            linkIsSelected: {
              height: '48px',
              fontSize: '14px',
              fontWeight: '700',
              color: colors.skyBlue,
              selectors: {
                '::before': {
                  height: '3px',
                  backgroundColor: colors.skyBlue
                }
              }
            }
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
