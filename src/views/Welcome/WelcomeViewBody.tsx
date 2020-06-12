import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  Typography,
  Grid
} from '@material-ui/core';
import FactoryPNG from '../../assets/factory.png';
import WarehousePNG from '../../assets/warehouse.png';
import RetailerPNG from '../../assets/retailer.png';
import TransportPNG from '../../assets/transport.png';
import BoxesPNG from '../../assets/boxes.png';
import PresentationPNG from '../../assets/business-presentation.png';
import TrustPNG from '../../assets/handshake.png';
import TrackingPNG from '../../assets/product-delivery-tracking.png';
import VerifiedPNG from '../../assets/result-pass.png';
import SecurityPNG from '../../assets/security.png';
import SupplyChainPNG from '../../assets/supply-chain.png';

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
  agentsTitle: {
    color: 'white',
    margin: theme.spacing(4, 0)
  },
  advantagesTitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(4, 0)
  },
  sentence: {
    color: 'white'
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
  alt: string;
  text?: string;
}

const advantages: Item[] = [
  {
    label: 'Lorem',
    src: TrustPNG,
    alt: 'IPSUM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at.'
  },
  {
    label: 'Lorem',
    src: SecurityPNG,
    alt: 'IPSUM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at.'
  },
  {
    label: 'Lorem',
    src: BoxesPNG,
    alt: 'IPSUM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at.'
  },
  {
    label: 'Lorem',
    src: PresentationPNG,
    alt: 'IPSUM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at.'
  },
  {
    label: 'Lorem',
    src: TrackingPNG,
    alt: 'IPSUM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at.'
  },
  {
    label: 'Lorem',
    src: VerifiedPNG,
    alt: 'IPSUM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus placerat leo, sed egestas libero malesuada at.'
  }
];

const agents: Item[] = [
  {
    label: 'Factory',
    src: FactoryPNG,
    alt: 'Factory'
  },
  {
    label: 'Transport',
    src: TransportPNG,
    alt: 'Transport'
  },
  {
    label: 'Warehouse',
    src: WarehousePNG,
    alt: 'Warehouse'
  },
  {
    label: 'Retailer',
    src: RetailerPNG,
    alt: 'Retailer'
  }
];

interface ItemProps extends Item {
  typographyClassname: string;
}

const Item: React.FC<ItemProps> = (props) => {
  const classes = useStyles();
  const { label, typographyClassname, ...rest } = props;
  return (
    <div className={classes.item}>
      <div className={classes.itemImage}>
        <img {...rest}></img>
      </div>
      <Typography className={typographyClassname} variant="h5" align="center">
        {label}
      </Typography>
      {props.text && <Typography align="center">{props.text}</Typography>}
    </div>
  );
};

const Agents: React.FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.agents}>
      <Typography className={classes.agentsTitle} align="center" variant="h4">
        Multiple agents
      </Typography>
      <Typography className={classes.sentence} align="center" variant="h5">
        Sentence sentence sentence sentence sentence sentence
      </Typography>
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

const Advantages: React.FC = (props) => {
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

interface Props {}

export const WelcomeViewBody: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Advantages />
      <Agents />
    </>
  );
};

export default WelcomeViewBody;
