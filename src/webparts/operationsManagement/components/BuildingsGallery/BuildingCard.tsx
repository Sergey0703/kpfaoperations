// Building Card Component - Individual building card in the gallery

import * as React from 'react';
import { IBuilding } from '../../models/IBuilding';

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

  // Базовые стили
  const baseStyle: React.CSSProperties = {
    padding: '12px',
    cursor: 'pointer',
    borderBottom: '1px solid #f3f3f3',
    transition: 'all 0.2s ease',
    marginBottom: '4px'
  };

  // Стили для выбранной карточки
  const selectedStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: '#f8fbff',
    color: '#1976d2',
    fontWeight: '600',
    borderLeft: '4px solid #0078d4',
    borderRadius: '6px',
    margin: '2px 0',
    boxShadow: isHovered
      ? '0 4px 16px rgba(0, 120, 212, 0.25)'
      : '0 2px 8px rgba(0, 120, 212, 0.15)',
    border: 'none',
    borderBottom: '1px solid #e8f4fd',
    transform: isHovered ? 'translateY(-1px)' : 'none'
  };

  // Стили для обычной карточки
  const normalStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: isHovered ? '#f5f5f5' : '#ffffff',
    color: '#323130',
    borderRadius: isHovered ? '4px' : '0',
    boxShadow: isHovered ? '0 2px 6px rgba(0, 0, 0, 0.1)' : 'none',
    transform: isHovered ? 'translateY(-1px)' : 'none'
  };

  // Стили для удаленной карточки
  const deletedStyle: React.CSSProperties = {
    opacity: 0.6,
    fontStyle: 'italic',
    color: '#605e5c'
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: isSelected ? '600' : '500',
          color: isSelected ? '#1976d2' : '#323130',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1
        }}>
          {building.PropertyName}
        </h3>
        {building.Deleted && (
          <span style={{
            background: '#d13438',
            color: '#ffffff',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '3px',
            textTransform: 'uppercase',
            fontWeight: '600',
            marginLeft: '8px'
          }}>
            Deleted
          </span>
        )}
      </div>

      {/* Address */}
      <p style={{
        margin: '0 0 6px 0',
        fontSize: '13px',
        color: isSelected ? '#1565c0' : '#605e5c',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4'
      }}>
        {building.Address}
      </p>

      {/* Metadata */}
      <div style={{
        display: 'flex',
        gap: '12px',
        fontSize: '12px',
        color: isSelected ? '#1976d2' : '#8a8886'
      }}>
        <span>Built: {building.YearBuilt}</span>
        <span>{building.AreaSquareFootage.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq ft</span>
      </div>
    </div>
  );
};
