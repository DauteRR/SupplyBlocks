import { makeStyles, Theme } from '@material-ui/core';
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
  Product
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

export const getTimelineElements = (
  delivery: Product,
  entities: Entity[],
  theme: Theme
): TimelineElement[] => {
  console.log(delivery);

  if (delivery.deliveryEntities.length < 3) {
    throw new Error('Something is wrong');
  }

  const entityTypesData = getEntityTypesData({ color: 'white', fontSize: 25 });

  const getCommonProps = (key: EntityType) => ({
    dateClassName: customColorStyles(entityTypesData[key].color).customColor,
    iconStyle: {
      backgroundColor: entityTypesData[key].color,
      color: 'white'
    },
    contentStyle: {
      color: 'white',
      backgroundColor: entityTypesData[key].color
    },
    contentArrowStyle: {
      borderRight: `7px solid  ${entityTypesData[key].color}`
    },
    icon: entityTypesData[key].icon
  });

  const elements: TimelineElement[] = [];

  elements.push({
    label: delivery.creationTimestamp.toUTCString(),
    title: 'Created',
    body: <></>,
    ...getCommonProps('Factory')
  });

  return elements;
};