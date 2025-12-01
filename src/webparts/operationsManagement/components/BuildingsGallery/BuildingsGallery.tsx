// Buildings Gallery Component - Warm Modern Style

import * as React from 'react';
import { SearchBox, Toggle, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { useDataContext } from '../Context';
import { BuildingCard } from './BuildingCard';
import { IBuilding } from '../../models/IBuilding';
import { AppConstants } from '../../models/Constants';

export const BuildingsGallery: React.FC = () => {
  const { state, actions } = useDataContext();
  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout | undefined>(undefined);

  // Warm Modern Color Palette
  const colors = {
    cream: '#F5F1E8',
    terracotta: '#D4735A',
    sand: '#E8DCC4',
    warmWhite: '#FDFCFA',
    charcoal: '#2D2A26',
    warmGray: '#6B6660'
  };

  // Load buildings on mount
  React.useEffect(() => {
    actions.loadBuildings().catch((error) => {
      console.error('Failed to load buildings:', error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Auto-select first building when filteredBuildings changes and no building is selected
  React.useEffect(() => {
    if (!state.selectedBuilding && state.filteredBuildings.length > 0) {
      actions.selectBuilding(state.filteredBuildings[0]).catch((error) => {
        console.error('Failed to auto-select first building:', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filteredBuildings, state.selectedBuilding]);

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
      background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.sand}40 100%)`,
      borderRight: `1px solid ${colors.sand}`,
      position: 'relative',
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 20px',
        background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
        borderBottom: `1px solid ${colors.sand}`,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: colors.charcoal,
            letterSpacing: '-0.01em'
          }}>
            Buildings
          </h2>
        </div>

        <button
          onClick={actions.openAddDialog}
          style={{
            width: '100%',
            padding: '14px 20px',
            background: `linear-gradient(135deg, ${colors.terracotta} 0%, ${colors.terracotta}dd 100%)`,
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: `0 4px 16px rgba(212, 115, 90, 0.25)`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 20px rgba(212, 115, 90, 0.35)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 16px rgba(212, 115, 90, 0.25)`;
          }}
        >
          {/* SVG Plus Icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Building
        </button>
      </div>

      {/* Search Section */}
      <div style={{
        padding: '16px 20px',
        background: colors.warmWhite,
        borderBottom: `1px solid ${colors.sand}`
      }}>
        <SearchBox
          placeholder="Search buildings..."
          onChange={(_ev, value) => handleSearch(value)}
          styles={{
            root: {
              marginBottom: '12px',
              borderRadius: '10px',
              border: `1px solid ${colors.sand}`,
              height: '42px',
              background: colors.warmWhite
            },
            iconContainer: { color: colors.warmGray }
          }}
        />
        <Toggle
          label="Show deleted"
          checked={state.showDeleted}
          onChange={handleShowDeletedChange}
          styles={{
            root: { margin: 0 },
            label: { fontWeight: '500', color: colors.charcoal }
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
          color: colors.warmGray,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* SVG Building Icon */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.4 }}>
            <rect x="12" y="16" width="40" height="40" rx="4" stroke={colors.charcoal} strokeWidth="2"/>
            <path d="M12 24h40M20 16v40M32 16v40M44 16v40" stroke={colors.charcoal} strokeWidth="2"/>
            <rect x="24" y="32" width="6" height="8" fill={colors.charcoal}/>
            <rect x="34" y="32" width="6" height="8" fill={colors.charcoal}/>
          </svg>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: colors.charcoal }}>No buildings found</h3>
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
