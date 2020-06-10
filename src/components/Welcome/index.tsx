import React from 'react';
import {
  makeStyles,
  Typography,
  Theme,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import Logo from '../Logo';

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
    marginBottom: theme.spacing(4)
  }),
  name: () => ({
    fontSize: 34,
    color: theme.palette.primary.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: 48
    }
  }),
  logo: () => ({
    marginTop: theme.spacing(4),
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 300
    },
    marginBottom: theme.spacing(4)
  })
}));

interface Props {}

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
    </div>
  );
};

export default Welcome;
