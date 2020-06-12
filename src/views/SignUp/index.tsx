import React, { useCallback, useContext } from 'react';
import {
  makeStyles,
  Typography,
  Container,
  CssBaseline,
  Theme
} from '@material-ui/core';
import { SignUpForm, SignUpFormFields } from './Form';
import { Formik, FormikHelpers } from 'formik';
import Logo from '../../components/Logo';
import { SignUpFormValidationSchema } from './ValidationSchema';
import { useSnackbar } from 'notistack';
import { EntityContractContext } from '../../contexts/EntityContract';
import { GlobalContext } from '../../contexts/Global';
import { EntityType, entityTypeConversion } from '../../types';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    margin: theme.spacing(6)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    fontSize: 34,
    color: theme.palette.secondary.main
  },
  title: {
    margin: theme.spacing(4)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface Props {}

export const SignUpView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { globalState, dispatch } = useContext(GlobalContext);
  const { createEntity, getEntity } = useContext(EntityContractContext);

  const submitCallback = useCallback(
    (values: SignUpFormFields, helpers: FormikHelpers<SignUpFormFields>) => {
      createEntity({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        account: globalState.account,
        type: entityTypeConversion[values.type as EntityType]
      })
        .then((result: any) => {
          helpers.setSubmitting(false);
          enqueueSnackbar('Petition send', {
            variant: 'success'
          });
          getEntity(globalState.account).then((entity) => {
            if (entity) {
              dispatch({ type: 'SET_ENTITY', entity: entity });
            }
          });
        })
        .catch((error: any) => {
          helpers.setSubmitting(false);
          enqueueSnackbar('Error sending petition', {
            variant: 'error'
          });
        });
    },
    [createEntity, globalState]
  );

  // TODO: LoadingSpinner and redirect to dashboard after successfull sign-up
  // TODO: Add descriptive text under the title explaining that the petition should be approved by admin
  // TODO: Change component return value if the address is pending of admin approval or the address already is assigned to an existing entity
  return (
    <Container className={classes.root} component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo width={200} smallDevicesWidth={200} />
        <Typography
          className={classes.title}
          component="h1"
          variant="h4"
          align="center"
        >
          Join{' '}
          <Typography className={classes.name} display="inline">
            Supplyblocks
          </Typography>
        </Typography>
        <Formik<SignUpFormFields>
          validationSchema={SignUpFormValidationSchema}
          initialValues={{
            name: '',
            email: '',
            phoneNumber: '',
            type: '',
            awareness: false
          }}
          validateOnMount
          onSubmit={submitCallback}
        >
          {(props) => {
            return <SignUpForm {...props} />;
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUpView;
