// Data Context Provider - Centralized State Management

import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { IDataContext, IDataContextState, IDataContextActions, initialState } from './DataContextTypes';
import { IBuilding } from '../../models/IBuilding';
import { IDocument, IDocumentFormData } from '../../models/IDocument';
import { IDataService } from '../../services/IDataService';
import { ServiceFactory } from '../../services/ServiceFactory';
import { Logger } from '../../utils/Logger';
import { AppConstants } from '../../models/Constants';

// ========== Context Creation ==========

const DataContext = React.createContext<IDataContext | undefined>(undefined);

// ========== Provider Props ==========

export interface IDataProviderProps {
  context: WebPartContext;
  children: React.ReactNode;
}

// ========== Provider Component ==========

export const DataProvider: React.FC<IDataProviderProps> = ({ context, children }) => {
  const [state, setState] = React.useState<IDataContextState>(initialState);
  const dataServiceRef = React.useRef<IDataService | undefined>(undefined);

  // ========== Helper Functions ==========

  const filterBuildings = React.useCallback((): void => {
    let filtered = [...state.buildings];

    // Filter by deleted flag
    if (!state.showDeleted) {
      filtered = filtered.filter(b => !b.Deleted);
    }

    // Filter by search query
    if (state.searchQuery.trim().length > 0) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.PropertyName.toLowerCase().includes(query) ||
        b.Address.toLowerCase().includes(query)
      );
    }

    setState(prev => ({ ...prev, filteredBuildings: filtered }));
  }, [state.buildings, state.searchQuery, state.showDeleted]);

  const setError = React.useCallback((error: string): void => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  }, []);

  // Initialize service on mount
  React.useEffect(() => {
    const initializeService = async (): Promise<void> => {
      try {
        Logger.log('Initializing DataContext');
        const service = ServiceFactory.getService(context);
        await service.initialize();
        dataServiceRef.current = service;
        Logger.log('DataContext initialized');
      } catch (error) {
        Logger.error('Failed to initialize DataContext', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to initialize application'
        }));
      }
    };

    initializeService().catch((error) => {
      Logger.error('Initialization failed', error);
    });
  }, [context]);

  // Filter buildings when search query or showDeleted changes
  React.useEffect(() => {
    filterBuildings();
  }, [filterBuildings]);

  // ========== Building Actions ==========

  const loadBuildings = async (): Promise<void> => {
    if (!dataServiceRef.current) {
      setError('Service not initialized');
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined }));
      Logger.log('Loading buildings');

      const buildings = await dataServiceRef.current.getBuildings(true); // Include deleted

      setState(prev => ({
        ...prev,
        buildings,
        isLoading: false
      }));

      Logger.log(`Loaded ${buildings.length} buildings`);
    } catch (error) {
      Logger.error('Error loading buildings', error);
      setError(AppConstants.MSG_SAVE_ERROR);
    }
  };

  const selectBuilding = async (building: IBuilding | undefined): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      setState(prev => ({
        ...prev,
        selectedBuilding: building,
        documents: [],
        activeTab: 'details',
        isLoading: building ? true : false,
        error: undefined
      }));

      if (building) {
        Logger.log('Loading documents for building', { buildingId: building.Id });
        const documents = await dataServiceRef.current.getDocumentsByBuilding(building.Id!);

        setState(prev => ({
          ...prev,
          documents,
          isLoading: false
        }));

        Logger.log(`Loaded ${documents.length} documents`);
      }
    } catch (error) {
      Logger.error('Error loading documents', error);
      setError('Failed to load documents');
    }
  };

  const addBuilding = async (building: Partial<IBuilding>): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined }));
      Logger.log('Creating building', building);

      const newBuilding = await dataServiceRef.current.createBuilding(building);

      setState(prev => ({
        ...prev,
        buildings: [...prev.buildings, newBuilding],
        selectedBuilding: newBuilding,
        isLoading: false,
        isAddEditDialogOpen: false
      }));

      Logger.log('Building created successfully', { id: newBuilding.Id });

      // Load documents for new building (will be empty)
      await selectBuilding(newBuilding);
    } catch (error) {
      Logger.error('Error creating building', error);
      setError(AppConstants.MSG_SAVE_ERROR);
    }
  };

  const updateBuilding = async (id: number, building: Partial<IBuilding>): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined }));
      Logger.log('Updating building', { id, building });

      const updatedBuilding = await dataServiceRef.current.updateBuilding(id, building);

      setState(prev => ({
        ...prev,
        buildings: prev.buildings.map(b => b.Id === id ? updatedBuilding : b),
        selectedBuilding: prev.selectedBuilding?.Id === id ? updatedBuilding : prev.selectedBuilding,
        isLoading: false,
        isAddEditDialogOpen: false
      }));

      Logger.log('Building updated successfully');
    } catch (error) {
      Logger.error('Error updating building', error);
      setError(AppConstants.MSG_SAVE_ERROR);
    }
  };

  const deleteBuilding = async (id: number): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined }));
      Logger.log('Deleting building (soft delete)', { id });

      await dataServiceRef.current.deleteBuilding(id, true); // Soft delete

      // Reload buildings to get updated state
      await loadBuildings();

      setState(prev => ({
        ...prev,
        selectedBuilding: undefined,
        documents: [],
        isLoading: false,
        isDeleteDialogOpen: false
      }));

      Logger.log('Building deleted successfully');
    } catch (error) {
      Logger.error('Error deleting building', error);
      setError(AppConstants.MSG_DELETE_ERROR);
    }
  };

  // ========== Search and Filter Actions ==========

  const setSearchQuery = (query: string): void => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const setShowDeleted = (show: boolean): void => {
    setState(prev => ({ ...prev, showDeleted: show }));
  };

  // ========== Document Actions ==========

  const uploadDocument = async (data: IDocumentFormData): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined, uploadProgress: 0 }));
      Logger.log('Uploading document', { fileName: data.file.name });

      const onProgress = (progress: number): void => {
        setState(prev => ({ ...prev, uploadProgress: progress }));
      };

      const newDocument = await dataServiceRef.current.uploadDocument(data, onProgress);

      setState(prev => ({
        ...prev,
        documents: [...prev.documents, newDocument],
        isLoading: false,
        isUploadDialogOpen: false,
        uploadProgress: 0
      }));

      Logger.log('Document uploaded successfully', { id: newDocument.Id });
    } catch (error) {
      Logger.error('Error uploading document', error);
      setError(AppConstants.MSG_UPLOAD_ERROR);
      setState(prev => ({ ...prev, uploadProgress: 0 }));
    }
  };

  const downloadDocument = async (document: IDocument): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      Logger.log('Downloading document', { id: document.Id });

      const blob = await dataServiceRef.current.downloadDocument(document.Id!);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.FileName;
      link.click();
      window.URL.revokeObjectURL(url);

      Logger.log('Document downloaded successfully');
    } catch (error) {
      Logger.error('Error downloading document', error);
      setError('Failed to download document');
    }
  };

  const deleteDocument = async (id: number): Promise<void> => {
    if (!dataServiceRef.current) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: undefined }));
      Logger.log('Deleting document', { id });

      await dataServiceRef.current.deleteDocument(id);

      setState(prev => ({
        ...prev,
        documents: prev.documents.filter(d => d.Id !== id),
        isLoading: false
      }));

      Logger.log('Document deleted successfully');
    } catch (error) {
      Logger.error('Error deleting document', error);
      setError('Failed to delete document');
    }
  };

  // ========== UI Actions ==========

  const setActiveTab = (tab: 'details' | 'documents'): void => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const openAddDialog = (): void => {
    setState(prev => ({
      ...prev,
      isAddEditDialogOpen: true,
      editingBuilding: undefined
    }));
  };

  const openEditDialog = (building: IBuilding): void => {
    setState(prev => ({
      ...prev,
      isAddEditDialogOpen: true,
      editingBuilding: building
    }));
  };

  const closeAddEditDialog = (): void => {
    setState(prev => ({
      ...prev,
      isAddEditDialogOpen: false,
      editingBuilding: undefined
    }));
  };

  const openDeleteDialog = (building: IBuilding): void => {
    setState(prev => ({
      ...prev,
      isDeleteDialogOpen: true,
      editingBuilding: building
    }));
  };

  const closeDeleteDialog = (): void => {
    setState(prev => ({
      ...prev,
      isDeleteDialogOpen: false,
      editingBuilding: undefined
    }));
  };

  const openUploadDialog = (): void => {
    setState(prev => ({ ...prev, isUploadDialogOpen: true }));
  };

  const closeUploadDialog = (): void => {
    setState(prev => ({ ...prev, isUploadDialogOpen: false, uploadProgress: 0 }));
  };

  const clearError = (): void => {
    setState(prev => ({ ...prev, error: undefined }));
  };

  // ========== Actions Object ==========

  const actions: IDataContextActions = {
    loadBuildings,
    selectBuilding,
    addBuilding,
    updateBuilding,
    deleteBuilding,
    setSearchQuery,
    setShowDeleted,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    setActiveTab,
    openAddDialog,
    openEditDialog,
    closeAddEditDialog,
    openDeleteDialog,
    closeDeleteDialog,
    openUploadDialog,
    closeUploadDialog,
    clearError
  };

  // ========== Context Value ==========

  const contextValue: IDataContext = {
    state,
    actions
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// ========== Custom Hook ==========

export const useDataContext = (): IDataContext => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within DataProvider');
  }
  return context;
};
