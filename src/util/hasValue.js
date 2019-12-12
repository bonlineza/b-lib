/**
 * Checks if a value is not null, undefined or an empty string
 * @param {any} value: value checked
 * @returns {boolean} result of the evaluation
 */
export default value => value !== null && value !== undefined && value !== '';
