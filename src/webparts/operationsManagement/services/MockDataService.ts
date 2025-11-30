// Mock Data Service - For testing without SharePoint Lists

import { IDataService } from './IDataService';
import { IBuilding } from '../models/IBuilding';
import { IDocument, IDocumentFormData } from '../models/IDocument';
import { DocumentStatus, DocumentType } from '../models/Enums';
import { Logger } from '../utils/Logger';

export class MockDataService implements IDataService {
  private buildings: IBuilding[] = [];
  private documents: IDocument[] = [];
  private nextBuildingId = 7;
  private nextDocumentId = 4;

  public async initialize(): Promise<void> {
    Logger.log('MockDataService initialized');
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Mock Buildings
    this.buildings = [
      {
        Id: 1,
        PropertyName: 'The Gandon Building',
        Address: '15-19 Amiens St, Dublin 1',
        YearBuilt: 1878,
        AreaSquareFootage: 45000,
        Deleted: false,
        Created: new Date('2024-01-15'),
        Modified: new Date('2024-11-20'),
        Author: { Title: 'John Doe', Email: 'john@kpfa.org' },
        Editor: { Title: 'Jane Smith', Email: 'jane@kpfa.org' }
      },
      {
        Id: 2,
        PropertyName: 'Clarence House',
        Address: '7-11 Clarence St, Dublin 2',
        YearBuilt: 1925,
        AreaSquareFootage: 32500,
        Deleted: false,
        Created: new Date('2024-02-10'),
        Modified: new Date('2024-11-18')
      },
      {
        Id: 3,
        PropertyName: 'The Gasworks',
        Address: 'Barrow St, Dublin 4',
        YearBuilt: 1896,
        AreaSquareFootage: 78000,
        Deleted: false,
        Created: new Date('2024-03-05'),
        Modified: new Date('2024-11-25')
      },
      {
        Id: 4,
        PropertyName: 'Heuston South Quarter',
        Address: 'St. John\'s Road West, Dublin 8',
        YearBuilt: 2010,
        AreaSquareFootage: 125000,
        Deleted: false,
        Created: new Date('2024-04-12'),
        Modified: new Date('2024-11-22')
      },
      {
        Id: 5,
        PropertyName: 'Spencer Dock',
        Address: 'North Wall Quay, Dublin 1',
        YearBuilt: 2006,
        AreaSquareFootage: 95000,
        Deleted: false,
        Created: new Date('2024-05-20'),
        Modified: new Date('2024-11-15')
      },
      {
        Id: 6,
        PropertyName: 'Beacon Court (Deleted)',
        Address: 'Sandyford, Dublin 18',
        YearBuilt: 2000,
        AreaSquareFootage: 52000,
        Deleted: true,
        Created: new Date('2024-06-01'),
        Modified: new Date('2024-10-30')
      }
    ];

    // Mock Documents
    this.documents = [
      {
        Id: 1,
        FileName: 'gandon_contract_2024.pdf',
        Title: 'Maintenance Contract 2024',
        BuildingId: 1,
        BuildingName: 'The Gandon Building',
        DocumentType: DocumentType.Contract,
        DocumentDate: new Date('2024-01-15'),
        Description: 'Annual maintenance contract for HVAC and electrical systems',
        Status: DocumentStatus.Active,
        FileUrl: '/documents/gandon_contract_2024.pdf',
        FileSize: 245000,
        FileExtension: '.pdf',
        Created: new Date('2024-01-15'),
        Author: { Title: 'John Doe', Email: 'john@kpfa.org' }
      },
      {
        Id: 2,
        FileName: 'clarence_invoice_nov.pdf',
        Title: 'Repair Invoice - November',
        BuildingId: 2,
        BuildingName: 'Clarence House',
        DocumentType: DocumentType.Invoice,
        DocumentDate: new Date('2024-11-10'),
        Description: 'Roof repair and waterproofing work',
        Status: DocumentStatus.Active,
        FileUrl: '/documents/clarence_invoice_nov.pdf',
        FileSize: 128000,
        FileExtension: '.pdf',
        Created: new Date('2024-11-12'),
        Author: { Title: 'Jane Smith', Email: 'jane@kpfa.org' }
      },
      {
        Id: 3,
        FileName: 'gasworks_photo.jpg',
        Title: 'Building Exterior Photo',
        BuildingId: 3,
        BuildingName: 'The Gasworks',
        DocumentType: DocumentType.Photo,
        DocumentDate: new Date('2024-11-20'),
        Description: 'Updated exterior photo after renovation',
        Status: DocumentStatus.Active,
        FileUrl: '/documents/gasworks_photo.jpg',
        FileSize: 850000,
        FileExtension: '.jpg',
        Created: new Date('2024-11-20'),
        Author: { Title: 'Mike Johnson', Email: 'mike@kpfa.org' }
      }
    ];
  }

  // ========== Buildings Operations ==========

  public async getBuildings(includeDeleted: boolean = false): Promise<IBuilding[]> {
    await this.delay(500); // Simulate network delay
    Logger.log(`MockDataService: Getting buildings (includeDeleted=${includeDeleted})`);

    if (includeDeleted) {
      return [...this.buildings];
    }
    return this.buildings.filter(b => !b.Deleted);
  }

