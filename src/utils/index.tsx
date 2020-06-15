import { makeStyles, Theme, Typography } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { OptionsObject } from 'notistack';
import React from 'react';
import { TimelineElement } from '../components/Timeline';
import {
  Address,
  defaultAddress,
  Entity,
  EntityType,
  getEntityType,
  getEntityTypesData,
  getProductState,
  Product,
  ProductState
} from '../types';

export const customColorStyles = (color: string) => {
  const customUseStyles = makeStyles(() => ({
    customColor: {
      color: color
    }
  }));
  const customClasses = customUseStyles();
  return customClasses;
};

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

const entityTypeToProductState = (type: EntityType): ProductState => {
  switch (type) {
    case 'Factory':
      return 'Prepared';
    case 'Retailer':
      return 'Delivered';
    case 'Transport':
      return 'Shipped';
    case 'Warehouse':
      return 'Stored';
    default:
      throw new Error('Something is wrong');
  }
};

const entityTypesData = getEntityTypesData({ color: 'white', fontSize: 25 });

const getCommonProps = (key: EntityType, grey?: boolean) => ({
  dateClassName: customColorStyles(grey ? 'grey' : entityTypesData[key].color)
    .customColor,
  iconStyle: {
    backgroundColor: grey ? 'grey' : entityTypesData[key].color,
    color: 'white'
  },
  contentStyle: {
    color: 'white',
    backgroundColor: grey ? 'grey' : entityTypesData[key].color
  },
  contentArrowStyle: {
    borderRight: `7px solid  ${grey ? 'grey' : entityTypesData[key].color}`
  },
  icon: entityTypesData[key].icon
});

const getEntity = (id: Address, entities: Entity[]): Entity => {
  const filtered = entities.filter((entity) => entity.id === id);
  if (filtered.length !== 1) {
    throw new Error('Something is wrong');
  }
  return filtered[0];
};

const fingerprint = (id: Address, theme: Theme) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FingerprintIcon style={{ marginRight: theme.spacing(1) }} />
      <Typography style={{ fontSize: 10 }}>{id}</Typography>
    </div>
  );
};

export const getTimelineElements = (
  delivery: Product,
  entities: Entity[],
  theme: Theme
): TimelineElement[] => {
  const {
    purchaserID,
    deliveryEntities,
    deliveryTimestamps,
    creationTimestamp,
    deliveryStep
  } = delivery;

  if (delivery.state === 'Created' && purchaserID === defaultAddress) {
    return [];
  }

  const elements: TimelineElement[] = [];
  elements.push({
    title: creationTimestamp.toUTCString(),
    label: 'Created',
    body: fingerprint(delivery.creatorID, theme),
    ...getCommonProps('Factory')
  });

  for (let i = 0; i < deliveryTimestamps.length; ++i) {
    const pending = deliveryStep <= i;
    const currentEntity = getEntity(deliveryEntities[i], entities);
    elements.push({
      label: entityTypeToProductState(currentEntity.type),
      title: pending ? '-' : delivery.deliveryTimestamps[i].toUTCString(),
      body: fingerprint(currentEntity.id, theme),
      ...getCommonProps(currentEntity.type, pending)
    });
  }

  return elements;
};
