import React, { useCallback } from 'react';
import { makeStyles, Typography, Button, Theme } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Welcome from '../Welcome';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  message: () => ({
    padding: theme.spacing(2)
  }),
  icon: () => ({
    fontSize: 50
  }),
  root: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  button: () => ({
    maxWidth: 200
  })
}));

interface Props {
  flagSetter: (value: boolean) => void;
}

export const EnableMetamask: React.FC<Props> = (props) => {
  const classes = useStyles();

  const callback = useCallback(() => {
    window.ethereum
      .enable()
      .then(() => props.flagSetter(true))
      .catch(() => {});
  }, [props]);

  return (
    <div className={classes.root}>
      <Welcome />
      <WarningRoundedIcon className={classes.icon} color="primary" />
      <Typography className={classes.message} align="center">
        In order to use the dapp Metamask should have account authorization
      </Typography>
      <Button
        color="primary"
        className={classes.button}
        variant="contained"
        onClick={callback}
      >
        Enable Metamask
      </Button>
    </div>
  );
};

export default EnableMetamask;
