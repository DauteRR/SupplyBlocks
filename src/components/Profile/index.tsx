import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Typography, Theme, makeStyles } from '@material-ui/core';
import { DashboardRoutes } from '../../routes';
import { GlobalContext } from '../../contexts/Global';
import EntityTypeAvatar from '../EntityTypeAvatar';
import { entityTypes } from '../../types';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile: React.FC = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const [entity, setEntity] = useState(globalState.entity);

  useEffect(() => {
    setEntity(globalState.entity);
  }, [globalState.entity]);

  return (
    <div className={classes.root}>
      <EntityTypeAvatar type={entityTypes[entity.type]} />
      <Typography align="center" className={classes.name} variant="h5">
        {entity.name}
      </Typography>
      <Typography align="center" variant="body2">
        {entity.email}
      </Typography>
      <Typography align="center" variant="body2">
        {entity.phoneNumber}
      </Typography>
    </div>
  );
};

export default Profile;