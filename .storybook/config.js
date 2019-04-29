import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/AsideSlide.js');
}

configure(loadStories, module);
