/**
 * Native smooth scrolling for Chrome, Firefox & Opera
 * @see: https://caniuse.com/#feat=css-scroll-behavior
 * @param {DOMElement} elem the valid dom element to call the 'scroll' function on
 */
const nativeSmoothScrollTo = elem => {
  elem.scroll({
    behavior: 'smooth',
    left: 0,
    top: 0,
  });
};

/**
 * Polyfilled smooth scrolling for IE, Edge & Safari
 * @param {DOMElement} elm element used as refernce when scrolling
 * @param {number} duration the time in miliseconds to animate the scrolling
 * @see Issue: https://stackoverflow.com/questions/52276194/window-scrollto-with-options-not-working-on-microsoft-edge
 */
const smoothScrollTo = (elm, duration) => {
  const to = elm.offsetTop;
  // eslint-disable-next-line
  const element = elm,
    start = elm.scrollTop,
    change = to - start,
    startDate = +new Date();

  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t, b, c, d) => {
    // eslint-disable-next-line
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    // eslint-disable-next-line
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(
      easeInOutQuad(currentTime, start, change, duration),
      10,
    );
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};

// detect support for the behavior property in ScrollOptions
const supportsNativeSmoothScroll =
  'scrollBehavior' in document.documentElement.style;

/**
 * Scrolls to top of Given DOM Element
 * @param {DOMElement} element to the element to stop to the top of
 */
export const scrollToElement = element => {
  if (typeof window === 'undefined') return;
  if (element && element.scrollTop > 0) {
    try {
      if (supportsNativeSmoothScroll) {
        nativeSmoothScrollTo(element);
      } else {
        smoothScrollTo(element, 600);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.warn('Unable to Scroll to Top of Element');
    }
  }
};
/**
 * Scroll to top of given query selector resolved element
 * @param {string} selector query selector string to query a DOM element by
 */
export const scrollToSelector = selector => {
  scrollToElement(document.querySelector(selector));
};

export default elem => {
  scrollToElement(elem);
};
