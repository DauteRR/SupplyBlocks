import { makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { Product } from '../../../types/Product';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));

interface Props {}

const DeliveriesView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);
  const [products, setProducts] = useState<Product[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const isFactory = globalState.entity.type === 'Factory';

  return (
    <div className={classes.root}>
      {isFactory && (
        <>
          <Title title={'Pending deliveries'} />
          {/* TODO: proper values */}
          {/* <DeliveriesList products={[]} updateCallback={() => {}} /> */}
        </>
      )}
      <Title title={'Products'} />
      {/* TODO: proper values */}
      {/* <DeliveriesList products={[]} updateCallback={() => {}} /> */}
    </div>
  );
};

export default DeliveriesView;
