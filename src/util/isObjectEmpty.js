/**
 * Checks if a value has any props
 * @param {Object} obj: object checked
 * @returns {boolean} result of the evaluation
 */
export default (obj = {}) => !Object.keys(obj).length;
