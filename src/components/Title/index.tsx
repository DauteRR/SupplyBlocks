import { Divider, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  divider: {
    backgroundColor: theme.palette.primary.main
  },
  title: {
    padding: theme.spacing(0, 2)
  }
}));

const Title: React.FC<{ title: string }> = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4" color="primary">
        {title}
        <Divider className={classes.divider} />
      </Typography>
    </div>
  );
};

export default Title;
