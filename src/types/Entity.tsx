import BuildIcon from '@material-ui/icons/Build';
import ErrorIcon from '@material-ui/icons/Error';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StarIcon from '@material-ui/icons/Star';
import StoreIcon from '@material-ui/icons/Store';
import React from 'react';

const entityTypes = [
  'None',
  'Admin',
  'Factory',
  'Transport',
  'Warehouse',
  'Retailer'
] as const;

export const visibleEntityTypes = [
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export type EntityType = typeof entityTypes[number];

export type VisibleEntityType = typeof visibleEntityTypes[number];

export interface Entity {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  type: number;
  set: boolean;
  approved: boolean;
}

export const EmptyEntity: Entity = {
  id: '',
  email: '',
  name: '',
  phoneNumber: '',
  type: 0,
  set: false,
  approved: false
};

export const entityTypeConversion: { [key in EntityType]: number } = {
  None: 0,
  Admin: 1,
  Factory: 2,
  Transport: 3,
  Warehouse: 4,
  Retailer: 5
};

export const getEntityType = (id: number) => {
  return entityTypes[id];
};

export interface EntityTypeData {
  icon: JSX.Element;
  color: string;
  label: string;
}

export const getEntityTypesData = (
  color: string,
  size: number
): {
  [key in EntityType | 'Admin']: EntityTypeData;
} => {
  const styles = { fontSize: size, color: color };
  return {
    Admin: {
      icon: <StarIcon style={styles} />,
      color: '#f6ae9aff',
      label: 'Admin'
    },
    Factory: {
      icon: <BuildIcon style={styles} />,
      color: '#f5ab25',
      label: 'Factory'
    },
    Retailer: {
      icon: <StoreIcon style={styles} />,
      color: '#51c151',
      label: 'Retailer'
    },
    Transport: {
      icon: <LocalShippingIcon style={styles} />,
      color: '#ef6666',
      label: 'Transport'
    },
    Warehouse: {
      icon: <HomeWorkIcon style={styles} />,
      color: '#6b6be0',
      label: 'Warehouse'
    },
    None: {
      icon: <ErrorIcon style={styles} />,
      color: 'black',
      label: 'Error'
    }
  };
};
