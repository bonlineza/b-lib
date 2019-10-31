import React from 'react';
import { storiesOf } from '@storybook/react';
import './OverrideStyle.scss';
import HorizontalProgressBar from '../../src/components/HorizontalProgressBar/index.js';

const WrappedProgressBar = props => <HorizontalProgressBar {...props} />;

storiesOf('HorizontalProgressBar', module).add('default', () => (
  <WrappedProgressBar />
));

storiesOf('HorizontalProgressBar', module).add('half way progress', () => (
  <WrappedProgressBar totalProgress={100} currentProgress={50} />
));

storiesOf('HorizontalProgressBar', module).add('override style', () => (
  <div className="override-progress-bar">
    <WrappedProgressBar totalProgress={100} currentProgress={50} />
  </div>
));
