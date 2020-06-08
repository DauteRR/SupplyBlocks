import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
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
    <>
      <Typography color="primary" className={classes.sadEmoticon}>
        :(
      </Typography>
      <div>
        <Typography variant="h5" color="primary" display="inline">
          {props.errorName + ' error: '}
        </Typography>
        <Typography variant="h5" display="inline">
          {props.errorMessage}
        </Typography>
      </div>
    </>
  );
};

export default ErrorView;
