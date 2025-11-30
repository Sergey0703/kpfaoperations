// Buildings Gallery Component - Buildings list panel with inline styles

import * as React from 'react';
import { SearchBox, Toggle, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { useDataContext } from '../Context';
import { BuildingCard } from './BuildingCard';
import { IBuilding } from '../../models/IBuilding';
import { AppConstants } from '../../models/Constants';
import { ColorScheme } from '../../styles/ColorScheme';

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
      backgroundColor: '#faf9f8',
      borderRight: '1px solid #edebe9'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #edebe9'
      }}>
        <h2 style={{
          margin: '0 0 12px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#323130'
        }}>
          Buildings
        </h2>
        <button
          onClick={actions.openAddDialog}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#111827',
            border: '1px solid transparent',
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
              ${ColorScheme.primaryGradientBorder}
            `,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(66, 133, 244, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
          Add Building
        </button>
      </div>

      {/* Search Section */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #edebe9'
      }}>
        <SearchBox
          placeholder="Search buildings..."
          onChange={(_ev, value) => handleSearch(value)}
          styles={{
            root: { marginBottom: '12px' }
          }}
        />
        <Toggle
          label="Show deleted"
          checked={state.showDeleted}
          onChange={handleShowDeletedChange}
          styles={{
            root: { margin: 0 }
          }}
        />
      </div>

      {/* Error Message */}
      {state.error && (
        <div style={{ margin: '12px 16px' }}>
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
          padding: '40px 16px'
        }}>
          <Spinner size={SpinnerSize.large} label={AppConstants.MSG_LOADING} />
        </div>
      )}

      {/* Empty State */}
      {!state.isLoading && state.filteredBuildings.length === 0 && (
        <div style={{
          padding: '40px 16px',
          textAlign: 'center',
          color: '#605e5c',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0 }}>{AppConstants.MSG_NO_BUILDINGS}</p>
        </div>
      )}

      {/* Building List */}
      {state.filteredBuildings.length > 0 && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px'
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
