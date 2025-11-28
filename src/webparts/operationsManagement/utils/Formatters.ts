// Formatting utilities for KPFA Operations Management

export class Formatters {
  // Format number with thousand separators
  public static formatNumber(value: number, decimals: number = 0): string {
    if (!value && value !== 0) return '';
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  // Format area with square footage
  public static formatArea(area: number): string {
    if (!area && area !== 0) return '';
    return `${this.formatNumber(area, 2)} sq ft`;
  }

  // Format date to local string
  public static formatDate(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Format date and time
  public static formatDateTime(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Format file size
  public static formatFileSize(bytes: number): string {
    if (!bytes || bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  // Get file icon based on extension
  public static getFileIcon(extension: string): string {
    const ext = extension.toLowerCase();

    // Fluent UI icon names
    const iconMap: Record<string, string> = {
      '.pdf': 'PDF',
      '.doc': 'WordDocument',
      '.docx': 'WordDocument',
      '.xls': 'ExcelDocument',
      '.xlsx': 'ExcelDocument',
      '.jpg': 'FileImage',
      '.jpeg': 'FileImage',
      '.png': 'FileImage',
      '.gif': 'FileImage',
      '.bmp': 'FileImage'
    };

    return iconMap[ext] || 'Document';
  }

  // Truncate text with ellipsis
  public static truncate(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  }

  // Format person field (Author/Editor)
  public static formatPerson(person?: { Title: string; Email: string }): string {
    if (!person) return '';
    return person.Title || person.Email || '';
  }
}
