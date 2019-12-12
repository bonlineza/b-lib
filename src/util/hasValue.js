/**
 * Checks if a value is not null, undefined or an empty string
 * string
 * @param {any} value: value to be checked
 * @returns {boolean} result of the evaluated condition
 */
export default value => value !== null && value !== undefined && value !== '';
