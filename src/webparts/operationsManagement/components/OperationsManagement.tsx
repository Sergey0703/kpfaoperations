import * as React from 'react';
import { Stack } from '@fluentui/react';
import { IOperationsManagementProps } from './IOperationsManagementProps';
import { DataProvider } from './Context';
import { Navigation } from './Navigation';
import { BuildingsGallery } from './BuildingsGallery';
import styles from './OperationsManagement.module.scss';

export default class OperationsManagement extends React.Component<IOperationsManagementProps> {
  public render(): React.ReactElement<IOperationsManagementProps> {
    return (
      <DataProvider context={this.props.context}>
        <div className={styles.operationsManagement}>
          <Stack horizontal className={styles.container}>
            {/* Main Navigation */}
            <Stack.Item className={styles.navPanel}>
              <Navigation />
            </Stack.Item>

            {/* Buildings Gallery */}
            <Stack.Item className={styles.buildingsPanel}>
              <BuildingsGallery />
            </Stack.Item>

            {/* Details Panel */}
            <Stack.Item grow className={styles.detailsPanel}>
              <div className={styles.placeholder}>
                <h2>Select a building</h2>
                <p>Choose a building from the list to view details</p>
              </div>
            </Stack.Item>
          </Stack>
        </div>
      </DataProvider>
    );
  }
}
