import React from 'react';
import {
  makeStyles,
  Theme,
  Toolbar,
  AppBar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  toolbar: {
    background: '#352f2f',
    display: 'flex',
    justifyContent: 'center'
  }
}));

interface Props {}

export const WelcomeTopbar: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography align="center" variant="h4">
          Supplyblocks
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default WelcomeTopbar;
