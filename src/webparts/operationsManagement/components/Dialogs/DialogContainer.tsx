// Dialog Container - Manages all dialogs with context

import * as React from 'react';
import { AddEditBuildingDialog } from './AddEditBuildingDialog';
import { UploadDocumentDialog } from './UploadDocumentDialog';
import { DeleteDialog } from './DeleteDialog';
import { useDataContext } from '../Context';

export const DialogContainer: React.FC = () => {
  const { state, actions } = useDataContext();

  return (
    <>
      <AddEditBuildingDialog
        isOpen={state.isAddEditDialogOpen}
        building={state.editingBuilding}
        onDismiss={actions.closeAddEditDialog}
      />

      <UploadDocumentDialog
        isOpen={state.isUploadDialogOpen}
        onDismiss={actions.closeUploadDialog}
      />

      <DeleteDialog
        isOpen={state.isDeleteDialogOpen}
        building={state.editingBuilding}
        onDismiss={actions.closeDeleteDialog}
      />
    </>
  );
};
