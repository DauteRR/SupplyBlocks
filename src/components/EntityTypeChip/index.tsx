import React from 'react';
import { Theme, makeStyles, Chip, useTheme } from '@material-ui/core';
import { EntityType, getEntityTypesData } from '../../types';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: theme.spacing(1),
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
  const theme = useTheme();
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
