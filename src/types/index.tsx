import React from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StarIcon from '@material-ui/icons/Star';
import StoreIcon from '@material-ui/icons/Store';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ErrorIcon from '@material-ui/icons/Error';
import BuildIcon from '@material-ui/icons/Build';

const entityTypes = [
  'None',
  'Admin',
  'Factory',
  'Transport',
  'Warehouse',
  'Retailer'
] as const;

export type NonVisibleEntityType = typeof entityTypes[number];

export const visibleEntityTypes = [
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export type EntityType = typeof entityTypes[number];

export type VisibleEntityType = typeof visibleEntityTypes[number];

export interface Entity {
  name: string;
  email: string;
  phoneNumber: string;
  type: number;
  set: boolean;
  approved: boolean;
}

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

export const getEntityTypeData = (
  type: EntityType | 'Admin',
  classes: Record<string, string>
): EntityTypeData => {
  switch (type) {
    case 'Admin':
      return {
        icon: <StarIcon classes={{ root: classes.icon }} />,
        color: 'gold',
        label: 'Admin'
      };
    case 'Factory':
      return {
        icon: <BuildIcon classes={{ root: classes.icon }} />,
        color: '#f5ab25',
        label: 'Factory'
      };
    case 'Retailer':
      return {
        icon: <StoreIcon classes={{ root: classes.icon }} />,
        color: '#51c151',
        label: 'Retailer'
      };
    case 'Transport':
      return {
        icon: <LocalShippingIcon classes={{ root: classes.icon }} />,
        color: '#ef6666',
        label: 'Transport'
      };
    case 'Warehouse':
      return {
        icon: <HomeWorkIcon classes={{ root: classes.icon }} />,
        color: '#6b6be0',
        label: 'Warehouse'
      };
    default:
      return {
        icon: <ErrorIcon classes={{ root: classes.icon }} />,
        color: 'black',
        label: 'Error'
      };
  }
};
