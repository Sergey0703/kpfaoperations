import * as React from 'react';
import { Stack, Pivot, PivotItem } from '@fluentui/react';
import { IOperationsManagementProps } from './IOperationsManagementProps';
import { DataProvider } from './Context';
import { BuildingsGallery } from './BuildingsGallery';
import { BuildingDetails } from './BuildingDetails';
import { DialogContainer } from './Dialogs';
import { NeonFuture } from './StylePreviews/NeonFuture';
import { DublinHeritage } from './StylePreviews/DublinHeritage';
import { WarmModern } from './StylePreviews/WarmModern';
import { VehiclesWarmModern } from './StylePreviews/VehiclesWarmModern';
import styles from './OperationsManagement.module.scss';

interface IOperationsManagementState {
  activeTab: string;
}

export default class OperationsManagement extends React.Component<IOperationsManagementProps, IOperationsManagementState> {
  constructor(props: IOperationsManagementProps) {
    super(props);
    this.state = {
      activeTab: 'buildings'
    };
  }

  private handlePivotChange = (item?: PivotItem): void => {
    if (item && item.props.itemKey) {
      this.setState({ activeTab: item.props.itemKey });
    }
  };

  public render(): React.ReactElement<IOperationsManagementProps> {
    const { activeTab } = this.state;

    // TODO: Set useMockData=false when SharePoint Lists are created
    const useMockData = true;

    return (
      <DataProvider context={this.props.context} useMockData={useMockData}>
        <div className={styles.operationsManagement}>
          {/* Pivot Navigation */}
          <Pivot
            selectedKey={activeTab}
            onLinkClick={this.handlePivotChange}
            headersOnly={true}
            styles={{
              root: {
                borderBottom: '1px solid #edebe9',
                backgroundColor: '#ffffff',
                paddingLeft: '24px',
                paddingRight: '24px',
                height: '56px',
                display: 'flex',
                alignItems: 'center'
              },
              link: {
                fontSize: '14px',
                fontWeight: '500',
                color: '#605e5c',
                padding: '4px 12px',
                margin: '0 4px',
                height: 'auto',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                selectors: {
                  ':hover': {
                    color: '#323130',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  },
                  ':active': {
                    color: '#323130'
                  },
                  '::before': {
                    display: 'none'
                  }
                }
              },
              linkIsSelected: {
                fontSize: '14px',
                fontWeight: '600',
                color: '#4285F4',
                backgroundColor: '#E6F0FF',
                borderRadius: '6px',
                padding: '4px 12px',
                selectors: {
                  '::before': {
                    display: 'none'
                  },
                  ':hover': {
                    backgroundColor: '#D6E7FF'
                  }
                }
              },
              icon: {
                fontSize: '16px',
                marginRight: '8px',
                color: 'inherit'
              }
            }}
          >
            <PivotItem headerText="Buildings" itemKey="buildings" itemIcon="CityNext" />
            <PivotItem headerText="Warm Modern" itemKey="warm" itemIcon="Sunny" />
            <PivotItem headerText="Dublin Heritage" itemKey="heritage" itemIcon="Home" />
            <PivotItem headerText="Vehicles" itemKey="vehicles" itemIcon="car" />
            <PivotItem headerText="Neon" itemKey="neon" itemIcon="Rocket" />
          </Pivot>

          {/* Content based on active tab */}
          <Stack horizontal className={styles.container}>
            {activeTab === 'buildings' && (
              <>
                <Stack.Item className={styles.galleryPanel}>
                  <BuildingsGallery />
                </Stack.Item>
                <Stack.Item grow className={styles.detailsPanel}>
                  <BuildingDetails />
                </Stack.Item>
              </>
            )}

            {activeTab === 'vehicles' && (
              <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <VehiclesWarmModern />
              </div>
            )}

            {activeTab === 'warm' && (
              <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <WarmModern />
              </div>
            )}

            {activeTab === 'heritage' && (
              <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <DublinHeritage />
              </div>
            )}

            {activeTab === 'neon' && (
              <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <NeonFuture />
              </div>
            )}
          </Stack>

          {/* Dialogs - Rendered inside DataProvider to access context */}
          <DialogContainer />
        </div>
      </DataProvider>
    );
  }
}
