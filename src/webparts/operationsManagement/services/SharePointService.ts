// SharePoint Service Implementation using PnPjs

import { SPFI, spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/files';
import '@pnp/sp/folders';
import '@pnp/sp/fields';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { IDataService } from './IDataService';
import { IBuilding } from '../models/IBuilding';
import { IDocument, IDocumentFormData } from '../models/IDocument';
import { DocumentStatus } from '../models/Enums';
import { AppConstants } from '../models/Constants';
import { Logger } from '../utils/Logger';

export class SharePointService implements IDataService {
  private sp: SPFI;
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async initialize(): Promise<void> {
    try {
      this.sp = spfi().using(SPFx(this.context));
      Logger.log('SharePointService initialized');
    } catch (error) {
      Logger.error('Failed to initialize SharePointService', error);
      throw new Error('Failed to initialize data service');
    }
  }

  // ========== Buildings Operations ==========

  public async getBuildings(includeDeleted: boolean = false): Promise<IBuilding[]> {
    try {
      Logger.log('Getting buildings', { includeDeleted });

      let items = this.sp.web.lists
        .getByTitle(AppConstants.BUILDINGS_LIST)
        .items
        .select(
          'Id',
          'Title',
          'Address',
          'YearBuilt',
          'AreaSquareFootage',
          'Deleted',
          'Created',
          'Modified',
          'Author/Title',
          'Author/Email',
          'Editor/Title',
          'Editor/Email'
        )
        .expand('Author', 'Editor');

      if (!includeDeleted) {
        items = items.filter(`${AppConstants.FIELD_DELETED} ne 1`);
      }

      const results = await items.orderBy('Title', true)();

      const buildings: IBuilding[] = results.map(item => this.mapToBuilding(item));
      Logger.log(`Retrieved ${buildings.length} buildings`);
      return buildings;
    } catch (error) {
      Logger.error('Error getting buildings', error);
      throw new Error('Failed to load buildings');
    }
  }

  public async getBuildingById(id: number): Promise<IBuilding> {
    try {
      Logger.log('Getting building by ID', { id });

      const item = await this.sp.web.lists
        .getByTitle(AppConstants.BUILDINGS_LIST)
        .items
        .getById(id)
        .select(
          'Id',
          'Title',
          'Address',
          'YearBuilt',
          'AreaSquareFootage',
          'Deleted',
          'Created',
          'Modified',
          'Author/Title',
          'Author/Email',
          'Editor/Title',
          'Editor/Email'
        )
        .expand('Author', 'Editor')();

      return this.mapToBuilding(item);
    } catch (error) {
      Logger.error('Error getting building', error);
      throw new Error('Failed to load building');
    }
  }

  public async createBuilding(building: Partial<IBuilding>): Promise<IBuilding> {
    try {
      Logger.log('Creating building', building);

      const itemData = {
        Title: building.PropertyName,
        Address: building.Address,
        YearBuilt: building.YearBuilt,
        AreaSquareFootage: building.AreaSquareFootage,
        Deleted: false
      };

      const result = await this.sp.web.lists
        .getByTitle(AppConstants.BUILDINGS_LIST)
        .items
        .add(itemData);

      Logger.log('Building created', { id: result.data.Id });
      return await this.getBuildingById(result.data.Id);
    } catch (error) {
      Logger.error('Error creating building', error);
      throw new Error('Failed to create building');
    }
  }

  public async updateBuilding(id: number, building: Partial<IBuilding>): Promise<IBuilding> {
    try {
      Logger.log('Updating building', { id, building });

      const itemData: Record<string, string | number | boolean> = {};
      if (building.PropertyName !== undefined) itemData.Title = building.PropertyName;
      if (building.Address !== undefined) itemData.Address = building.Address;
      if (building.YearBuilt !== undefined) itemData.YearBuilt = building.YearBuilt;
      if (building.AreaSquareFootage !== undefined) itemData.AreaSquareFootage = building.AreaSquareFootage;
      if (building.Deleted !== undefined) itemData.Deleted = building.Deleted;

      await this.sp.web.lists
        .getByTitle(AppConstants.BUILDINGS_LIST)
        .items
        .getById(id)
        .update(itemData);

      Logger.log('Building updated', { id });
      return await this.getBuildingById(id);
    } catch (error) {
      Logger.error('Error updating building', error);
      throw new Error('Failed to update building');
    }
  }

  public async deleteBuilding(id: number, softDelete: boolean = true): Promise<void> {
    try {
      Logger.log('Deleting building', { id, softDelete });

      if (softDelete) {
        await this.sp.web.lists
          .getByTitle(AppConstants.BUILDINGS_LIST)
          .items
          .getById(id)
          .update({ Deleted: true });
        Logger.log('Building soft deleted', { id });
      } else {
        await this.sp.web.lists
          .getByTitle(AppConstants.BUILDINGS_LIST)
          .items
          .getById(id)
          .delete();
        Logger.log('Building permanently deleted', { id });
      }
    } catch (error) {
      Logger.error('Error deleting building', error);
      throw new Error('Failed to delete building');
    }
  }

  public async searchBuildings(query: string, includeDeleted: boolean = false): Promise<IBuilding[]> {
    try {
      Logger.log('Searching buildings', { query, includeDeleted });

      if (!query || query.trim().length === 0) {
        return await this.getBuildings(includeDeleted);
      }

      const searchTerm = query.trim();
      let filterQuery = `(substringof('${searchTerm}', Title) or substringof('${searchTerm}', Address))`;

      if (!includeDeleted) {
        filterQuery += ` and (${AppConstants.FIELD_DELETED} ne 1)`;
      }

      const results = await this.sp.web.lists
        .getByTitle(AppConstants.BUILDINGS_LIST)
        .items
        .select(
          'Id',
          'Title',
          'Address',
          'YearBuilt',
          'AreaSquareFootage',
          'Deleted',
          'Created',
          'Modified',
          'Author/Title',
          'Author/Email',
          'Editor/Title',
          'Editor/Email'
        )
        .expand('Author', 'Editor')
        .filter(filterQuery)
        .orderBy('Title', true)();

      const buildings: IBuilding[] = results.map(item => this.mapToBuilding(item));
      Logger.log(`Found ${buildings.length} buildings matching query`);
      return buildings;
    } catch (error) {
      Logger.error('Error searching buildings', error);
      throw new Error('Failed to search buildings');
    }
  }

  // ========== Documents Operations ==========

  public async getDocumentsByBuilding(buildingId: number): Promise<IDocument[]> {
    try {
      Logger.log('Getting documents for building', { buildingId });

      const results = await this.sp.web.lists
        .getByTitle(AppConstants.DOCUMENTS_LIBRARY)
        .items
        .select(
          'Id',
          'FileLeafRef',
          'Title',
          'BuildingId',
          'Building/Title',
          'DocumentType',
          'DocumentDate',
          'Description',
          'Status',
          'FileRef',
          'File/Length',
          'Created',
          'Author/Title',
          'Author/Email'
        )
        .expand('Building', 'File', 'Author')
        .filter(`BuildingId eq ${buildingId} and Status ne '${DocumentStatus.Deleted}'`)
        .orderBy('Created', false)();

      const documents: IDocument[] = results.map(item => this.mapToDocument(item));
      Logger.log(`Retrieved ${documents.length} documents`);
      return documents;
    } catch (error) {
      Logger.error('Error getting documents', error);
      throw new Error('Failed to load documents');
    }
  }

  public async uploadDocument(
    data: IDocumentFormData,
    onProgress?: (progress: number) => void
  ): Promise<IDocument> {
    try {
      Logger.log('Uploading document', { fileName: data.file.name, buildingId: data.buildingId });

      if (onProgress) onProgress(10);

      // Upload file to document library
      const fileName = data.file.name;
      const fileBuffer = await this.readFileAsArrayBuffer(data.file);

      if (onProgress) onProgress(30);

      // Upload the file
      const folderResult = await this.sp.web.lists
        .getByTitle(AppConstants.DOCUMENTS_LIBRARY)
        .rootFolder();

      await this.sp.web.getFolderByServerRelativePath(folderResult.ServerRelativeUrl)
        .files
        .addUsingPath(fileName, fileBuffer, { Overwrite: true });

      if (onProgress) onProgress(60);

      // Get the file's list item
      const file = this.sp.web.getFileByServerRelativePath(folderResult.ServerRelativeUrl + '/' + fileName);
      const itemResult = await file.getItem<{ Id: number }>();

      // Update item metadata
      await itemResult.update({
        Title: data.title,
        BuildingId: data.buildingId,
        DocumentType: data.documentType,
        DocumentDate: data.documentDate,
        Description: data.description,
        Status: DocumentStatus.Active
      });

      if (onProgress) onProgress(90);

      // Get the created document with all fields
      const docItem = await this.sp.web.lists
        .getByTitle(AppConstants.DOCUMENTS_LIBRARY)
        .items
        .getById(itemResult.Id)
        .select(
          'Id',
          'FileLeafRef',
          'Title',
          'BuildingId',
          'Building/Title',
          'DocumentType',
          'DocumentDate',
          'Description',
          'Status',
          'FileRef',
          'File/Length',
          'Created',
          'Author/Title',
          'Author/Email'
        )
        .expand('Building', 'File', 'Author')();

      if (onProgress) onProgress(100);

      Logger.log('Document uploaded successfully', { id: docItem.Id });
      return this.mapToDocument(docItem);
    } catch (error) {
      Logger.error('Error uploading document', error);
      throw new Error('Failed to upload document');
    }
  }

  public async deleteDocument(id: number): Promise<void> {
    try {
      Logger.log('Deleting document', { id });

      // Mark as deleted (soft delete)
      await this.sp.web.lists
        .getByTitle(AppConstants.DOCUMENTS_LIBRARY)
        .items
        .getById(id)
        .update({ Status: DocumentStatus.Deleted });

      Logger.log('Document deleted', { id });
    } catch (error) {
      Logger.error('Error deleting document', error);
      throw new Error('Failed to delete document');
    }
  }

  public async downloadDocument(id: number): Promise<Blob> {
    try {
      Logger.log('Downloading document', { id });

      const item = await this.sp.web.lists
        .getByTitle(AppConstants.DOCUMENTS_LIBRARY)
        .items
        .getById(id)
        .select('FileRef')();

      const fileUrl = item.FileRef;
      const file = this.sp.web.getFileByServerRelativePath(fileUrl);
      const blob = await file.getBlob();

      Logger.log('Document downloaded');
      return blob;
    } catch (error) {
      Logger.error('Error downloading document', error);
      throw new Error('Failed to download document');
    }
  }

  public async getDocumentById(id: number): Promise<IDocument> {
    try {
      Logger.log('Getting document by ID', { id });

      const item = await this.sp.web.lists
        .getByTitle(AppConstants.DOCUMENTS_LIBRARY)
        .items
        .getById(id)
        .select(
          'Id',
          'FileLeafRef',
          'Title',
          'BuildingId',
          'Building/Title',
          'DocumentType',
          'DocumentDate',
          'Description',
          'Status',
          'FileRef',
          'File/Length',
          'Created',
          'Author/Title',
          'Author/Email'
        )
        .expand('Building', 'File', 'Author')();

      return this.mapToDocument(item);
    } catch (error) {
      Logger.error('Error getting document', error);
      throw new Error('Failed to load document');
    }
  }

  // ========== Helper Methods ==========

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToBuilding(item: any): IBuilding {
    return {
      Id: item.Id,
      PropertyName: item.Title,
      Address: item.Address,
      YearBuilt: item.YearBuilt,
      AreaSquareFootage: item.AreaSquareFootage,
      Deleted: item.Deleted || false,
      Created: item.Created ? new Date(item.Created) : undefined,
      Modified: item.Modified ? new Date(item.Modified) : undefined,
      Author: item.Author ? {
        Title: item.Author.Title,
        Email: item.Author.Email
      } : undefined,
      Editor: item.Editor ? {
        Title: item.Editor.Title,
        Email: item.Editor.Email
      } : undefined
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToDocument(item: any): IDocument {
    const fileName = item.FileLeafRef || '';
    const extension = this.getFileExtension(fileName);

    return {
      Id: item.Id,
      FileName: fileName,
      Title: item.Title || fileName,
      BuildingId: item.BuildingId,
      BuildingName: item.Building?.Title,
      DocumentType: item.DocumentType,
      DocumentDate: item.DocumentDate ? new Date(item.DocumentDate) : new Date(),
      Description: item.Description || '',
      Status: item.Status,
      FileUrl: item.FileRef,
      FileSize: item.File?.Length,
      FileExtension: extension,
      Created: item.Created ? new Date(item.Created) : undefined,
      Author: item.Author ? {
        Title: item.Author.Title,
        Email: item.Author.Email
      } : undefined
    };
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : '';
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}
