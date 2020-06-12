import React, { useCallback, useContext, useEffect, useState } from 'react';
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
    height: '100%',
    width: '100%',
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
    margin: theme.spacing(2)
  },
  message: {
    marginBottom: theme.spacing(4),
    color: theme.palette.secondary.main
  },
  text: {
    marginBottom: theme.spacing(4)
  },
  cancelButton: {
    maxWidth: 200,
    background: '#ef6666',
    color: 'white',
    '&:hover': {
      background: '#d85d5d'
    }
  }
}));

interface Props {}

export const SignUpView: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { globalState, dispatch } = useContext(GlobalContext);
  const { createEntity, getEntity } = useContext(EntityContractContext);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [pending, setPending] = useState(false);

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

  useEffect(() => {
    setAlreadyRegistered(globalState.entity.approved);
    setPending(globalState.entity.set && !globalState.entity.approved);
  }, [globalState.entity]);

  return (
    <Container className={classes.root} component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Logo width={260} smallDevicesWidth={260} />
        <Typography
          className={classes.title}
          component="h1"
          variant="h4"
          align="center"
        >
          Send a petition for joining{' '}
          <Typography className={classes.name} display="inline">
            SupplyBlocks
          </Typography>
        </Typography>
        {pending && (
          <Typography className={classes.message} variant="h6" align="center">
            Your petition is being studied
          </Typography>
        )}
        {alreadyRegistered && (
          <Typography className={classes.message} variant="h6" align="center">
            Already registered
          </Typography>
        )}
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
            return (
              <SignUpForm disabled={pending || alreadyRegistered} {...props} />
            );
          }}
        </Formik>
        <Tooltip title="Cancel" aria-label="cancel">
          <Button
            className={classes.cancelButton}
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
