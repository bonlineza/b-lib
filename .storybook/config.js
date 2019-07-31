import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/AsideSlide.js');
  require('../stories/DropOptions.js');
  require('../stories/EllipsisLoader.js');
  require('../stories/SwitchView.js');
}

configure(loadStories, module);
