/**
 * Shifts element array to designated position in array.
 * @param {array} array: array that is rearranged
 * @param {number} fromIndex: index of element to move
 * @param {number} toIndex: index where element shifts to
 * @returns {array} the new rearranged array
 */
export default function moveItemInArray(array, fromIndex, toIndex) {
  if (fromIndex === toIndex) return array;

  const newArray = [...array];

  const target = newArray[fromIndex];
  const inc = toIndex < fromIndex ? -1 : 1;

  for (let i = fromIndex; i !== toIndex; i += inc) {
    newArray[i] = newArray[i + inc];
  }

  newArray[toIndex] = target;

  return newArray;
}
