/**
 * Function that accepts object as parameter and checks whether
 * Object is empty or not
 * @param {object} obj: the object that is checked to see whether it has
 * @return boolean
 * any keys
 */
export default (obj = {}) => !Object.keys(obj).length;
