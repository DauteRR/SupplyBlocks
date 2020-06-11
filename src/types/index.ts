export const entityTypes = [
  'None',
  'Admin',
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export const visibleEntityTypes = [
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export type EntityType = typeof entityTypes[number];

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
