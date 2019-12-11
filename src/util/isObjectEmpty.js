/**
 * Function that accepts object as parameter and checks whether
 * Object is empty or not
 * @return boolean
 * @param obj
 */

export default (obj = {}) => !Object.keys(obj).length;
