/**
 * Converts validation JSON response for form fields to our custom Error message shape
 * Example Response:
 *  fieldname: 'reason for error'
 *
 * Required shape:
 * {
 *  fieldname: 'reason for error'
 * }
 * @param {Object} errorData - the validation response object
 * @returns {Object} - the converted Form/FormField compatible validation shape
 */

const errorObjectToString = errorData => {
  const errorMessages = [];
  Object.keys(errorData).forEach(errPropName => {
    if (errorData[errPropName]) {
      if (Array.isArray(errorData[errPropName])) {
        errorMessages.push(
          `${errPropName}: ${errorData[errPropName].join(', ')}`,
        );
      } else {
        errorMessages.push(`${errPropName}: ${errorData[errPropName]}`);
      }
    }
  });
  return errorMessages.join('; ');
};

export default errorObjectToString;
