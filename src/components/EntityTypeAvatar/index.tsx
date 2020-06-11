import React, { useState, useContext, useEffect } from 'react';
import { Avatar, Typography, Theme, makeStyles } from '@material-ui/core';
import { GlobalContext } from '../../contexts/Global';
import { EntityType } from '../../types';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StarIcon from '@material-ui/icons/Star';
import StoreIcon from '@material-ui/icons/Store';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ErrorIcon from '@material-ui/icons/Error';
import BuildIcon from '@material-ui/icons/Build';

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

interface TypeData {
  icon: JSX.Element;
  color: string;
}

const getTypeData = (
  type: EntityType | 'Admin',
  classes: Record<string, string>
): TypeData => {
  switch (type) {
    case 'Admin':
      return {
        icon: <StarIcon classes={{ root: classes.icon }} />,
        color: 'gold'
      };
    case 'Factory':
      return {
        icon: <BuildIcon classes={{ root: classes.icon }} />,
        color: '#f5ab25'
      };
    case 'Retailer':
      return {
        icon: <StoreIcon classes={{ root: classes.icon }} />,
        color: '#51c151'
      };
    case 'Transport':
      return {
        icon: <LocalShippingIcon classes={{ root: classes.icon }} />,
        color: '#ef6666'
      };
    case 'Warehouse':
      return {
        icon: <HomeWorkIcon classes={{ root: classes.icon }} />,
        color: '#6b6be0'
      };
    default:
      return {
        icon: <ErrorIcon classes={{ root: classes.icon }} />,
        color: 'black'
      };
  }
};

const EntityTypeAvatar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const data = getTypeData(props.type, classes);
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
