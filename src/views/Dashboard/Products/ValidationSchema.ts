import * as Yup from 'yup';

export const CreateProductFormValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(30, 'Name must be at most 30 characters')
    .min(4, 'Name must be at least 4 characters')
});
