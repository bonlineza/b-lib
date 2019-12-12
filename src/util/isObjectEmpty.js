/**
 * Determines whether the object is empty by checking whether the length
 * of key for that object is false
 * @param {Object} obj: object that is checked
 * @return boolean
 */
export default (obj = {}) => !Object.keys(obj).length;
