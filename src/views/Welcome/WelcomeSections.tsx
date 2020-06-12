import React from 'react';
import {
  makeStyles,
  Theme,
  Typography,
  Grid,
  Container
} from '@material-ui/core';
import FactoryPNG from '../../assets/factory.png';
import WarehousePNG from '../../assets/warehouse.png';
import RetailerPNG from '../../assets/retailer.png';
import TransportPNG from '../../assets/transport.png';
import CostsPNG from '../../assets/costs.png';
import PresentationPNG from '../../assets/business-presentation.png';
import TrustPNG from '../../assets/handshake.png';
import TrackingPNG from '../../assets/product-delivery-tracking.png';
import VerifiedPNG from '../../assets/result-pass.png';
import SecurityPNG from '../../assets/security.png';
import Timeline, { TimelineElement } from '../../components/Timeline';
import { getEntityTypesData, EntityType } from '../../types';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  advantages: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 600
  },
  agents: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 400,
    backgroundColor: theme.palette.secondary.light
  },
  howDoesItWork: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 400
  },
  agentsTitle: {
    color: 'white',
    margin: theme.spacing(4, 0)
  },
  advantagesTitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(4, 0)
  },
  howDoesItWorkTitle: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(4, 0)
  },
  agentsSentence: {
    color: 'white',
    marginBottom: theme.spacing(4)
  },
  howDoesItWorkSentence: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(4)
  },
  itemsGrid: {
    margin: theme.spacing(2, 0)
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(0, 6, 6)
  },
  itemImage: {
    width: 126,
    height: 126,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: theme.spacing(2)
  },
  agentLabel: {
    color: 'white'
  },
  advantageLabel: {
    color: theme.palette.primary.main
  }
}));

interface Item {
  label: string;
  src: string;
  text?: string;
}

const advantages: Item[] = [
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

const agents: Item[] = [
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

interface ItemProps extends Item {
  typographyClassname: string;
}

const Item: React.FC<ItemProps> = (props) => {
  const classes = useStyles();
  const { label, typographyClassname, src, text } = props;
  return (
    <div className={classes.item}>
      <div className={classes.itemImage}>
        <img alt={text} src={src}></img>
      </div>
      <Typography className={typographyClassname} variant="h5" align="center">
        {label}
      </Typography>
      {props.text && <Typography align="center">{props.text}</Typography>}
    </div>
  );
};

export const Agents: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.agents}>
      <Typography className={classes.agentsTitle} align="center" variant="h4">
        Supply chain agents
      </Typography>
      <Container maxWidth="md">
        <Typography
          className={classes.agentsSentence}
          align="center"
          variant="h5"
        >
          SuppyBlocks usage is intended to aid supply chain management for
          different kind of companies:
        </Typography>
      </Container>
      <Grid className={classes.itemsGrid} container>
        {agents.map((agent, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Item typographyClassname={classes.agentLabel} {...agent} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export const Advantages: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.advantages}>
      <Typography
        className={classes.advantagesTitle}
        align="center"
        variant="h4"
      >
        Advantages
      </Typography>
      <Grid className={classes.itemsGrid} container>
        {advantages.map((agent, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <Item typographyClassname={classes.advantageLabel} {...agent} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const customStyles = (color: string) => {
  const customUseStyles = makeStyles(() => ({
    elementSideText: {
      color: color
    }
  }));
  const customClasses = customUseStyles();
  return customClasses;
};

const getTimelineElements = (): TimelineElement[] => {
  const entityTypesData = getEntityTypesData('white', 25);

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
        'SupplyBlocks "autonomously calculates" the route for delivering the purchased products by retailers and small businesses, composed of transport and warehousing companies. The delivery starts when the involved agents accepts',
      ...getCommonProps('Admin')
    },
    {
      label: 'Transport',
      title: 'Delivery - Transport 1',
      text:
        'Assigned transport company moves the products to the next point on the route, which may be the end customer (one-transport route) or a warehouse. In both cases the transport company registers that the product has been delivered',
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

export const HowDoesItWork: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.howDoesItWork}>
      <Typography
        className={classes.howDoesItWorkTitle}
        align="center"
        variant="h4"
      >
        How does it work?
      </Typography>
      <Container maxWidth="md">
        <Typography
          className={classes.howDoesItWorkSentence}
          align="center"
          variant="h5"
        >
          The following timeline briefly illustrates how SupplyBlocks works.
          Every action described is timestamped and added to the blockchain:
        </Typography>
      </Container>
      <Timeline elements={getTimelineElements()} />
    </div>
  );
};
