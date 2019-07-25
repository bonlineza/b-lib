/** @format */

// @flow

/**
 * Example Error Formatting Object

 const errorFormatting = [
 {
    field: 'nomination_email',
    condition: 'unique',
    message: 'VALIDATION-email_in_use',
  },
 ];
 */
type ErrorFormat = {
  field: String,
  condition: String,
  message: String,
};

export default (
  errors: Object,
  errorFormatting: Array<ErrorFormat>,
): Object => {
  const formattedErrors = {
    ...errors,
  };

  errorFormatting.forEach((errorFormat: ErrorFormat) => {
    if (
      Object.prototype.hasOwnProperty.call(errors, errorFormat.field) &&
      errors[errorFormat.field][0] === errorFormat.condition
    ) {
      formattedErrors[errorFormat.field] = errorFormat.message;
    }
  });
  return formattedErrors;
};

export const interpretErrorMessage = (
  error: Object,
  customMessage: String,
): String => {
  const message = customMessage || 'RESULT-ERROR-retrieving_data';
  return message.replace(
    ':error_code',
    error.status || 'RESULT-ERROR-network_down',
  );
};
