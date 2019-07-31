import React from 'react';
import { storiesOf } from '@storybook/react';
import EllipsisLoader from 'components/EllipsisLoader';

const WrappedEllipsisLoader = () => <EllipsisLoader />;

storiesOf('EllipsisLoader', module).add('default', () => (
  <WrappedEllipsisLoader />
));

const WrappedEllipsisLoaderCustomColor = () => (
  <EllipsisLoader dotColor="#666" />
);

storiesOf('EllipsisLoader', module).add('custom color', () => (
  <WrappedEllipsisLoaderCustomColor />
));
