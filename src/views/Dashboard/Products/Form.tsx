import {
  CircularProgress,
  makeStyles,
  Theme,
  Tooltip
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Field, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  wrapper: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  submit: {
    color: 'white'
  }
}));

export interface CreateProductForm {
  name: string;
}

interface Props extends FormikProps<CreateProductForm> {}

export const CreateProductForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { submitForm, isSubmitting, isValid } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={TextField}
            variant="outlined"
            color="secondary"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
          />
        </Grid>
      </Grid>
      <div className={classes.wrapper}>
        <Tooltip title="Create product" aria-label="create-product">
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={submitForm}
              disabled={isSubmitting || !isValid}
            >
              Create product
            </Button>
          </div>
        </Tooltip>
        {isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
};
