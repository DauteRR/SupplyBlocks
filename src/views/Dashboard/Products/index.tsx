import { Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { Product } from '../../../types/Product';
import { CreateProductForm } from './Form';
import { CreateProductFormValidationSchema } from './ValidationSchema';

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
  },
  formContainer: {
    marginTop: theme.spacing(6)
  }
}));

const ProductsList: React.FC<{
  products: Product[];
}> = ({ products }) => {
  const classes = useStyles();
  const { purchaseProduct } = useContext(GlobalContext);
  const [current, setCurrent] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const clickCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        purchaseProduct(address)
          .then(() => {
            enqueueSnackbar('Purchased', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [enqueueSnackbar, purchaseProduct]
  );

  return (
    <Grid className={classes.grid} container>
      {products.map((product, index) => (
        <Grid
          key={index}
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={4}
        >
          <ProductCard
            disabled={current !== product.id && current !== ''}
            transacting={current === product.id}
            onClickCallback={clickCallback(product.id)}
            {...product}
          ></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

interface Props {}

const ProductsView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { globalState, createProduct, updateProducts } = useContext(
    GlobalContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const isFactory = globalState.entity.type === 'Factory';

  const submitCallback = useCallback(
    (values: CreateProductForm, helpers: FormikHelpers<CreateProductForm>) => {
      createProduct({
        name: values.name
      })
        .then((result: any) => {
          enqueueSnackbar('Success', {
            variant: 'success'
          });
          updateProducts();
        })
        .catch((error: any) => {
          enqueueSnackbar('Error creating product', {
            variant: 'error'
          });
        })
        .finally(() => helpers.setSubmitting(false));
    },
    [createProduct, enqueueSnackbar, updateProducts]
  );

  if (!globalState.entity.approved) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      {isFactory && (
        <>
          <Title title={'Create product'} />
          <Container maxWidth="xs" className={classes.formContainer}>
            <Formik<CreateProductForm>
              validationSchema={CreateProductFormValidationSchema}
              initialValues={{
                name: ''
              }}
              validateOnMount
              onSubmit={submitCallback}
            >
              {(props) => {
                return <CreateProductForm {...props} />;
              }}
            </Formik>
          </Container>
        </>
      )}
      <Title title={'Products'} />
      <ProductsList products={globalState.products} />
    </div>
  );
};

export default ProductsView;
