import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField, Checkbox, Select } from 'formik-material-ui';
import { Field, FormikProps } from 'formik';
import Grid from '@material-ui/core/Grid';
import {
  FormControlLabel,
  makeStyles,
  Theme,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { EntityType, visibleEntityTypes } from '../../types';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  wrapper: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  selectField: {
    width: '100%'
  }
}));

export interface SignUpFormFields {
  name: string;
  email: string;
  phoneNumber: string;
  type: EntityType | '';
  awareness: boolean;
}

export const SignUpForm: React.FC<FormikProps<SignUpFormFields>> = (props) => {
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
            required
            fullWidth
            id="name"
            label="Company Name"
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            component={TextField}
            variant="outlined"
            required
            fullWidth
            id="phoneNumber"
            label="Phone number"
            name="phoneNumber"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.selectField}>
            <InputLabel>Company type</InputLabel>
            <Field
              component={Select}
              variant="outlined"
              required
              fullWidth
              id="type"
              label="Company type"
              name="type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {visibleEntityTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Field
                type="checkbox"
                component={Checkbox}
                required
                id="awareness"
                name="awareness"
                color="primary"
              />
            }
            label="I'm aware that registering an entity the active Metamask account is associated permanently to that entity."
          />
        </Grid>
      </Grid>
      <div className={classes.wrapper}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submitForm}
          disabled={isSubmitting || !isValid}
        >
          Sign Up
        </Button>
        {isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
};
