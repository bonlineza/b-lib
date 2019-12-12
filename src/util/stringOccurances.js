/**
 * Function that counts occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {boolean} [allowOverlapping]  Optional. (Default:false)
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 * @returns {number} number of times the string  has occurred
 */
export default function stringOccurances(
  string: String,
  subString: String,
  allowOverlapping,
) {
  if (subString.length <= 0) return string.length + 1;

  let n = 0;
  let pos = 0;
  const step = allowOverlapping ? 1 : subString.length;

  while (pos >= 0) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      n += 1;
      pos += step;
    } else break;
  }
  return n;
}
