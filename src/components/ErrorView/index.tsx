import React from 'react';
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';

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
      <Typography align="center" variant="h5" color="primary">
        {props.errorName + ' error'}
      </Typography>
      <Typography align="center" variant="h5">
        {props.errorMessage}
      </Typography>
    </>
  );
};

export default ErrorView;
