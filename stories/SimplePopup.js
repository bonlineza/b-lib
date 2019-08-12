import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import SimplePopup from 'components/SimplePopup';
import { action } from '@storybook/addon-actions';

const DefaultSimplePopup = (props = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultProps = {
    isOpen,
    title: 'Test Title',
    renderContent: () => (
      <div className="popup-content">some div with content</div>
    ),
    close: () => {
      action()('Close Action Called');
      setIsOpen(false);
    },
    options: [
      {
        cb: () => {
          action()('Cancel Called');
          setIsOpen(false);
        },
        buttonText: 'Test Cancel Button',
        buttonClass: 'cancel-button',
        dataQeId: 'button-cancel',
      },
    ],
  };

  const testProps = { ...defaultProps, ...props };

  return (
    <Fragment>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open SimplePopup
      </button>
      <SimplePopup {...testProps} />
    </Fragment>
  );
};

storiesOf('SimplePopup', module).add('default', () => <DefaultSimplePopup />);

storiesOf('SimplePopup', module).add('cannot close from outside', () => (
  <DefaultSimplePopup cannotOutsideClickClose />
));
