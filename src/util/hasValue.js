/**
 * ensures that the value passed in is not null or undefined or is not an empty
 * string
 * @param {any} value: this checked to see whether it has a value
 * @return boolean
 */
export default value => value !== null && value !== undefined && value !== '';
