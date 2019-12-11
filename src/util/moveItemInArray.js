/**
 * Shifts element array to designated position in array. fromIndex
 * is the chosen array element and toIndex is the array position for
 * you want the element to go
 * @return array
 * @param array
 * @param fromIndex
 * @param toIndex
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
