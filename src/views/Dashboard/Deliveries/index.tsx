import { Button, makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';

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
  const { enqueueSnackbar } = useSnackbar();
  const isFactory = globalState.entity.type === 'Factory';

  const callback = () => {
    console.log(globalState.products);
  };

  return (
    <div className={classes.root}>
      <Title title={'Deliveries'} />
      {/* TODO: proper values */}
      {/* <DeliveriesList products={[]} updateCallback={() => {}} /> */}
      <Button onClick={callback}>Test</Button>
    </div>
  );
};

export default DeliveriesView;
