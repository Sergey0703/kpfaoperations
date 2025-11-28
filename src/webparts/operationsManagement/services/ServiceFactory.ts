// Service Factory - Provides appropriate data service implementation

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IDataService } from './IDataService';
import { SharePointService } from './SharePointService';
import { Logger } from '../utils/Logger';

export enum ServiceType {
  SharePoint = 'SharePoint',
  AzureDatabase = 'AzureDatabase'  // Future implementation
}

export class ServiceFactory {
  private static instance: IDataService | null = null;

  /**
   * Get or create the data service instance (singleton pattern)
   * @param context - WebPart context
   * @param serviceType - Type of service to create (default: SharePoint)
   * @returns Data service instance
   */
  public static getService(
    context: WebPartContext,
    serviceType: ServiceType = ServiceType.SharePoint
  ): IDataService {
    // Return existing instance if already created
    if (this.instance) {
      return this.instance;
    }

    // Create new service based on type
    Logger.log('Creating data service', { serviceType });

    switch (serviceType) {
      case ServiceType.SharePoint:
        this.instance = new SharePointService(context);
        break;

      case ServiceType.AzureDatabase:
        // Future: Implement AzureDatabaseService
        Logger.warn('Azure Database service not yet implemented, falling back to SharePoint');
        this.instance = new SharePointService(context);
        break;

      default:
        Logger.warn('Unknown service type, using SharePoint', { serviceType });
        this.instance = new SharePointService(context);
    }

    return this.instance;
  }

  /**
   * Reset the service instance (useful for testing or re-initialization)
   */
  public static resetService(): void {
    Logger.log('Resetting service instance');
    this.instance = null;
  }

  /**
   * Check if service is initialized
   */
  public static isInitialized(): boolean {
    return this.instance !== null;
  }
}
