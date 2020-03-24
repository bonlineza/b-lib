/**
 * Checks if a value is not null, undefined or an empty string
 * @param {any} value: value checked
 * @returns {boolean} result of the evaluation
 */
export default value => {
  if (Array.isArray(value)) {
    return !!value.length;
  }
  return value !== null && value !== undefined && value !== '';
};
