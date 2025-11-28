// Document interface for KPFA Operations Management

import { DocumentType, DocumentStatus } from './Enums';

export interface IDocument {
  Id?: number;
  FileName: string;               // FileLeafRef in SharePoint
  Title: string;
  BuildingId: number;             // Lookup to Buildings list
  BuildingName?: string;          // Lookup value
  DocumentType: DocumentType;
  DocumentDate: Date;
  Description: string;
  Status: DocumentStatus;
  FileUrl: string;                // FileRef in SharePoint
  FileSize?: number;              // In bytes
  FileExtension?: string;
  Created?: Date;
  Author?: {
    Title: string;
    Email: string;
  };
}

// Form data interface for document upload
export interface IDocumentFormData {
  file: File;
  title: string;
  buildingId: number;
  documentType: DocumentType;
  documentDate: Date;
  description: string;
}