  public async getBuildingById(id: number): Promise<IBuilding> {
    await this.delay(300);
    const building = this.buildings.find(b => b.Id === id);
    if (!building) {
      throw new Error(`Building with id ${id} not found`);
    }
    return { ...building };
  }

  public async createBuilding(building: Partial<IBuilding>): Promise<IBuilding> {
    await this.delay(400);
    const newBuilding: IBuilding = {
      Id: this.nextBuildingId++,
      PropertyName: building.PropertyName || '',
      Address: building.Address || '',
      YearBuilt: building.YearBuilt || new Date().getFullYear(),
      AreaSquareFootage: building.AreaSquareFootage || 0,
      Deleted: false,
      Created: new Date(),
      Modified: new Date(),
      Author: { Title: 'Current User', Email: 'user@kpfa.org' }
    };
    this.buildings.push(newBuilding);
    Logger.log('MockDataService: Building created', { id: newBuilding.Id });
    return { ...newBuilding };
  }

  public async updateBuilding(id: number, building: Partial<IBuilding>): Promise<IBuilding> {
    await this.delay(400);
    const index = this.buildings.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error(`Building with id ${id} not found`);
    }

    this.buildings[index] = {
      ...this.buildings[index],
      ...building,
      Modified: new Date(),
      Editor: { Title: 'Current User', Email: 'user@kpfa.org' }
    };

    Logger.log('MockDataService: Building updated', { id });
    return { ...this.buildings[index] };
  }

  public async deleteBuilding(id: number, softDelete: boolean = true): Promise<void> {
    await this.delay(300);
    const index = this.buildings.findIndex(b => b.Id === id);
    if (index === -1) {
      throw new Error(`Building with id ${id} not found`);
    }

    if (softDelete) {
      this.buildings[index].Deleted = true;
      this.buildings[index].Modified = new Date();
      Logger.log('MockDataService: Building soft deleted', { id });
    } else {
      this.buildings.splice(index, 1);
      Logger.log('MockDataService: Building permanently deleted', { id });
    }
  }

  public async searchBuildings(query: string, includeDeleted: boolean = false): Promise<IBuilding[]> {
    await this.delay(300);
    const searchTerm = query.toLowerCase().trim();

    let filtered = includeDeleted
      ? [...this.buildings]
      : this.buildings.filter(b => !b.Deleted);

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.PropertyName.toLowerCase().includes(searchTerm) ||
        b.Address.toLowerCase().includes(searchTerm)
      );
    }

    Logger.log(`MockDataService: Search found ${filtered.length} buildings`);
    return filtered;
  }

  // ========== Documents Operations ==========

  public async getDocumentsByBuilding(buildingId: number): Promise<IDocument[]> {
    await this.delay(400);
    const docs = this.documents.filter(d =>
      d.BuildingId === buildingId && d.Status !== DocumentStatus.Deleted
    );
    Logger.log(`MockDataService: Found ${docs.length} documents for building ${buildingId}`);
    return docs.map(d => ({ ...d }));
  }

  public async uploadDocument(
    data: IDocumentFormData,
    onProgress?: (progress: number) => void
  ): Promise<IDocument> {
    // Simulate upload progress
    if (onProgress) {
      for (let i = 0; i <= 100; i += 20) {
        await this.delay(100);
        onProgress(i);
      }
    }

    const newDocument: IDocument = {
      Id: this.nextDocumentId++,
      FileName: data.file.name,
      Title: data.title,
      BuildingId: data.buildingId,
      BuildingName: this.buildings.find(b => b.Id === data.buildingId)?.PropertyName,
      DocumentType: data.documentType,
      DocumentDate: data.documentDate,
      Description: data.description,
      Status: DocumentStatus.Active,
      FileUrl: `/documents/${data.file.name}`,
      FileSize: data.file.size,
      FileExtension: this.getFileExtension(data.file.name),
      Created: new Date(),
      Author: { Title: 'Current User', Email: 'user@kpfa.org' }
    };

    this.documents.push(newDocument);
    Logger.log('MockDataService: Document uploaded', { id: newDocument.Id });
    return { ...newDocument };
  }

  public async deleteDocument(id: number): Promise<void> {
    await this.delay(300);
    const doc = this.documents.find(d => d.Id === id);
    if (doc) {
      doc.Status = DocumentStatus.Deleted;
      Logger.log('MockDataService: Document deleted', { id });
    }
  }

  public async downloadDocument(id: number): Promise<Blob> {
    await this.delay(500);
    // Return a mock blob
    const mockContent = `Mock document content for document ID: ${id}`;
    return new Blob([mockContent], { type: 'text/plain' });
  }

  public async getDocumentById(id: number): Promise<IDocument> {
    await this.delay(300);
    const doc = this.documents.find(d => d.Id === id);
    if (!doc) {
      throw new Error(`Document with id ${id} not found`);
    }
    return { ...doc };
  }

  // ========== Helper Methods ==========

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : '';
  }
}
