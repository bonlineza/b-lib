/**
 * function that enforces programming practice used to ensure that
 * time-consuming task do not fire so often, that it stalls the performance
 * of the web page. Limiting the rate at which a function gets invoked.
 *
 *
 * @return function
 * @param delay
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
