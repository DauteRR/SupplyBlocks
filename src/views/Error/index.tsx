import React from 'react';
import { makeStyles, Typography, Container, Theme } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sadEmoticon: {
    fontSize: 152
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  errorNameBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  messageBox: {
    marginBottom: theme.spacing(4)
  }
}));

interface Props {
  errorName: string;
  errorMessage: string;
}

export const ErrorView: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography color="secondary" className={classes.sadEmoticon}>
        :(
      </Typography>
      <div className={classes.errorNameBox}>
        <WarningRoundedIcon
          fontSize="large"
          className={classes.icon}
          color="secondary"
        />
        <Typography align="center" variant="h5" color="secondary">
          {props.errorName + ' error'}
        </Typography>
      </div>
      <Typography className={classes.messageBox} align="center" variant="h5">
        {props.errorMessage}
      </Typography>
      {props.children}
    </Container>
  );
};

export default ErrorView;
