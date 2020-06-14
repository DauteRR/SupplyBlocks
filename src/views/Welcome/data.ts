import { makeStyles } from '@material-ui/core';
import PresentationPNG from '../../assets/business-presentation.png';
import CostsPNG from '../../assets/costs.png';
import FactoryPNG from '../../assets/factory.png';
import TrustPNG from '../../assets/handshake.png';
import TrackingPNG from '../../assets/product-delivery-tracking.png';
import VerifiedPNG from '../../assets/result-pass.png';
import RetailerPNG from '../../assets/retailer.png';
import SecurityPNG from '../../assets/security.png';
import TransportPNG from '../../assets/transport.png';
import WarehousePNG from '../../assets/warehouse.png';
import { TimelineElement } from '../../components/Timeline';
import { EntityType, getEntityTypesData } from '../../types/Entity';

export interface ItemData {
  label: string;
  src: string;
  text?: string;
}

export const advantages: ItemData[] = [
  {
    label: 'Trust',
    src: TrustPNG,
    text:
      'Enhanced trust between supply chain parties due to the immutability and crowd-validation features that Blockchain ensures.'
  },
  {
    label: 'Security',
    src: SecurityPNG,
    text:
      'Blockchain cryptography mechanisms increments the overall security of the processes involved in supply chain.'
  },
  {
    label: 'Expenses',
    src: CostsPNG,
    text:
      'Supply chain agents can transact with each other without the need for intermediaries, reducing significantly the expenses of their processes.'
  },
  {
    label: 'Business Intelligence',
    src: PresentationPNG,
    text:
      'Recollected data could be used for detect deficiencies in the supply chain processes with the goal of perform corrective measures accurately.'
  },
  {
    label: 'Traceability',
    src: TrackingPNG,
    text:
      'Each supply chain agent know at any moment the exact state of a delivery, without error or tampering possibilities.'
  },
  {
    label: 'Auditabiliy',
    src: VerifiedPNG,
    text:
      'Shipments carried out are recorded permanently and can be audited by any agent in the supply chain.'
  }
];

export const agents: ItemData[] = [
  {
    label: 'Factories and manufacturers',
    src: FactoryPNG
  },
  {
    label: 'Transport companies',
    src: TransportPNG
  },
  {
    label: 'Warehousing companies',
    src: WarehousePNG
  },
  {
    label: 'Retailers and small businesses',
    src: RetailerPNG
  }
];

const customStyles = (color: string) => {
  const customUseStyles = makeStyles(() => ({
    elementSideText: {
      color: color
    }
  }));
  const customClasses = customUseStyles();
  return customClasses;
};

export const getTimelineElements = (): TimelineElement[] => {
  const entityTypesData = getEntityTypesData({ color: 'white', fontSize: 25 });

  const getCommonProps = (key: EntityType) => ({
    dateClassName: customStyles(entityTypesData[key].color).elementSideText,
    iconStyle: {
      backgroundColor: entityTypesData[key].color,
      color: 'white'
    },
    contentStyle: {
      backgroundColor: entityTypesData[key].color,
      color: 'white'
    },
    contentArrowStyle: {
      borderRight: `7px solid  ${entityTypesData[key].color}`
    },
    icon: entityTypesData[key].icon
  });

  return [
    {
      label: 'Factory',
      title: 'Registry',
      text: 'Factories and manufacturers creates and registry their goods',
      ...getCommonProps('Factory')
    },
    {
      label: 'Retailer',
      title: 'Purchase',
      text: 'Retailers and small businesses purchase registered products',
      ...getCommonProps('Retailer')
    },
    {
      label: 'SupplyBlocks',
      title: 'Delivery route',
      text:
        'SupplyBlocks "autonomously calculates" the route for delivering the purchased products by retailers and small businesses, composed of transport and warehousing companies',
      ...getCommonProps('Admin')
    },
    {
      label: 'Transport',
      title: 'Delivery - Transport 1',
      text:
        'Assigned transport company moves the products to the next point on the route, which may be the end customer or a warehouse. In both cases the transport company registers that the product has been delivered',
      ...getCommonProps('Transport')
    },
    {
      label: 'Warehouse',
      title: 'Delivery - Warehouse',
      text:
        'Products are kept in the warehouse until a transport company picks them up for delivery. When products leave the warehouse the warehousing company registers this information',
      ...getCommonProps('Warehouse')
    },
    {
      label: 'Transport',
      title: 'Delivery - Transport 2',
      text:
        'Again, assigned transport company moves the products to the next point on the route (this cycle could be reproduced repeatedly)',
      ...getCommonProps('Transport')
    },
    {
      label: 'Retailer',
      title: 'Delivery - Retailer',
      text:
        'Once the products are delivered, the buyer records the delivery and the process ends',
      ...getCommonProps('Retailer')
    }
  ];
};
