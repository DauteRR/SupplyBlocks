import { Entity } from './Entity';

export * from './Entity';
export * from './Product';

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface PartialDeliveryRoute {
  transport: Entity[];
  warehouse: Entity[];
}
