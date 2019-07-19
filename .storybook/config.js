import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/AsideSlide.js');
  require('../stories/DropOptions.js');
  require('../stories/SwitchView.js');
  require('../stories/ButtonGroup.js');
}

configure(loadStories, module);
