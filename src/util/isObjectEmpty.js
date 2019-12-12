/**
 * Checks if a value has any props
 * @param {Object} obj: object that is checked
 * @returns {boolean} result of the evaluated condition
 */
export default (obj = {}) => !Object.keys(obj).length;
