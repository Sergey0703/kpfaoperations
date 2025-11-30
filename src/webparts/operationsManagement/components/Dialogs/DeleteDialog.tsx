// Delete Dialog - Confirmation dialog for deleting buildings

import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import { IBuilding } from '../../models/IBuilding';
import { useDataContext } from '../Context';

export interface IDeleteDialogProps {
  isOpen: boolean;
  building?: IBuilding;
  onDismiss: () => void;
}

export const DeleteDialog: React.FC<IDeleteDialogProps> = ({
  isOpen,
  building,
  onDismiss
}) => {
  const { state, actions } = useDataContext();
  const { isLoading, error } = state;

  const handleDelete = async (): Promise<void> => {
    if (!building?.Id) return;

    try {
      await actions.deleteBuilding(building.Id);
      onDismiss();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Delete Building',
    subText: building
      ? `Are you sure you want to delete "${building.PropertyName}"? This action will mark the building as deleted.`
      : 'Are you sure you want to delete this building?'
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={dialogContentProps}
      minWidth={450}
      maxWidth={500}
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

        {building && (
          <div style={{
            backgroundColor: '#fef6f6',
            border: '1px solid #fde7e9',
            borderRadius: '4px',
            padding: '12px',
            marginTop: '12px'
          }}>
            <div style={{
              fontSize: '13px',
              color: '#605e5c',
              marginBottom: '8px'
            }}>
              <strong>Building Details:</strong>
            </div>
            <div style={{
              fontSize: '13px',
              color: '#323130'
            }}>
              <div><strong>Property:</strong> {building.PropertyName}</div>
              <div><strong>Address:</strong> {building.Address}</div>
            </div>
          </div>
        )}

        <div style={{
          fontSize: '13px',
          color: '#605e5c',
          marginTop: '16px',
          fontStyle: 'italic'
        }}>
          Note: This is a soft delete. The building will be marked as deleted but can be restored later if needed.
        </div>
      </div>

      <DialogFooter>
        {isLoading ? (
          <Spinner size={SpinnerSize.medium} label="Deleting..." />
        ) : (
          <>
            <PrimaryButton
              text="Delete"
              onClick={handleDelete}
              disabled={isLoading}
              styles={{
                root: {
                  backgroundColor: '#d13438',
                  borderColor: '#d13438'
                },
                rootHovered: {
                  backgroundColor: '#a4262c',
                  borderColor: '#a4262c'
                }
              }}
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
