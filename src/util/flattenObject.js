/**
 * Recursive depth-first search function to reduce nested object data into one flattened object.
 * Nested keys are joined with '[]' inside strings.
 * @param {Object} obj
 * @param {string|void} keyPrefix
 * @returns Object
 */
export default function flattenObject(obj: Object, keyPrefix?: string): Object {
  return Object.keys(obj).reduce((flattened: Object, key: string) => {
    const flattenedKey = keyPrefix ? `${keyPrefix}[${key}]` : key;
    if (typeof obj[key] === 'object') {
      const nestedFlattened = flattenObject(obj[key], flattenedKey);
      return Object.assign(flattened, nestedFlattened);
    }
    if (obj[key] === undefined) return flattened;
    return {
      ...flattened,
      [flattenedKey]: obj[key],
    };
  }, {});
}
