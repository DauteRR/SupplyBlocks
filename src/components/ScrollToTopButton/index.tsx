import { Button, makeStyles, Theme } from '@material-ui/core';
import React, { useCallback } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    maxWidth: 240,
    margin: theme.spacing(4),
    color: 'white'
  }
}));

interface Props {}

export const ScrollToTopButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Button
      color="secondary"
      variant="contained"
      className={classes.root}
      fullWidth
      onClick={useCallback(
        () => window.scroll({ top: 0, left: 0, behavior: 'smooth' }),
        []
      )}
    >
      Scroll to top
    </Button>
  );
};

export default ScrollToTopButton;
