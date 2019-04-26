/** @format */

export default function goUp() {
  const container = document.querySelector('.app-layout__body');
  const currentScroll = container.scrollTop;
  const sliders = document.querySelectorAll('.aside-slide__inner');

  if (currentScroll > 0) {
    if (Object.prototype.hasOwnProperty.call(container, 'scrollTo')) {
      container.scrollTo(0, 0);
    } else {
      // support ie11/edge
      container.scrollTop = 0;
    }
  }

  // ideally we should track the currently active Slider
  Array.from(sliders, slider => {
    if (Object.prototype.hasOwnProperty.call(slider, 'scrollTo')) {
      slider.scrollTo(0, 0);
    } else {
      // support ie11/edge
      // eslint-disable-next-line no-param-reassign
      slider.scrollTop = 0;
    }
    return null;
  });
  return true;
}
