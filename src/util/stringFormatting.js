/**
 * Function that accepts string and replaces underscores with spaces
 * @param {string} str: the string that the transformation happens on
 * turning underscore into spaces
 * @return string
 */
export function replaceUnderscoreWithSpace(str) {
  return str.replace(/_/g, ' ');
}
/**
 * Function that accepts string and capitalizes first character of every word
 * @param {string} str: the first character of each word is capitalized for
 * this string
 * @return string
 */
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

/**
 * Function that accepts string then removes underscores and capitalizes
 * @param {string} str: string which undergoes two modifications 1)
 * replacing underscores with spaces and capitalizing the first character of
 * each word
 * @return string
 */
export function snakeCaseToTitleCase(str) {
  return toTitleCase(replaceUnderscoreWithSpace(str));
}
/**
 * Function that accepts string as parameter and returns string without
 * white spaces
 * @param {string} str: string for which the white space have been removed
 * @return string
 */
export function removeWhiteSpaces(str) {
  return str.replace(/\s/g, '');
}
