import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validatioErrors: Errors = {};

  err.inner.forEach(error => {
    validatioErrors[error.path] = error.message;
  });

  return validatioErrors;
}
