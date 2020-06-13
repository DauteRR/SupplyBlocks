import * as Yup from 'yup';
import { visibleEntityTypes } from '../../types/Entity';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SignUpFormValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(30, 'Name must be at most 30 characters')
    .min(4, 'Name must be at least 4 characters'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Contact phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  awareness: Yup.bool().oneOf([true], 'Field must be checked'),
  type: Yup.string().required().oneOf(visibleEntityTypes)
});
