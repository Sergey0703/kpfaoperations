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
    warmGray: '#6B6660',
    skyBlue: '#6BA3C8',
    deepTeal: '#4A7C8F'
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
      {/* Compact Header - Just Title */}
      <div style={{
        padding: '24px 20px 20px',
        background: `linear-gradient(135deg, ${colors.deepTeal} 0%, ${colors.skyBlue} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Organic shapes in background */}
        <svg style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: '120px',
          height: '120px',
          opacity: 0.15
        }}>
          <circle cx="60" cy="60" r="50" fill="white" />
          <circle cx="80" cy="40" r="30" fill="white" />
        </svg>

        <div style={{
          position: 'relative',
          zIndex: 1,
          color: 'white'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1.5px',
            opacity: 0.85,
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Property Portfolio
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            Buildings
          </h2>
          <div style={{
            marginTop: '12px',
            height: '3px',
            width: '60px',
            background: colors.terracotta,
            borderRadius: '2px'
          }} />
        </div>
      </div>

      {/* Search + Add Button Row */}
      <div style={{
        padding: '16px',
        background: colors.warmWhite,
        borderBottom: `1px solid ${colors.sand}`
      }}>
        {/* Search + Button in one row */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder="Search properties..."
              onChange={(_ev, value) => handleSearch(value)}
              styles={{
                root: {
                  borderRadius: '8px',
                  border: `2px solid ${colors.sand}`,
                  height: '42px',
                  background: colors.cream,
                  transition: 'all 0.2s ease'
                },
                iconContainer: { color: colors.warmGray },
                field: {
                  color: colors.charcoal,
                  fontSize: '14px'
                }
              }}
            />
          </div>

          <button
            onClick={actions.openAddDialog}
            style={{
              padding: '0 20px',
              background: `linear-gradient(135deg, ${colors.terracotta} 0%, ${colors.terracotta}dd 100%)`,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: `0 4px 12px rgba(212, 115, 90, 0.25)`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              height: '42px',
              minWidth: '110px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 6px 16px rgba(212, 115, 90, 0.35)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px rgba(212, 115, 90, 0.25)`;
            }}
          >
            {/* SVG Plus Icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add
          </button>
        </div>

        <Toggle
          label="Show deleted"
          checked={state.showDeleted}
          onChange={handleShowDeletedChange}
          styles={{
            root: { margin: 0 },
            label: { fontWeight: '500', color: colors.charcoal, fontSize: '13px' }
          }}
        />
      </div>

      {/* Error Message */}
      {state.error && (
        <div style={{ margin: '16px 16px 0' }}>
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
          padding: '16px 12px'
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
