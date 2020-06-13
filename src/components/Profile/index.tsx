import { makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts/Global';
import { getEntityType } from '../../types/Entity';
import EntityTypeAvatar from '../EntityTypeAvatar';
import EntityTypeChip from '../EntityTypeChip';

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
      <EntityTypeAvatar type={getEntityType(entity.type)} />
      <Typography align="center" className={classes.name} variant="h5">
        {entity.name}
      </Typography>
      <Typography align="center" variant="body2">
        {entity.email}
      </Typography>
      <Typography align="center" variant="body2">
        {entity.phoneNumber}
      </Typography>
      <EntityTypeChip showIcon={false} type={getEntityType(entity.type)} />
    </div>
  );
};

export default Profile;
