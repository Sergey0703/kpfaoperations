// Building Card Component - Warm Modern Style

import * as React from 'react';
import { IBuilding } from '../../models/IBuilding';
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

  // Warm Modern Color Palette
  const colors = {
    cream: '#F5F1E8',
    terracotta: '#D4735A',
    sage: '#8B9D83',
    skyBlue: '#6BA3C8',
    sand: '#E8DCC4',
    warmWhite: '#FDFCFA',
    charcoal: '#2D2A26'
  };

  // Base Card Styles
  const baseStyle: React.CSSProperties = {
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '16px',
    borderRadius: '12px',
    position: 'relative',
    fontFamily: '"Inter", -apple-system, system-ui, sans-serif'
  };

  // Selected Style - Warm accent
  const selectedStyle: React.CSSProperties = {
    ...baseStyle,
    background: `linear-gradient(135deg, ${colors.warmWhite} 0%, ${colors.cream} 100%)`,
    border: `2px solid ${colors.terracotta}`,
    boxShadow: `0 8px 24px rgba(212, 115, 90, 0.2), 0 2px 8px rgba(45, 42, 38, 0.08)`,
    transform: 'translateY(-2px)'
  };

  // Normal Style
  const normalStyle: React.CSSProperties = {
    ...baseStyle,
    background: colors.warmWhite,
    border: `1px solid ${colors.sand}`,
    boxShadow: isHovered
      ? '0 8px 16px rgba(45, 42, 38, 0.08)'
      : '0 2px 8px rgba(45, 42, 38, 0.04)',
    transform: isHovered ? 'translateY(-2px)' : 'none'
  };

  // Deleted Style
  const deletedStyle: React.CSSProperties = {
    opacity: 0.6,
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
      {/* Decorative stripe for selected card */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${colors.terracotta}, ${colors.sage}, ${colors.skyBlue})`,
          borderRadius: '12px 12px 0 0'
        }} />
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px',
        marginTop: isSelected ? '4px' : '0'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '600',
          color: colors.charcoal,
          lineHeight: '1.4',
          flex: 1
        }}>
          {building.PropertyName}
        </h3>
        {building.Deleted && (
          <span style={{
            background: '#FEF2F2',
            color: '#991B1B',
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '12px',
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
          color: '#6B6660',
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
        fontSize: '12px'
      }}>
        <span style={{
          background: colors.cream,
          color: colors.charcoal,
          padding: '6px 12px',
          borderRadius: '8px',
          fontWeight: '500',
          border: `1px solid ${colors.sand}`
        }}>
          Built {building.YearBuilt}
        </span>
        <span style={{
          background: colors.cream,
          color: colors.charcoal,
          padding: '6px 12px',
          borderRadius: '8px',
          fontWeight: '500',
          border: `1px solid ${colors.sand}`
        }}>
          {building.AreaSquareFootage.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq ft
        </span>
        {building.CommissioningDate && (
          <span style={{
            background: `linear-gradient(135deg, ${colors.sage}20, ${colors.skyBlue}20)`,
            color: colors.charcoal,
            padding: '6px 12px',
            borderRadius: '8px',
            fontWeight: '500',
            border: `1px solid ${colors.sage}40`
          }}>
            Commissioned {Formatters.formatDate(building.CommissioningDate)}
          </span>
        )}
      </div>

      {/* Decorative corner accent for selected */}
      {isSelected && (
        <>
          <div style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.terracotta}15, transparent)`,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            top: 20,
            right: 16,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.sage}12, transparent)`,
            pointerEvents: 'none'
          }} />
        </>
      )}
    </div>
  );
};
