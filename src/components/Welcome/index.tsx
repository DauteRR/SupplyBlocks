import React from 'react';
import {
  makeStyles,
  Typography,
  Theme,
  useTheme,
  useMediaQuery,
  Card,
  Grid,
  GridSize,
  Container
} from '@material-ui/core';
import Logo from '../Logo';
import TruckIconPNG from '../../assets/TruckIcon.png';
import FactoryIconPNG from '../../assets/FactoryIcon.png';
import RetailerIconPNG from '../../assets/RetailerIcon.png';
import WarehouseIconPNG from '../../assets/WarehouseIcon.png';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  title: () => ({
    marginBottom: theme.spacing(1)
  }),
  subtitle: () => ({
    marginBottom: theme.spacing(8)
  }),
  name: () => ({
    fontSize: 34,
    color: theme.palette.primary.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: 48
    }
  }),
  iconCard: () => ({
    borderRadius: '50%',
    height: 0,
    width: '100%',
    paddingBottom: '100%'
  }),
  icon: () => ({
    width: '100%',
    height: 'auto'
  }),
  gridRoot: () => ({
    flexGrow: 1,
    marginBottom: theme.spacing(4)
  }),
  gridItem: () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}));

interface GridItemType {
  isIcon: boolean;
  element: string;
  size: GridSize;
}

const GridItems: GridItemType[] = [
  {
    isIcon: true,
    element: FactoryIconPNG,
    size: 3
  },
  {
    isIcon: false,
    element:
      'Factories and manufactures registry their goods in the chain, allowing product tracking to supply chain agents',
    size: 9
  },
  {
    isIcon: false,
    element:
      'Transport companies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu tortor ultricies sem vulputate aliquam. Etiam ligula odio, blandit vitae lectus sit amet, feugiat sagittis magna. ',
    size: 9
  },
  {
    isIcon: true,
    element: TruckIconPNG,
    size: 3
  },

  {
    isIcon: true,
    element: WarehouseIconPNG,
    size: 3
  },
  {
    isIcon: false,
    element:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu tortor ultricies sem vulputate aliquam. Etiam ligula odio, blandit vitae lectus sit amet, feugiat sagittis magna. ',
    size: 9
  },
  {
    isIcon: false,
    element:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu tortor ultricies sem vulputate aliquam. Etiam ligula odio, blandit vitae lectus sit amet, feugiat sagittis magna. ',
    size: 9
  },
  {
    isIcon: true,
    element: RetailerIconPNG,
    size: 3
  }
];

const GridItem: React.FC<GridItemType> = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.gridItem} item xs={props.size}>
      {props.isIcon ? (
        <Card className={classes.iconCard}>
          <img className={classes.icon} src={props.element}></img>
        </Card>
      ) : (
        <Typography>{props.element}</Typography>
      )}
    </Grid>
  );
};

interface Props {}

//FIXME: Horizontal scroll CSS issue

export const Welcome: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <div className={classes.root}>
      <Logo />
      <Typography
        className={classes.title}
        variant={smallDevice ? 'h4' : 'h3'}
        align="center"
      >
        Welcome to{' '}
        <Typography className={classes.name} display="inline">
          Supplyblocks
        </Typography>
      </Typography>
      <Typography align="center" variant="h6" className={classes.subtitle}>
        Blockchain applied to supply chain orchestration.
      </Typography>
      <Container maxWidth="md" className={classes.gridRoot}>
        <Grid container spacing={3}>
          {GridItems.map((item, index) => (
            <GridItem key={index} {...item} />
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Welcome;
