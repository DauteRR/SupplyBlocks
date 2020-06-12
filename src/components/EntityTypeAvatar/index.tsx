import React from 'react';
import { Avatar, Theme, makeStyles } from '@material-ui/core';
import { EntityType, getEntityTypesData } from '../../types';

const useStyles = makeStyles<Theme>((theme) => ({
  avatar: {
    width: 60,
    height: 60
  },
  icon: {
    fontSize: 50
  }
}));

interface Props {
  type: EntityType | 'Admin';
}

const entityTypesData = getEntityTypesData('white', 50);

const EntityTypeAvatar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const data = entityTypesData[props.type];
  return (
    <Avatar
      style={{ background: data.color }}
      alt="Company logo"
      variant="square"
      className={classes.avatar}
    >
      {data.icon}
    </Avatar>
  );
};

export default EntityTypeAvatar;
