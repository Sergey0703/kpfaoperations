// Constants for KPFA Operations Management

export class AppConstants {
  // SharePoint List/Library Names
  public static readonly BUILDINGS_LIST = 'Buildings';
  public static readonly DOCUMENTS_LIBRARY = 'KPFA_Documents';

  // Field Internal Names - Buildings
  public static readonly FIELD_PROPERTY_NAME = 'Title';
  public static readonly FIELD_ADDRESS = 'Address';
  public static readonly FIELD_YEAR_BUILT = 'YearBuilt';
  public static readonly FIELD_AREA = 'AreaSquareFootage';
  public static readonly FIELD_DELETED = 'Deleted';

  // Field Internal Names - Documents
  public static readonly FIELD_BUILDING_ID = 'BuildingId';
  public static readonly FIELD_DOCUMENT_TYPE = 'DocumentType';
  public static readonly FIELD_DOCUMENT_DATE = 'DocumentDate';
  public static readonly FIELD_DESCRIPTION = 'Description';
  public static readonly FIELD_STATUS = 'Status';
  public static readonly FIELD_FILE_REF = 'FileRef';
  public static readonly FIELD_FILE_LEAF_REF = 'FileLeafRef';

  // UI Constants
  public static readonly SEARCH_DEBOUNCE_MS = 300;
  public static readonly MAX_FILE_SIZE_MB = 10;
  public static readonly ALLOWED_FILE_EXTENSIONS = [
    '.pdf', '.doc', '.docx', '.xlsx', '.xls',
    '.jpg', '.jpeg', '.png', '.gif', '.bmp'
  ];

  // Messages
  public static readonly MSG_LOADING = 'Loading...';
  public static readonly MSG_NO_BUILDINGS = 'No buildings found';
  public static readonly MSG_NO_DOCUMENTS = 'No documents found for this building';
  public static readonly MSG_SELECT_BUILDING = 'Select a building to view details';
  public static readonly MSG_DELETE_CONFIRM = 'Are you sure you want to delete this building?';
  public static readonly MSG_UPLOAD_SUCCESS = 'Document uploaded successfully';
  public static readonly MSG_UPLOAD_ERROR = 'Error uploading document';
  public static readonly MSG_SAVE_SUCCESS = 'Building saved successfully';
  public static readonly MSG_SAVE_ERROR = 'Error saving building';
  public static readonly MSG_DELETE_SUCCESS = 'Building deleted successfully';
  public static readonly MSG_DELETE_ERROR = 'Error deleting building';
}
