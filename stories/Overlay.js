import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import Overlay from 'components/Overlay';
import OverlayChild from 'test-util/OverlayChild';

const DefaultOverlay = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <Fragment>
      <Overlay isOpen={overlayOpen}>
        <OverlayChild id="1" />
        <OverlayChild id="2" />
      </Overlay>
      <button type="button" onClick={() => setOverlayOpen(!overlayOpen)}>
        open overlay
      </button>
    </Fragment>
  );
};

storiesOf('Overlay', module).add('default', () => <DefaultOverlay />);
