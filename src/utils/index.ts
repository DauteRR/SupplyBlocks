import { OptionsObject } from 'notistack';
import {
  Address,
  defaultAddress,
  Entity,
  getEntityType,
  getProductState,
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
      obj.purchaserID === defaultAddress ? defaultAddress : obj.purchaserID,
    deliveryEntities: obj.deliveryEntities,
    deliveryTimestamps: obj.deliveryTimestamps.map(
      (timestamp: string) => new Date(parseInt(timestamp) * 1000)
    ),
    deliveryStep: parseInt(obj.deliveryStep)
  };
};

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNRandom = (arr: any[], n: number) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

// Route estimation mock
export const getRoute = (
  entities: Entity[],
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => React.ReactText
): Address[] => {
  const warehouseCount = entities.filter(
    (entity) => entity.type === 'Warehouse'
  ).length;
  const transportCount = entities.length - warehouseCount;
  const max =
    warehouseCount + 1 < transportCount ? warehouseCount + 1 : transportCount;

  if (max === 0) {
    enqueueSnackbar('Not enough transport/warehouse companies', {
      variant: 'error'
    });
    return [];
  }

  const transportSteps = max > 1 ? getRandomIntInclusive(1, max) : 1;
  const selectedTransportEntities: Entity[] = getNRandom(
    entities.filter((entity) => entity.type === 'Transport'),
    transportSteps
  );
  const warehouseSteps = transportSteps - 1;
  const selectedWarehousingEntities: Entity[] =
    transportSteps > 1
      ? getNRandom(
          entities.filter((entity) => entity.type === 'Warehouse'),
          warehouseSteps
        )
      : [];

  const route: Address[] = [];
  for (let i = 0; i < selectedTransportEntities.length; ++i) {
    if (i > 0) {
      route.push(selectedWarehousingEntities[i - 1].id);
    }
    route.push(selectedTransportEntities[i].id);
  }

  return route;
};
