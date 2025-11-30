// Add/Edit Building Dialog - Form for creating and editing buildings

import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  TextField,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import { IBuilding } from '../../models/IBuilding';
import { useDataContext } from '../Context';

export interface IAddEditBuildingDialogProps {
  isOpen: boolean;
  building?: IBuilding;
  onDismiss: () => void;
}

export const AddEditBuildingDialog: React.FC<IAddEditBuildingDialogProps> = ({
  isOpen,
  building,
  onDismiss
}) => {
  const { state, actions } = useDataContext();
  const { isLoading, error } = state;

  const isEditMode = !!building;

  // Form state
  const [propertyName, setPropertyName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [yearBuilt, setYearBuilt] = React.useState('');
  const [area, setArea] = React.useState('');

  // Validation errors
  const [nameError, setNameError] = React.useState<string | undefined>();
  const [addressError, setAddressError] = React.useState<string | undefined>();
  const [yearError, setYearError] = React.useState<string | undefined>();
  const [areaError, setAreaError] = React.useState<string | undefined>();

  // Initialize form with building data when editing
  React.useEffect(() => {
    if (building) {
      setPropertyName(building.PropertyName);
      setAddress(building.Address);
      setYearBuilt(building.YearBuilt?.toString() || '');
      setArea(building.AreaSquareFootage?.toString() || '');
    } else {
      // Reset form for add mode
      setPropertyName('');
      setAddress('');
      setYearBuilt('');
      setArea('');
    }
    // Clear errors
    setNameError(undefined);
    setAddressError(undefined);
    setYearError(undefined);
    setAreaError(undefined);
  }, [building, isOpen]);

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate property name
    if (!propertyName.trim()) {
      setNameError('Property name is required');
      isValid = false;
    } else if (propertyName.trim().length < 3) {
      setNameError('Property name must be at least 3 characters');
      isValid = false;
    } else {
      setNameError(undefined);
    }

    // Validate address
    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError(undefined);
    }

    // Validate year built
    const year = parseInt(yearBuilt, 10);
    if (!yearBuilt || isNaN(year)) {
      setYearError('Year built is required');
      isValid = false;
    } else if (year < 1700 || year > new Date().getFullYear() + 5) {
      setYearError('Please enter a valid year');
      isValid = false;
    } else {
      setYearError(undefined);
    }

    // Validate area
    const areaNum = parseFloat(area);
    if (!area || isNaN(areaNum)) {
      setAreaError('Area is required');
      isValid = false;
    } else if (areaNum <= 0) {
      setAreaError('Area must be greater than 0');
      isValid = false;
    } else {
      setAreaError(undefined);
    }

    return isValid;
  };

  const handleSave = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    const buildingData: Partial<IBuilding> = {
      PropertyName: propertyName.trim(),
      Address: address.trim(),
      YearBuilt: parseInt(yearBuilt, 10),
      AreaSquareFootage: parseFloat(area)
    };

    try {
      if (isEditMode && building?.Id) {
        await actions.updateBuilding(building.Id, buildingData);
      } else {
        await actions.addBuilding(buildingData);
      }
      onDismiss();
    } catch (err) {
      // Error is handled in context
      console.error('Save failed:', err);
    }
  };

  const dialogContentProps = {
    type: DialogType.normal,
    title: isEditMode ? 'Edit Building' : 'Add New Building',
    subText: isEditMode
      ? 'Update the building information below'
      : 'Enter the details for the new building'
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={dialogContentProps}
      minWidth={500}
      maxWidth={600}
    >
      <div style={{ padding: '8px 0' }}>
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={actions.clearError}
            dismissButtonAriaLabel="Close"
            style={{ marginBottom: '16px' }}
          >
            {error}
          </MessageBar>
        )}

        <TextField
          label="Property Name"
          required
          placeholder="Enter property name"
          value={propertyName}
          onChange={(_, newValue) => setPropertyName(newValue || '')}
          errorMessage={nameError}
          disabled={isLoading}
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        <TextField
          label="Address"
          required
          placeholder="Enter full address"
          value={address}
          onChange={(_, newValue) => setAddress(newValue || '')}
          errorMessage={addressError}
          disabled={isLoading}
          multiline
          rows={2}
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        <TextField
          label="Year Built"
          required
          placeholder="e.g., 1950"
          value={yearBuilt}
          onChange={(_, newValue) => setYearBuilt(newValue || '')}
          errorMessage={yearError}
          disabled={isLoading}
          type="number"
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        <TextField
          label="Area (Square Feet)"
          required
          placeholder="e.g., 45000"
          value={area}
          onChange={(_, newValue) => setArea(newValue || '')}
          errorMessage={areaError}
          disabled={isLoading}
          type="number"
          styles={{
            root: { marginBottom: '16px' }
          }}
        />
      </div>

      <DialogFooter>
        {isLoading ? (
          <Spinner size={SpinnerSize.medium} label="Saving..." />
        ) : (
          <>
            <PrimaryButton
              text={isEditMode ? 'Update' : 'Create'}
              onClick={handleSave}
              disabled={isLoading}
            />
            <DefaultButton
              text="Cancel"
              onClick={onDismiss}
              disabled={isLoading}
            />
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
};
