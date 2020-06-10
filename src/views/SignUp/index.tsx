import React from 'react';
import { makeStyles, Typography, Button, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

interface Props {}

export const SignUpView: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align="center">
        New Supplyblocks user? Let's create an account!
      </Typography>
      <Button
        color="primary"
        variant="contained"
        // onClick={callback}
      >
        JOIN
      </Button>
    </div>
  );
};

export default SignUpView;
