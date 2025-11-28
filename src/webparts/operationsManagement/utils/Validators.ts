// Validation utilities for KPFA Operations Management

import { AppConstants } from '../models/Constants';

export class Validators {
  // Building validations
  public static validatePropertyName(name: string): string | undefined {
    if (!name || name.trim().length === 0) {
      return 'Property name is required';
    }
    if (name.trim().length > 255) {
      return 'Property name must not exceed 255 characters';
    }
    return undefined;
  }

  public static validateAddress(address: string): string | undefined {
    if (!address || address.trim().length === 0) {
      return 'Address is required';
    }
    if (address.trim().length > 1000) {
      return 'Address must not exceed 1000 characters';
    }
    return undefined;
  }

  public static validateYearBuilt(year: number): string | undefined {
    if (!year) {
      return 'Year built is required';
    }
    if (year < 1800 || year > 2100) {
      return 'Year built must be between 1800 and 2100';
    }
    return undefined;
  }

  public static validateArea(area: number): string | undefined {
    if (!area) {
      return 'Area/Square footage is required';
    }
    if (area <= 0) {
      return 'Area must be greater than 0';
    }
    if (area > 999999999.99) {
      return 'Area value is too large';
    }
    return undefined;
  }

  // Document validations
  public static validateFile(file: File): string | undefined {
    if (!file) {
      return 'File is required';
    }

    // Check file size
    const maxSizeBytes = AppConstants.MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must not exceed ${AppConstants.MAX_FILE_SIZE_MB}MB`;
    }

    // Check file extension
    const extension = this.getFileExtension(file.name);
    if (!AppConstants.ALLOWED_FILE_EXTENSIONS.includes(extension)) {
      return `File type ${extension} is not allowed. Allowed types: ${AppConstants.ALLOWED_FILE_EXTENSIONS.join(', ')}`;
    }

    return undefined;
  }

  public static validateDocumentTitle(title: string): string | undefined {
    if (!title || title.trim().length === 0) {
      return 'Document title is required';
    }
    if (title.trim().length > 255) {
      return 'Document title must not exceed 255 characters';
    }
    return undefined;
  }

  public static validateDescription(description: string): string | undefined {
    if (description && description.length > 2000) {
      return 'Description must not exceed 2000 characters';
    }
    return undefined;
  }

  // Helper methods
  private static getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : '';
  }

  // Form validation - returns all errors
  public static validateBuilding(building: {
    PropertyName: string;
    Address: string;
    YearBuilt: number;
    AreaSquareFootage: number;
  }): Record<string, string> {
    const errors: Record<string, string> = {};

    const nameError = this.validatePropertyName(building.PropertyName);
    if (nameError) errors.PropertyName = nameError;

    const addressError = this.validateAddress(building.Address);
    if (addressError) errors.Address = addressError;

    const yearError = this.validateYearBuilt(building.YearBuilt);
    if (yearError) errors.YearBuilt = yearError;

    const areaError = this.validateArea(building.AreaSquareFootage);
    if (areaError) errors.AreaSquareFootage = areaError;

    return errors;
  }
}
