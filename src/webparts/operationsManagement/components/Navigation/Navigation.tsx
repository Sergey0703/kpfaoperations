// Navigation Component - Left sidebar menu

import * as React from 'react';
import { Nav, INavLink } from '@fluentui/react';

export interface INavigationProps {
  onLinkClick?: (item: string) => void;
}

export const Navigation: React.FC<INavigationProps> = ({ onLinkClick }) => {
  const navLinks: INavLink[] = [
    {
      name: 'Buildings',
      url: '',
      key: 'buildings',
      icon: 'CityNext'
    },
    {
      name: 'Vehicles',
      url: '',
      key: 'vehicles',
      icon: 'Car',
      disabled: true
    },
    {
      name: 'Reports',
      url: '',
      key: 'reports',
      icon: 'BarChartVertical',
      disabled: true
    },
    {
      name: 'Settings',
      url: '',
      key: 'settings',
      icon: 'Settings',
      disabled: true
    }
  ];

  const handleLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
    if (ev) ev.preventDefault();
    if (item && item.key && !item.disabled && onLinkClick) {
      onLinkClick(item.key);
    }
  };

  return (
    <div style={{
      width: '200px',
      height: '100%',
      backgroundColor: '#2c3e50',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid #34495e'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: '600',
          color: '#ffffff'
        }}>
          KPFA Operations
        </h2>
      </div>

      {/* Navigation */}
      <Nav
        groups={[{ links: navLinks }]}
        onLinkClick={handleLinkClick}
        selectedKey="buildings"
        styles={{
          root: {
            width: '100%',
            boxSizing: 'border-box',
            overflowY: 'auto'
          },
          link: {
            backgroundColor: 'transparent',
            color: '#ecf0f1',
            selectors: {
              ':hover': {
                backgroundColor: '#34495e',
                color: '#ffffff'
              },
              '&.is-selected': {
                backgroundColor: '#3498db',
                color: '#ffffff'
              }
            }
          },
          groupContent: {
            marginBottom: 0
          }
        }}
      />

      {/* Footer */}
      <div style={{
        marginTop: 'auto',
        padding: '16px',
        borderTop: '1px solid #34495e',
        fontSize: '12px',
        color: '#95a5a6'
      }}>
        v1.0.0
      </div>
    </div>
  );
};
