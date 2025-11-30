// Upload Document Dialog - Form for uploading documents

import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  TextField,
  Dropdown,
  IDropdownOption,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  ProgressIndicator,
  Icon
} from '@fluentui/react';
import { DocumentType } from '../../models/Enums';
import { IDocumentFormData } from '../../models/IDocument';
import { useDataContext } from '../Context';

export interface IUploadDocumentDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const UploadDocumentDialog: React.FC<IUploadDocumentDialogProps> = ({
  isOpen,
  onDismiss
}) => {
  const { state, actions } = useDataContext();
  const { selectedBuilding, isLoading, error, uploadProgress } = state;

  // Form state
  const [file, setFile] = React.useState<File | undefined>();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [documentType, setDocumentType] = React.useState<DocumentType>(DocumentType.Other);
  const [documentDate, setDocumentDate] = React.useState('');

  // Validation errors
  const [fileError, setFileError] = React.useState<string | undefined>();
  const [titleError, setTitleError] = React.useState<string | undefined>();
  const [dateError, setDateError] = React.useState<string | undefined>();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Reset form when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setFile(undefined);
      setTitle('');
      setDescription('');
      setDocumentType(DocumentType.Other);
      setDocumentDate(new Date().toISOString().split('T')[0]);
      setFileError(undefined);
      setTitleError(undefined);
      setDateError(undefined);
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileError(undefined);

      // Auto-fill title from filename if empty
      if (!title) {
        const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
        setTitle(fileNameWithoutExt);
      }
    }
  };

  const handleBrowse = (): void => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate file
    if (!file) {
      setFileError('Please select a file to upload');
      isValid = false;
    } else {
      setFileError(undefined);
    }

    // Validate title
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError(undefined);
    }

    // Validate date
    if (!documentDate) {
      setDateError('Document date is required');
      isValid = false;
    } else {
      setDateError(undefined);
    }

    return isValid;
  };

  const handleUpload = async (): Promise<void> => {
    if (!validateForm() || !selectedBuilding || !file) {
      return;
    }

    const formData: IDocumentFormData = {
      file,
      title: title.trim(),
      description: description.trim(),
      documentType,
      documentDate: new Date(documentDate),
      buildingId: selectedBuilding.Id!
    };

    try {
      await actions.uploadDocument(formData);
      onDismiss();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const documentTypeOptions: IDropdownOption[] = [
    { key: DocumentType.Contract, text: 'Contract' },
    { key: DocumentType.Invoice, text: 'Invoice' },
    { key: DocumentType.Photo, text: 'Photo' },
    { key: DocumentType.Report, text: 'Report' },
    { key: DocumentType.Other, text: 'Other' }
  ];

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Upload Document',
    subText: selectedBuilding ? `Upload a document for ${selectedBuilding.PropertyName}` : 'Upload a document'
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

        {/* File Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#323130',
            marginBottom: '4px'
          }}>
            File <span style={{ color: '#a4262c' }}>*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={isLoading}
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <DefaultButton
              text="Browse..."
              iconProps={{ iconName: 'FolderOpen' }}
              onClick={handleBrowse}
              disabled={isLoading}
            />
            {file && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#323130'
              }}>
                <Icon iconName="Attach" style={{ color: '#0078d4' }} />
                <span>{file.name}</span>
                <span style={{ color: '#605e5c' }}>
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}
          </div>

          {fileError && (
            <div style={{
              fontSize: '12px',
              color: '#a4262c',
              marginTop: '4px'
            }}>
              {fileError}
            </div>
          )}
        </div>

        <TextField
          label="Document Title"
          required
          placeholder="Enter document title"
          value={title}
          onChange={(_, newValue) => setTitle(newValue || '')}
          errorMessage={titleError}
          disabled={isLoading}
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        <Dropdown
          label="Document Type"
          required
          placeholder="Select document type"
          options={documentTypeOptions}
          selectedKey={documentType}
          onChange={(_, option) => setDocumentType(option?.key as DocumentType)}
          disabled={isLoading}
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        <TextField
          label="Document Date"
          required
          type="date"
          value={documentDate}
          onChange={(_, newValue) => setDocumentDate(newValue || '')}
          errorMessage={dateError}
          disabled={isLoading}
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        <TextField
          label="Description"
          placeholder="Enter optional description"
          value={description}
          onChange={(_, newValue) => setDescription(newValue || '')}
          disabled={isLoading}
          multiline
          rows={3}
          styles={{
            root: { marginBottom: '16px' }
          }}
        />

        {/* Upload Progress */}
        {isLoading && uploadProgress > 0 && (
          <div style={{ marginTop: '16px' }}>
            <ProgressIndicator
              label="Uploading..."
              description={`${uploadProgress}% complete`}
              percentComplete={uploadProgress / 100}
            />
          </div>
        )}
      </div>

      <DialogFooter>
        {isLoading ? (
          <Spinner size={SpinnerSize.medium} label="Uploading..." />
        ) : (
          <>
            <PrimaryButton
              text="Upload"
              iconProps={{ iconName: 'Upload' }}
              onClick={handleUpload}
              disabled={isLoading || !file}
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
