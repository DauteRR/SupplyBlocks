import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import LogoPNG from '../../assets/logo.png';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  logo: {
    marginTop: theme.spacing(4),
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 240
    },
    marginBottom: theme.spacing(4)
  }
}));

interface Props {}

export const Logo: React.FC<Props> = (props) => {
  const classes = useStyles();
  return <img className={classes.logo} src={LogoPNG} alt="Supplyblocks Logo" />;
};

export default Logo;
