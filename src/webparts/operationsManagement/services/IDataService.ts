// Data Service Interface - Abstraction for future Azure Database migration

import { IBuilding } from '../models/IBuilding';
import { IDocument, IDocumentFormData } from '../models/IDocument';

export interface IDataService {
  /**
   * Initialize the service (setup context, connections, etc.)
   */
  initialize(): Promise<void>;

  // ========== Buildings Operations ==========

  /**
   * Get all buildings
   * @param includeDeleted - Include soft-deleted buildings
   * @returns Array of buildings
   */
  getBuildings(includeDeleted?: boolean): Promise<IBuilding[]>;

  /**
   * Get a single building by ID
   * @param id - Building ID
   * @returns Building object
   */
  getBuildingById(id: number): Promise<IBuilding>;

  /**
   * Create a new building
   * @param building - Building data (without ID)
   * @returns Created building with ID
   */
  createBuilding(building: Partial<IBuilding>): Promise<IBuilding>;

  /**
   * Update an existing building
   * @param id - Building ID
   * @param building - Updated building data
   * @returns Updated building
   */
  updateBuilding(id: number, building: Partial<IBuilding>): Promise<IBuilding>;

  /**
   * Delete a building (soft or hard delete)
   * @param id - Building ID
   * @param softDelete - If true, mark as deleted; if false, permanently delete
   */
  deleteBuilding(id: number, softDelete?: boolean): Promise<void>;

  /**
   * Search buildings by query (name or address)
   * @param query - Search query string
   * @param includeDeleted - Include soft-deleted buildings
   * @returns Filtered array of buildings
   */
  searchBuildings(query: string, includeDeleted?: boolean): Promise<IBuilding[]>;

  // ========== Documents Operations ==========

  /**
   * Get all documents for a specific building
   * @param buildingId - Building ID
   * @returns Array of documents
   */
  getDocumentsByBuilding(buildingId: number): Promise<IDocument[]>;

  /**
   * Upload a new document with metadata
   * @param data - Document form data (file + metadata)
   * @param onProgress - Optional progress callback (0-100)
   * @returns Created document object
   */
  uploadDocument(
    data: IDocumentFormData,
    onProgress?: (progress: number) => void
  ): Promise<IDocument>;

  /**
   * Delete a document
   * @param id - Document ID
   */
  deleteDocument(id: number): Promise<void>;

  /**
   * Download a document
   * @param id - Document ID
   * @returns File blob
   */
  downloadDocument(id: number): Promise<Blob>;

  /**
   * Get document metadata without downloading
   * @param id - Document ID
   * @returns Document object
   */
  getDocumentById(id: number): Promise<IDocument>;
}
