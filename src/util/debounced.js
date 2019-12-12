/**
 * Creates closure for delaying function
 * @param {number} delay the number of milliseconds to delay the function call
 * @returns {Function} function to perform debouncing with delay
 */
export default function debounced(delay) {
  let timer = null;
  return function(fn, ...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
