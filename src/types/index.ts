export const EntityTypes = [
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export type EntityType = typeof EntityTypes[number];
