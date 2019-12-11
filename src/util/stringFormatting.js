/**
 * Function that accepts string and replaces underscores with spaces
 *
 * @return string
 * @param str
 */

export function replaceUnderscoreWithSpace(str) {
  return str.replace(/_/g, ' ');
}
/**
 * Function that accepts string and capitalizes first character of every word
 *
 * @return string
 * @param str
 */

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

/**
 * Function that accepts string and replaces underscores with spaces and
 * capitalizes the first character of every word
 *
 * @return boolean
 * @param str
 */

export function snakeCaseToTitleCase(str) {
  return toTitleCase(replaceUnderscoreWithSpace(str));
}
