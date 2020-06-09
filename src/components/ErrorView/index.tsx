import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
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
  }
});

interface Props {
  errorName: string;
  errorMessage: string;
}

export const ErrorView: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography color="primary" className={classes.sadEmoticon}>
        :(
      </Typography>
      <Typography align="center" variant="h5" color="primary">
        {props.errorName + ' error'}
      </Typography>
      <Typography align="center" variant="h5">
        {props.errorMessage}
      </Typography>
    </div>
  );
};

export default ErrorView;
