/**
 * Function that accepts object as parameter and checks whether
 * Object is empty or not
 * @return boolean
 * @param {object} obj: the object that is checked to see whether it has
 * any keys
 */

export default (obj = {}) => !Object.keys(obj).length;
