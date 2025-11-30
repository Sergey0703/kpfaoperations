import * as React from 'react';
import { Stack, Pivot, PivotItem } from '@fluentui/react';
import { IOperationsManagementProps } from './IOperationsManagementProps';
import { DataProvider } from './Context';
import { BuildingsGallery } from './BuildingsGallery';
import { BuildingDetails } from './BuildingDetails';
import { DialogContainer } from './Dialogs';
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
                paddingLeft: '16px'
              }
            }}
          >
            <PivotItem headerText="Buildings" itemKey="buildings" itemIcon="CityNext" />
            <PivotItem headerText="Vehicles" itemKey="vehicles" itemIcon="Car" />
            <PivotItem headerText="Reports" itemKey="reports" itemIcon="BarChartVertical" />
            <PivotItem headerText="Settings" itemKey="settings" itemIcon="Settings" />
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
              <div className={styles.comingSoon}>
                <h2>Vehicles</h2>
                <p>Coming soon...</p>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className={styles.comingSoon}>
                <h2>Reports</h2>
                <p>Coming soon...</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className={styles.comingSoon}>
                <h2>Settings</h2>
                <p>Coming soon...</p>
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
