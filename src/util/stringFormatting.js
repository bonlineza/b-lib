/**
 * Replaces underscores with spaces
 * @param {string} str: string to modify
 * @returns {string} the new modified string
 */
export function replaceUnderscoreWithSpace(str) {
  return str.replace(/_/g, ' ');
}

/**
 * Capitalizes first character of every word
 * @param {string} str: string to modify
 * @returns {string} the new modified string
 */
export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

/**
 * Replaces underscores with spaces and capitalizes the first character of
 * each word
 * @param {string} str: string to modify
 * @returns {string} the new modified string
 */
export function snakeCaseToTitleCase(str) {
  return toTitleCase(replaceUnderscoreWithSpace(str));
}

/**
 * Removes white spaces in string
 * @param {string} str: string to modify
 * @returns {string} the new modified string
 */
export function removeWhiteSpaces(str) {
  return str.replace(/\s/g, '');
}
