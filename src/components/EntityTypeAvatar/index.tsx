import React from 'react';
import { Avatar, Theme, makeStyles } from '@material-ui/core';
import { EntityType, getEntityTypeData } from '../../types';

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

const EntityTypeAvatar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const data = getEntityTypeData(props.type, classes);
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
