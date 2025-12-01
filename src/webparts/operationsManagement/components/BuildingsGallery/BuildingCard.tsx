// Building Card Component - Individual building card in the gallery

import * as React from 'react';
import { IBuilding } from '../../models/IBuilding';
import { ColorScheme } from '../../styles/ColorScheme';

export interface IBuildingCardProps {
  building: IBuilding;
  isSelected: boolean;
  onClick: (building: IBuilding) => void;
}

export const BuildingCard: React.FC<IBuildingCardProps> = ({ building, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = (): void => {
    onClick(building);
  };

  // Modern Card Styles
  const baseStyle: React.CSSProperties = {
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '16px',
    borderRadius: '16px',
    position: 'relative',
    background: '#ffffff',
    border: '1px solid transparent' // Placeholder for border transitions
  };

  // Selected Style - Gradient Border & Glow
  const selectedStyle: React.CSSProperties = {
    ...baseStyle,
    background: `
      linear-gradient(#ffffff, #ffffff) padding-box,
      ${ColorScheme.primaryGradientBorder} border-box
    `,
    boxShadow: '0 12px 24px -8px rgba(66, 133, 244, 0.15), 0 4px 8px -4px rgba(66, 133, 244, 0.1)',
    transform: 'translateY(-2px)'
  };

  // Normal Style - Clean & Soft
  const normalStyle: React.CSSProperties = {
    ...baseStyle,
    border: '1px solid rgba(229, 231, 235, 0.5)', // Very subtle border
    boxShadow: isHovered
      ? '0 12px 20px -8px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)' // Elevated on hover
      : '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02)', // Flat when idle
    transform: isHovered ? 'translateY(-2px)' : 'none'
  };

  // Deleted Style
  const deletedStyle: React.CSSProperties = {
    opacity: 0.7,
    background: '#F9FAFB',
    border: '1px dashed #D1D5DB'
  };

  const cardStyle = isSelected ? selectedStyle : normalStyle;
  const finalStyle = building.Deleted ? { ...cardStyle, ...deletedStyle } : cardStyle;

  return (
    <div
      style={finalStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '700',
          color: '#111827',
          lineHeight: '1.4',
          letterSpacing: '-0.01em',
          flex: 1
        }}>
          {building.PropertyName}
        </h3>
        {building.Deleted && (
          <span style={{
            background: '#FEF2F2',
            color: '#991B1B',
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontWeight: '600',
            marginLeft: '8px',
            border: '1px solid #FECACA'
          }}>
            Deleted
          </span>
        )}
      </div>

      {/* Address */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#6B7280',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {building.Address}
        </p>
      </div>

      {/* Metadata Badges */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '12px',
        color: '#4B5563'
      }}>
        <span style={{
          background: '#F3F4F6',
          padding: '4px 8px',
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          {building.YearBuilt}
        </span>
        <span style={{
          background: '#F3F4F6',
          padding: '4px 8px',
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          {building.AreaSquareFootage.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq ft
        </span>
      </div>
    </div>
  );
};
