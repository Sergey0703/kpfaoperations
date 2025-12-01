// Building Card Component - Individual building card in the gallery

import * as React from 'react';
import { IBuilding } from '../../models/IBuilding';
import { ColorScheme } from '../../styles/ColorScheme';
import { Formatters } from '../../utils/Formatters';

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
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '12px',
    borderRadius: ColorScheme.borderRadius
  };

  // Стили для выбранной карточки с градиентной рамкой
  const selectedStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: '#ffffff',
    border: '1px solid transparent',
    background: `
      linear-gradient(white, white) padding-box,
      ${ColorScheme.primaryGradientBorder} border-box
    `,
    boxShadow: isHovered ? ColorScheme.cardShadowHover : ColorScheme.cardShadow,
    transform: isHovered ? 'translateY(-2px)' : 'none'
  };

  // Стили для обычной карточки
  const normalStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: '#ffffff',
    border: '1px solid #edebe9',
    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
    transform: isHovered ? 'translateY(-2px)' : 'none'
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
          fontWeight: '600',
          color: '#111827',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1
        }}>
          {building.PropertyName}
        </h3>
        {building.Deleted && (
          <span style={{
            background: ColorScheme.badges.overdue.accent,
            color: '#ffffff',
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '8px',
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
        margin: '0 0 8px 0',
        fontSize: '13px',
        color: '#6B7280',
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
        flexDirection: 'column',
        gap: '4px',
        fontSize: '12px',
        color: '#9CA3AF'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span>Built {building.YearBuilt}</span>
          <span>{building.AreaSquareFootage.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq ft</span>
        </div>
        {building.CommissioningDate && (
          <span>Commissioned {Formatters.formatDate(building.CommissioningDate)}</span>
        )}
      </div>
    </div>
  );
};
