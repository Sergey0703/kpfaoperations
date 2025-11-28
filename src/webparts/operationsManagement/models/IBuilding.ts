// Building interface for KPFA Operations Management

export interface IBuilding {
  Id?: number;
  PropertyName: string;           // Title field in SharePoint
  Address: string;
  YearBuilt: number;
  AreaSquareFootage: number;
  Deleted: boolean;               // Soft delete flag
  Created?: Date;
  Modified?: Date;
  Author?: {
    Title: string;
    Email: string;
  };
  Editor?: {
    Title: string;
    Email: string;
  };
}
