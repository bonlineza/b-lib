import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AsideSlide from 'components/AsideSlide';
import Readme from '../docs/AsideSlide.md';

const WrappedAsideSlide = () => {
  const [slideOpen, setSlideOpen] = useState(false);

  return (
    <Fragment>
      <button type="button" onClick={() => setSlideOpen(true)}>
        Open Slide
      </button>
      <AsideSlide
        title="Wrapped Aside Slide"
        toggleButton={() => (
          <button type="button" onClick={() => setSlideOpen(!slideOpen)}>
            Toggle
          </button>
        )}
        actionComponent={
          <button type="button" onClick={action('actionComponent action')}>
            Action
          </button>
        }
        isOpen={slideOpen}
        toggle={() => setSlideOpen(!slideOpen)}>
        <div>Some child element</div>
      </AsideSlide>
    </Fragment>
  );
};

storiesOf('AsideSlide', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <WrappedAsideSlide />);
