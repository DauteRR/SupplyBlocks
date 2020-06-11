import React from 'react';
import {
  makeStyles,
  Typography,
  Container,
  CssBaseline,
  Theme
} from '@material-ui/core';
import { SignUpForm, SignUpFormFields } from './Form';
import { Formik } from 'formik';
import Logo from '../../components/Logo';
import { SignUpFormValidationSchema } from './ValidationSchema';
import { useSnackbar } from 'notistack';

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
    color: theme.palette.primary.dark
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
          onSubmit={(values, { setSubmitting }) => {
            // TODO: store values, setSubmitting(false)
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
              enqueueSnackbar('Petition send', {
                variant: 'success'
              });
            }, 3000);
          }}
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
