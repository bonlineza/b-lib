/**
 * Removes a key from an Object
 * @param {string} key - the object key to be removed
 * @param {Object} oldObject - the object to perform the key removal on
 * @returns {Object} - a new modified object less the removed key
 */
export default (key, oldObject) => {
  const newObject = {
    ...oldObject,
  };
  delete newObject[key];
  return newObject;
};
