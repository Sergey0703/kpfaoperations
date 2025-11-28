// Building Card Component - Individual building card in the gallery

import * as React from 'react';
import { IBuilding } from '../../models/IBuilding';
import styles from './BuildingCard.module.scss';

export interface IBuildingCardProps {
  building: IBuilding;
  isSelected: boolean;
  onClick: (building: IBuilding) => void;
}

export const BuildingCard: React.FC<IBuildingCardProps> = ({ building, isSelected, onClick }) => {
  const handleClick = (): void => {
    onClick(building);
  };

  const cardClassName = `${styles.buildingCard} ${isSelected ? styles.selected : ''} ${building.Deleted ? styles.deleted : ''}`;

  return (
    <div className={cardClassName} onClick={handleClick}>
      <div className={styles.cardHeader}>
        <h3 className={styles.buildingName}>{building.PropertyName}</h3>
        {building.Deleted && (
          <span className={styles.deletedBadge}>Deleted</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.address}>{building.Address}</p>
        <div className={styles.metadata}>
          <span className={styles.metaItem}>Built: {building.YearBuilt}</span>
          <span className={styles.metaItem}>{building.AreaSquareFootage.toFixed(2)} sq ft</span>
        </div>
      </div>
    </div>
  );
};
