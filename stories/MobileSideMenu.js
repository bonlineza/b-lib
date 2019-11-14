import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MobileSideMenu from 'components/MobileSideMenu';

const WrappedMobileSideMenu = () => {
  const menuItems = [
    <button type="button" onClick={() => action()('Menu item button clicked')}>
      Menu item 1
    </button>,
    <button type="button" onClick={() => action()('Menu item button clicked')}>
      Menu item 2
    </button>,
    <button type="button" onClick={() => action()('Menu item button clicked')}>
      Menu item 3
    </button>,
    <button type="button" onClick={() => action()('Menu item button clicked')}>
      Menu item 4
    </button>,
  ];

  const footerContent = () => <div>Some footer content</div>;

  const [isActive, setActiveState] = useState(false);
  return (
    <Fragment>
      <button
        className="mobile-button"
        type="button"
        onClick={() => setActiveState(!isActive)}>
        Open
      </button>
      <MobileSideMenu
        isOpen={isActive}
        menuItems={menuItems}
        menuTitle="Menu Title"
        closeAction={() => setActiveState(false)}
        footerContent={footerContent}
      />
    </Fragment>
  );
};
storiesOf('MobileSideMenu', module).add('default', () => (
  <WrappedMobileSideMenu />
));
