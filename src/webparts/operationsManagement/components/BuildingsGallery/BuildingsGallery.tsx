// Buildings Gallery Component - Buildings list panel with inline styles

import * as React from 'react';
import { SearchBox, Toggle, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { useDataContext } from '../Context';
import { BuildingCard } from './BuildingCard';
import { IBuilding } from '../../models/IBuilding';
import { AppConstants } from '../../models/Constants';

export const BuildingsGallery: React.FC = () => {
  const { state, actions } = useDataContext();
  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout | undefined>(undefined);

  // Load buildings on mount
  React.useEffect(() => {
    actions.loadBuildings().catch((error) => {
      console.error('Failed to load buildings:', error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Handle search with debounce
  const handleSearch = (value?: string): void => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      actions.setSearchQuery(value || '');
    }, AppConstants.SEARCH_DEBOUNCE_MS);

    setSearchTimeout(timeout);
  };

  // Handle building selection
  const handleBuildingClick = (building: IBuilding): void => {
    actions.selectBuilding(building).catch((error) => {
      console.error('Failed to select building:', error);
    });
  };

  // Handle show deleted toggle
  const handleShowDeletedChange = (_ev?: React.FormEvent<HTMLElement>, checked?: boolean): void => {
    actions.setShowDeleted(checked || false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#F3F4F6', // Softer gray background
      borderRight: '1px solid #8AB4F8', // Blue border
      position: 'relative'
    }}>
      {/* Header - Sticky & Glassmorphic */}
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(66, 133, 244, 0.2)', // Slight blue tint for header border too
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '700',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}>
            Buildings
          </h2>
        </div>

        <button
          onClick={actions.openAddDialog}
          style={{
            width: '100%',
            padding: '12px 20px',
            background: '#4285F4', // Solid Blue
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.background = '#3367D6'; // Darker blue on hover
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(66, 133, 244, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#4285F4';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.3)';
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span>
          Add Building
        </button>
      </div>

      {/* Search Section */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <SearchBox
          placeholder="Search buildings..."
          onChange={(_ev, value) => handleSearch(value)}
          styles={{
            root: {
              marginBottom: '12px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              height: '40px'
            },
            iconContainer: { color: '#6B7280' }
          }}
        />
        <Toggle
          label="Show deleted"
          checked={state.showDeleted}
          onChange={handleShowDeletedChange}
          styles={{
            root: { margin: 0 },
            label: { fontWeight: '500', color: '#4B5563' }
          }}
        />
      </div>

      {/* Error Message */}
      {state.error && (
        <div style={{ margin: '16px 20px' }}>
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={actions.clearError}
            dismissButtonAriaLabel="Close"
          >
            {state.error}
          </MessageBar>
        </div>
      )}

      {/* Loading Spinner */}
      {state.isLoading && state.buildings.length === 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
          flex: 1
        }}>
          <Spinner size={SpinnerSize.large} label={AppConstants.MSG_LOADING} />
        </div>
      )}

      {/* Empty State */}
      {!state.isLoading && state.filteredBuildings.length === 0 && (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#6B7280',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '8px',
            opacity: 0.5
          }}>🏢</div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#374151' }}>No buildings found</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>{AppConstants.MSG_NO_BUILDINGS}</p>
        </div>
      )}

      {/* Building List */}
      {state.filteredBuildings.length > 0 && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px'
        }}>
          {state.filteredBuildings.map((building) => (
            <BuildingCard
              key={building.Id}
              building={building}
              isSelected={state.selectedBuilding?.Id === building.Id}
              onClick={handleBuildingClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
