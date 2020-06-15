export * from './Entity';
export * from './Product';

declare global {
  interface Window {
    ethereum: any;
  }
}
