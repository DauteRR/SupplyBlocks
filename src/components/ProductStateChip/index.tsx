import { Chip, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { getProductStatesData, ProductState } from '../../types/Product';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: '0px'
  }
}));

interface Props {
  state: ProductState;
  showIcon: boolean;
}

const productStatesData = getProductStatesData({
  color: 'white',
  fontSize: 25
});

const ProductStateChip: React.FC<Props> = (props) => {
  const classes = useStyles();
  const data = productStatesData[props.state];
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

export default ProductStateChip;
