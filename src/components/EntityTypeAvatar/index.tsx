import { Avatar, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { EntityType, getEntityTypesData } from '../../types/Entity';

const useStyles = makeStyles<Theme>((theme) => ({
  avatar: {
    width: 60,
    height: 60
  }
}));

interface Props {
  type: EntityType | 'Admin';
}

const entityTypesData = getEntityTypesData({ color: 'white', fontSize: 50 });

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
