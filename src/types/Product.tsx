import BuildIcon from '@material-ui/icons/Build';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreIcon from '@material-ui/icons/Store';
import React from 'react';
import { Address } from './Entity';

const productTypes = ['Created', 'Shipped', 'Stored', 'Delivered'] as const;

export type ProductState = typeof productTypes[number];

export interface Product {
  id: Address;
  name: string;
  state: ProductState;
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

export const getProductState = (id: number): ProductState => {
  return productTypes[id];
};

export const getProductStatesData = (
  style: React.CSSProperties
): {
  [key in ProductState]: ProductStateData;
} => {
  return {
    Created: {
      icon: <BuildIcon style={style} />,
      color: '#f5ab25',
      label: 'Created'
    },
    Delivered: {
      icon: <StoreIcon style={style} />,
      color: '#51c151',
      label: 'Retailer'
    },
    Shipped: {
      icon: <LocalShippingIcon style={style} />,
      color: '#ef6666',
      label: 'Transport'
    },
    Stored: {
      icon: <HomeWorkIcon style={style} />,
      color: '#6b6be0',
      label: 'Warehouse'
    }
  };
};
