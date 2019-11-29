import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import './OverrideStyle.scss';
import HorizontalProgressBar from '../../src/components/HorizontalProgressBar/index.js';

const WrappedProgressBar = props => <HorizontalProgressBar {...props} />;

storiesOf('HorizontalProgressBar', module).add('default', () => (
  <WrappedProgressBar />
));

storiesOf('HorizontalProgressBar', module).add('half way progress', () => (
  <WrappedProgressBar progressPercentage={50} />
));

storiesOf('HorizontalProgressBar', module).add('override style', () => (
  <div className="override-progress-bar">
    <WrappedProgressBar progressPercentage={50} />
  </div>
));

storiesOf('HorizontalProgressBar', module).add(
  'timeout of 100ms for transition',
  () => <WrappedProgressBar progressPercentage={40} transitionTimeout={100} />,
);

const AdjustableProgressBar = () => {
  const [barIsFull, setBarIsFullState] = useState(false);
  return (
    <Fragment>
      <WrappedProgressBar progressPercentage={barIsFull ? 100 : 0} />
      <button type="button" onClick={() => setBarIsFullState(!barIsFull)}>
        {barIsFull ? 'Empty Bar' : 'Fill Bar'}
      </button>
    </Fragment>
  );
};

storiesOf('HorizontalProgressBar', module).add(
  'Button controlling progess',
  () => <AdjustableProgressBar />,
);
