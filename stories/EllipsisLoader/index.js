import React from 'react';
import { storiesOf } from '@storybook/react';
import EllipsisLoader from 'components/EllipsisLoader';
import './OverrideStyle.scss';

const WrappedEllipsisLoader = () => <EllipsisLoader />;

storiesOf('EllipsisLoader', module).add('default', () => (
  <WrappedEllipsisLoader />
));

const WrappedEllipsisLoaderCustomColor = () => (
  <div className="override">
    <EllipsisLoader />
  </div>
);

storiesOf('EllipsisLoader', module).add('custom color', () => (
  <WrappedEllipsisLoaderCustomColor />
));
