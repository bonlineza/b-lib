/** @format */

export default function hasOwn(object, name) {
  if (!object) return false;
  return Object.prototype.hasOwnProperty.call(object, name);
}
