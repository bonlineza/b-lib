import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/AsideSlide.js');
  require('../stories/DropOptions.js');
  require('../stories/EllipsisLoader.js');
  require('../stories/SwitchView.js');
  require('../stories/ButtonGroup.js');
  require('../stories/PageReady.js');
  require('../stories/ToolTip.js');
  require('../stories/Overlay.js');
  require('../stories/SimplePopup.js');
  require('../stories/MobileSideMenu.js');
  require('../stories/PDFPreview.js');
}

configure(loadStories, module);
