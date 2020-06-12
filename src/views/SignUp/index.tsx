import React, { useCallback, useContext } from 'react';
import {
  makeStyles,
  Typography,
  Container,
  Theme,
  Tooltip,
  Button
} from '@material-ui/core';
import { SignUpForm, SignUpFormFields } from './Form';
import { Formik, FormikHelpers } from 'formik';
import Logo from '../../components/Logo';
import { SignUpFormValidationSchema } from './ValidationSchema';
import { useSnackbar } from 'notistack';
import { EntityContractContext } from '../../contexts/EntityContract';
import { GlobalContext } from '../../contexts/Global';
import { EntityType, entityTypeConversion } from '../../types';
import { ApplicationRoutes } from '../../routes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center'
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
  },
  text: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(4)
  },
  cancelButton: {
    maxWidth: 200,
    background: 'linear-gradient(45deg, #ef6666 30%, #ef6666 90%)',
    color: 'white'
  }
}));

interface Props {}

export const SignUpView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { globalState, dispatch } = useContext(GlobalContext);
  const { createEntity, getEntity } = useContext(EntityContractContext);
  let history = useHistory();

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
            SupplyBlocks
          </Typography>
        </Typography>
        <Typography className={classes.text} variant="h6" align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus
          placerat leo, sed egestas libero malesuada at
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
        <Tooltip title="Cancel" aria-label="cancel">
          <Button
            classes={{
              contained: classes.cancelButton
            }}
            fullWidth
            variant="contained"
            onClick={useCallback(() => {
              history.push(ApplicationRoutes.welcome.path);
            }, [history])}
          >
            Cancel
          </Button>
        </Tooltip>
      </div>
    </Container>
  );
};

export default SignUpView;
