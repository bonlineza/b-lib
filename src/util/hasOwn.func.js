/**
 * Checks if the given Object has a property matching the given name
 * @param {Object} object the object to be inspected
 * @param {string} name the name of the property to be checked for in the Object
 */
export default function hasOwn(object, name) {
  if (!object) return false;
  return Object.prototype.hasOwnProperty.call(object, name);
}
