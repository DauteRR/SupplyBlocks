import { Chip, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { EntityType, getEntityTypesData } from '../../types/Entity';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: '0px'
  }
}));

interface Props {
  type: EntityType | 'Admin';
  showIcon: boolean;
}

const entityTypesData = getEntityTypesData('white', 25);

const EntityTypeChip: React.FC<Props> = (props) => {
  const classes = useStyles();
  const data = entityTypesData[props.type];
  return (
    <Chip
      style={{
        background: data.color,
        color: 'white'
      }}
      className={classes.root}
      icon={props.showIcon ? data.icon : undefined}
      label={data.label}
      variant="outlined"
    />
  );
};

export default EntityTypeChip;
