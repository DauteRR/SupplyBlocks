import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  useMediaQuery,
  Typography,
  Grid
} from '@material-ui/core';
import FactoryPNG from '../../assets/factory.png';
import WarehousePNG from '../../assets/warehouse.png';
import RetailerPNG from '../../assets/retailer.png';
import TransportPNG from '../../assets/transport.png';

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
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(4)
  },
  agentsTitle: {
    color: 'white',
    marginBottom: theme.spacing(4)
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
    flexDirection: 'column'
  },
  itemImage: {
    width: 126,
    height: 126,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: theme.spacing(2)
  },
  itemLabel: {
    color: 'white'
  }
}));

interface ItemProps {
  label: string;
  src: string;
  alt: string;
}

const agents: ItemProps[] = [
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

const Item: React.FC<ItemProps> = (props) => {
  const classes = useStyles();
  const { label, ...rest } = props;
  return (
    <div className={classes.item}>
      <div className={classes.itemImage}>
        <img {...rest}></img>
      </div>
      <Typography className={classes.itemLabel} variant="h5" align="center">
        {label}
      </Typography>
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
      <Grid className={classes.itemsGrid} container spacing={4}>
        {agents.map((agent, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Item {...agent} />
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
      <div className={classes.advantages}></div>
      <Agents />
    </>
  );
};

export default WelcomeViewBody;
