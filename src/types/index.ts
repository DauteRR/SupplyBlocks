export const EntityTypes = [
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export type EntityType = typeof EntityTypes[number];

export interface Entity {
  name: string;
  email: string;
  phoneNumber: string;
  type: number;
}

export const entityTypeConversion: { [key in EntityType]: number } = {
  Factory: 1,
  Transport: 2,
  Warehouse: 3,
  Retailer: 4
};
