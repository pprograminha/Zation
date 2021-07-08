import { ValidationError } from 'yup';

interface IValidatedErrors {
  [key: string]: string;
}
export default function getValidationErrors(
  error: ValidationError,
): IValidatedErrors {
  const validatedErrors: IValidatedErrors = {};

  error.inner.forEach(err => {
    if (err.path) validatedErrors[err.path] = err.message;
  });

  return validatedErrors;
}
