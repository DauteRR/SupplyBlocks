import BuildIcon from '@material-ui/icons/Build';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreIcon from '@material-ui/icons/Store';
import React from 'react';
import { Address } from './Entity';

const productTypes = ['Created', 'Shipped', 'Stored', 'Delivered'] as const;

type ProductState = typeof productTypes[number];

export interface Product {
  id: Address;
  name: string;
  creatorID: Address;
  creationTimestamp: Date;
  purchaserID: Address;
  deliveryTimestamp?: Date;
}

export interface ProductCreationArgs {
  name: string;
}

export interface ProductStateData {
  icon: JSX.Element;
  color: string;
  label: string;
}

export const getEntityTypesData = (
  color: string,
  size: number
): {
  [key in ProductState]: ProductStateData;
} => {
  const styles = { fontSize: size, color: color };
  return {
    Created: {
      icon: <BuildIcon style={styles} />,
      color: '#f5ab25',
      label: 'Created'
    },
    Delivered: {
      icon: <StoreIcon style={styles} />,
      color: '#51c151',
      label: 'Retailer'
    },
    Shipped: {
      icon: <LocalShippingIcon style={styles} />,
      color: '#ef6666',
      label: 'Transport'
    },
    Stored: {
      icon: <HomeWorkIcon style={styles} />,
      color: '#6b6be0',
      label: 'Warehouse'
    }
  };
};
