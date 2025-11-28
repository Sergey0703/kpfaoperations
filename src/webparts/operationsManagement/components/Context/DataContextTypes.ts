// Data Context Types - State and Actions for React Context API

import { IBuilding } from '../../models/IBuilding';
import { IDocument, IDocumentFormData } from '../../models/IDocument';

// ========== State Interface ==========

export interface IDataContextState {
  // Data
  buildings: IBuilding[];
  selectedBuilding: IBuilding | undefined;
  filteredBuildings: IBuilding[];
  documents: IDocument[];

  // UI State
  showDeleted: boolean;
  searchQuery: string;
  isLoading: boolean;
  error: string | undefined;
  activeTab: 'details' | 'documents';

  // Dialog States
  isAddEditDialogOpen: boolean;
  isUploadDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  editingBuilding: IBuilding | undefined;

  // Upload Progress
  uploadProgress: number;
}

// ========== Actions Interface ==========

export interface IDataContextActions {
  // Building Actions
  loadBuildings: () => Promise<void>;
  selectBuilding: (building: IBuilding | undefined) => Promise<void>;
  addBuilding: (building: Partial<IBuilding>) => Promise<void>;
  updateBuilding: (id: number, building: Partial<IBuilding>) => Promise<void>;
  deleteBuilding: (id: number) => Promise<void>;

  // Search and Filter
  setSearchQuery: (query: string) => void;
  setShowDeleted: (show: boolean) => void;

  // Document Actions
  uploadDocument: (data: IDocumentFormData) => Promise<void>;
  downloadDocument: (document: IDocument) => Promise<void>;
  deleteDocument: (id: number) => Promise<void>;

  // UI Actions
  setActiveTab: (tab: 'details' | 'documents') => void;
  openAddDialog: () => void;
  openEditDialog: (building: IBuilding) => void;
  closeAddEditDialog: () => void;
  openDeleteDialog: (building: IBuilding) => void;
  closeDeleteDialog: () => void;
  openUploadDialog: () => void;
  closeUploadDialog: () => void;
  clearError: () => void;
}

// ========== Combined Context Interface ==========

export interface IDataContext {
  state: IDataContextState;
  actions: IDataContextActions;
}

// ========== Initial State ==========

export const initialState: IDataContextState = {
  buildings: [],
  selectedBuilding: undefined,
  filteredBuildings: [],
  documents: [],
  showDeleted: false,
  searchQuery: '',
  isLoading: false,
  error: undefined,
  activeTab: 'details',
  isAddEditDialogOpen: false,
  isUploadDialogOpen: false,
  isDeleteDialogOpen: false,
  editingBuilding: undefined,
  uploadProgress: 0
};
