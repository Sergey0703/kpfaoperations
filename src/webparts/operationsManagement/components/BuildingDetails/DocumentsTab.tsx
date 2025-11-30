// Documents Tab - Shows documents list for the building

import * as React from 'react';
import { PrimaryButton, Icon, Spinner, SpinnerSize, Dropdown, IDropdownOption } from '@fluentui/react';
import { IBuilding } from '../../models/IBuilding';
import { IDocument } from '../../models/IDocument';
import { DocumentType } from '../../models/Enums';
import { useDataContext } from '../Context';
import { Formatters } from '../../utils/Formatters';

export interface IDocumentsTabProps {
  building: IBuilding;
}

export const DocumentsTab: React.FC<IDocumentsTabProps> = ({ building }) => {
  const { state, actions } = useDataContext();
  const { documents, isLoading } = state;
  const [filterType, setFilterType] = React.useState<string>('All');
  const [sortBy, setSortBy] = React.useState<string>('date');

  const handleUpload = (): void => {
    actions.openUploadDialog();
  };

  const handleDownload = (document: IDocument): void => {
    actions.downloadDocument(document).catch(error => {
      console.error('Download failed:', error);
    });
  };

  const handleDelete = (documentId: number): void => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      actions.deleteDocument(documentId).catch(error => {
        console.error('Delete failed:', error);
      });
    }
  };

  // Filter and sort documents
  const getFilteredDocuments = (): IDocument[] => {
    let filtered = [...documents];

    // Filter by type
    if (filterType !== 'All') {
      filtered = filtered.filter(doc => doc.DocumentType === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.DocumentDate).getTime() - new Date(a.DocumentDate).getTime();
        case 'name':
          return a.Title.localeCompare(b.Title);
        case 'type':
          return a.DocumentType.localeCompare(b.DocumentType);
        case 'size':
          return (b.FileSize || 0) - (a.FileSize || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredDocs = getFilteredDocuments();

  // Calculate statistics
  const getDocumentStats = (): Record<string, number> => {
    const stats: Record<string, number> = {};
    documents.forEach(doc => {
      stats[doc.DocumentType] = (stats[doc.DocumentType] || 0) + 1;
    });
    return stats;
  };

  const stats = getDocumentStats();

  // Dropdown options with counts
  const typeFilterOptions: IDropdownOption[] = [
    { key: 'All', text: `All Types (${documents.length})` },
    { key: DocumentType.Contract, text: `Contracts (${stats[DocumentType.Contract] || 0})` },
    { key: DocumentType.Invoice, text: `Invoices (${stats[DocumentType.Invoice] || 0})` },
    { key: DocumentType.Photo, text: `Photos (${stats[DocumentType.Photo] || 0})` },
    { key: DocumentType.Report, text: `Reports (${stats[DocumentType.Report] || 0})` },
    { key: DocumentType.Other, text: `Other (${stats[DocumentType.Other] || 0})` }
  ];

  const sortOptions: IDropdownOption[] = [
    { key: 'date', text: 'Sort by Date' },
    { key: 'name', text: 'Sort by Name' },
    { key: 'type', text: 'Sort by Type' },
    { key: 'size', text: 'Sort by Size' }
  ];

  // Get badge color for document type
  const getTypeBadgeColor = (docType: string): { bg: string; text: string } => {
    switch (docType) {
      case DocumentType.Contract:
        return { bg: '#e3f2fd', text: '#1976d2' };
      case DocumentType.Invoice:
        return { bg: '#fff3e0', text: '#f57c00' };
      case DocumentType.Photo:
        return { bg: '#f3e5f5', text: '#7b1fa2' };
      case DocumentType.Report:
        return { bg: '#e8f5e9', text: '#388e3c' };
      default:
        return { bg: '#f5f5f5', text: '#616161' };
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '12px'
      }}>
        <PrimaryButton
          text="Upload Document"
          iconProps={{ iconName: 'Upload' }}
          onClick={handleUpload}
        />

        <div style={{ display: 'flex', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
          <Dropdown
            placeholder="Filter by type"
            options={typeFilterOptions}
            selectedKey={filterType}
            onChange={(_, option) => setFilterType(option?.key as string)}
            styles={{
              root: { width: '150px' },
              dropdown: { fontSize: '13px' }
            }}
          />
          <Dropdown
            placeholder="Sort by"
            options={sortOptions}
            selectedKey={sortBy}
            onChange={(_, option) => setSortBy(option?.key as string)}
            styles={{
              root: { width: '150px' },
              dropdown: { fontSize: '13px' }
            }}
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && documents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner size={SpinnerSize.large} label="Loading documents..." />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && documents.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#605e5c'
        }}>
          <Icon
            iconName="DocumentSet"
            style={{
              fontSize: '48px',
              color: '#c8c6c4',
              marginBottom: '16px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>
            No documents found for this building
          </p>
        </div>
      )}

      {/* No Results After Filter */}
      {!isLoading && documents.length > 0 && filteredDocs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#605e5c'
        }}>
          <Icon
            iconName="Filter"
            style={{
              fontSize: '48px',
              color: '#c8c6c4',
              marginBottom: '16px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>
            No documents match the selected filters
          </p>
        </div>
      )}

      {/* Documents Count */}
      {documents.length > 0 && filteredDocs.length > 0 && (
        <div style={{
          fontSize: '13px',
          color: '#605e5c',
          marginBottom: '12px'
        }}>
          Showing {filteredDocs.length} of {documents.length} document{documents.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Documents List */}
      {filteredDocs.length > 0 && (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredDocs.map((doc) => (
            <div
              key={doc.Id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #edebe9',
                borderRadius: '4px',
                padding: '16px',
                transition: 'box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                {/* File Icon */}
                <Icon
                  iconName={Formatters.getFileIcon(doc.FileExtension || '')}
                  style={{
                    fontSize: '32px',
                    color: '#0078d4',
                    flexShrink: 0
                  }}
                />

                {/* Document Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    margin: '0 0 4px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#323130',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {doc.Title}
                  </h4>

                  <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '13px',
                    color: '#605e5c'
                  }}>
                    {doc.FileName}
                  </p>

                  {doc.Description && (
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '13px',
                      color: '#8a8886'
                    }}>
                      {doc.Description}
                    </p>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#8a8886',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      backgroundColor: getTypeBadgeColor(doc.DocumentType).bg,
                      color: getTypeBadgeColor(doc.DocumentType).text,
                      padding: '2px 8px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {doc.DocumentType}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon iconName="Calendar" style={{ fontSize: '11px' }} />
                      {Formatters.formatDate(doc.DocumentDate)}
                    </span>
                    {doc.FileSize && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icon iconName="Storage" style={{ fontSize: '11px' }} />
                        {Formatters.formatFileSize(doc.FileSize)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexShrink: 0
                }}>
                  <button
                    onClick={() => handleDownload(doc)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      color: '#0078d4',
                      fontSize: '16px'
                    }}
                    title="Download"
                  >
                    <Icon iconName="Download" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.Id!)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      color: '#d13438',
                      fontSize: '16px'
                    }}
                    title="Delete"
                  >
                    <Icon iconName="Delete" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
