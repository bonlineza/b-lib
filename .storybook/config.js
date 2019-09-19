import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/AsideSlide.js');
  require('../stories/ButtonGroup.js');
  require('../stories/DropOptions.js');
  require('../stories/Map.js');
  require('../stories/MobileSideMenu.js');
  require('../stories/Overlay.js');
  require('../stories/Paginator.js');
  require('../stories/PageReady.js');
  require('../stories/PDFPreview.js');
  require('../stories/SelectRows.js');
  require('../stories/SimplePopup.js');
  require('../stories/EllipsisLoader/index.js');
  require('../stories/SwitchView.js');
  require('../stories/ToolTip.js');
  require('../stories/UntilReady.js');
  require('../stories/WYSIWYG.js');
}

configure(loadStories, module);
