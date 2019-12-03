import React from 'react';
import { storiesOf } from '@storybook/react';
import EllipsisLoader from 'components/EllipsisLoader';
import Readme from '../../docs/EllipsisLoader.md';
import './OverrideStyle.scss';

const WrappedEllipsisLoader = () => <EllipsisLoader />;

const WrappedEllipsisLoaderCustomColor = () => (
  <div className="override">
    <EllipsisLoader />
  </div>
);

storiesOf('EllipsisLoader', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <WrappedEllipsisLoader />)
  .add('custom color', () => <WrappedEllipsisLoaderCustomColor />);
