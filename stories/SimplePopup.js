import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import SimplePopup from 'components/SimplePopup';
import { action } from '@storybook/addon-actions';
// import OverlayChild from 'test-util/OverlayChild';

const DefaultSimplePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const testOptions = [
    {
      cb: () => {
        action()('Cancel Called');
        setIsOpen(false);
      },
      buttonText: 'Test Cancel Button',
      buttonClass: 'cancel-button',
      dataQeId: 'button-cancel',
    },
    {
      cb: () => {
        action()('Action Called');
        setIsOpen(false);
      },
      buttonText: 'Test Action Button',
      buttonClass: 'action-button',
      dataQeId: 'button-submit',
    },
  ];

  return (
    <Fragment>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open SimplePopup
      </button>
      <SimplePopup
        isOpen={isOpen}
        title="Test Title"
        close={() => {
          action()('Close Action Called');
          setIsOpen(false);
        }}
        renderLoader={() => <div className="popup-loader">Loading...</div>}
        renderContent={() => (
          <div className="popup-content">some div with content</div>
        )}
        options={testOptions}
      />
    </Fragment>
  );
};

storiesOf('SimplePopup', module).add('default', () => <DefaultSimplePopup />);
