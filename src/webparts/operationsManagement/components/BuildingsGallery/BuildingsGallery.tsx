// Buildings Gallery Component - Left panel with building list

import * as React from 'react';
import { SearchBox, PrimaryButton, Toggle, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { useDataContext } from '../Context';
import { BuildingCard } from './BuildingCard';
import { IBuilding } from '../../models/IBuilding';
import { AppConstants } from '../../models/Constants';
import styles from './BuildingsGallery.module.scss';

export const BuildingsGallery: React.FC = () => {
  const { state, actions } = useDataContext();
  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout | undefined>(undefined);

  // Load buildings on mount
  React.useEffect(() => {
    actions.loadBuildings().catch((error) => {
      console.error('Failed to load buildings:', error);
    });
  }, [actions]);

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
    <div className={styles.buildingsGallery}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Buildings</h2>
        <PrimaryButton
          text="Add Building"
          iconProps={{ iconName: 'Add' }}
          onClick={actions.openAddDialog}
          className={styles.addButton}
        />
      </div>

      {/* Search */}
      <div className={styles.searchSection}>
        <SearchBox
          placeholder="Search buildings..."
          onChange={(_ev, value) => handleSearch(value)}
          className={styles.searchBox}
        />
        <Toggle
          label="Show deleted"
          checked={state.showDeleted}
          onChange={handleShowDeletedChange}
          className={styles.toggle}
        />
      </div>

      {/* Error Message */}
      {state.error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={actions.clearError}
          dismissButtonAriaLabel="Close"
          className={styles.errorMessage}
        >
          {state.error}
        </MessageBar>
      )}

      {/* Loading Spinner */}
      {state.isLoading && state.buildings.length === 0 && (
        <div className={styles.loadingContainer}>
          <Spinner size={SpinnerSize.large} label={AppConstants.MSG_LOADING} />
        </div>
      )}

      {/* Building List */}
      {!state.isLoading && state.filteredBuildings.length === 0 && (
        <div className={styles.emptyState}>
          <p>{AppConstants.MSG_NO_BUILDINGS}</p>
        </div>
      )}

      {state.filteredBuildings.length > 0 && (
        <div className={styles.buildingsList}>
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
