import { OptionsObject } from 'notistack';
import {
  defaultAddress,
  Entity,
  getEntityType,
  getProductState,
  PartialDeliveryRoute,
  Product
} from '../types';

export const convertEntity = (obj: any): Entity => ({
  id: obj.id,
  email: obj.email,
  name: obj.name,
  phoneNumber: obj.phoneNumber,
  set: obj.set,
  approved: obj.approved,
  type: getEntityType(parseInt(obj.entityType))
});

export const convertProduct = (obj: any): Product => {
  return {
    id: obj.id,
    name: obj.name,
    state: getProductState(parseInt(obj.state)),
    creatorID: obj.creatorID,
    creationTimestamp: new Date(parseInt(obj.creationTimestamp) * 1000),
    purchaserID:
      obj.purchaserID === defaultAddress
        ? defaultAddress
        : obj.purcharserAddress,
    deliveryTimestamp:
      obj.purchaserID === defaultAddress
        ? undefined
        : new Date(parseInt(obj.deliveryTimestamp) * 1000)
  };
};

export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNRandom = (collection: any[], n: number) => {
  if (n < collection.length) {
    throw new Error(
      `Collection size too small, n = ${n} size = ${collection.length}`
    );
  }
  let selected = 0;
  const selection = [];
  while (selected < n) {
    const index = getRandomIntInclusive(0, collection.length);
    selection.push(collection[index]);
    collection.splice(index, 1);
    selected += 1;
  }

  return selection;
};

// Route estimation mock
export const getRoute = (
  entities: Entity[],
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => React.ReactText
): PartialDeliveryRoute => {
  const warehouseCount = entities.filter(
    (entity) => entity.type === 'Warehouse'
  ).length;
  const transportCount = entities.length - warehouseCount;
  const max = warehouseCount < transportCount ? warehouseCount : transportCount;

  if (max === 0) {
    enqueueSnackbar('Not enough transport/warehouse companies', {
      variant: 'error'
    });
    return { transport: [], warehouse: [] };
  }

  const transportSteps = max > 1 ? getRandomIntInclusive(1, max) : 1;
  const selectedTransportEntities: Entity[] = getNRandom(
    entities.filter((entity) => entity.type === 'Transport'),
    transportSteps
  );
  const selectedWarehousingEntities: Entity[] =
    transportSteps > 1
      ? getNRandom(
          entities.filter((entity) => entity.type === 'Warehouse'),
          transportSteps - 1
        )
      : [];

  return {
    transport: selectedTransportEntities,
    warehouse: selectedWarehousingEntities
  };
};
