/**
 * Function that accepts object as parameter and checks whether
 * Object is empty or not
 * @param {object} obj: the object that is checked to see whether it has
 * any keys
 * @return boolean
 */
export default (obj = {}) => !Object.keys(obj).length;
