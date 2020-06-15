import { Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useState } from 'react';
import DeliveryCard from '../../../components/DeliveryCard';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { defaultAddress, Product } from '../../../types';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  grid: {
    margin: theme.spacing(2, 0)
  },
  gridItem: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const DeliveriesList: React.FC<{
  deliveries: Product[];
}> = ({ deliveries }) => {
  const classes = useStyles();
  const [current, setCurrent] = useState('');
  const { timestampDeliveryStep } = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();

  const timestampCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        timestampDeliveryStep(address)
          .then(() => {
            enqueueSnackbar('Timestamped', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [enqueueSnackbar, timestampDeliveryStep]
  );

  return (
    <Container maxWidth="lg">
      <Grid className={classes.grid} container>
        {deliveries
          .filter((delivery) => delivery.purchaserID !== defaultAddress)
          .map((delivery, index) => (
            <Grid key={index} className={classes.gridItem} item xs={12}>
              <DeliveryCard
                disabled={current !== delivery.id && current !== ''}
                transacting={current === delivery.id}
                onTimestampCallback={timestampCallback(delivery.id)}
                {...delivery}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

interface Props {}

const DeliveriesView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState } = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <Title title={'Deliveries'} />
      <DeliveriesList deliveries={globalState.products} />
    </div>
  );
};

export default DeliveriesView;
