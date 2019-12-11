/**
 * Function that accepts string and replaces underscores with spaces
 *
 * @return string
 * @param {string} str: the string that the transformation happens on
 * turning underscore into spaces
 */
export function replaceUnderscoreWithSpace(str) {
  return str.replace(/_/g, ' ');
}
/**
 * Function that accepts string and capitalizes first character of every word
 *
 * @return string
 * @param {string} str: the first character of each word is capitalized for
 * this string
 */
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

/**
 * Function that accepts string and replaces underscores with spaces and
 * capitalizes (the first character of every word uppercased)
 *
 * @return boolean
 * @param {string} str: string for which transformation happens for capitalizes
 * string
 */
export function snakeCaseToTitleCase(str) {
  return toTitleCase(replaceUnderscoreWithSpace(str));
}
