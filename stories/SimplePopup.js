import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SimplePopup from 'components/SimplePopup';
import Readme from '../docs/SimplePopup.md';

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

storiesOf('SimplePopup', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <DefaultSimplePopup />)
  .add('cannot close from outside', () => (
    <DefaultSimplePopup cannotOutsideClickClose />
  ));
