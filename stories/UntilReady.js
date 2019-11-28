import React from 'react';
import { storiesOf } from '@storybook/react';
import UntilReady from 'components/UntilReady';
import Readme from '../docs/UntilReady.md';

const defaultProps = {
  ready: false,
  waiting: false,
  notReadyOrWaitingText: 'failed',
  loadingRenderer: () => <div id="until-ready-loading">loading</div>,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return (
    <UntilReady {...testProps}>
      <div id="until-ready-child">Child content 1</div>
    </UntilReady>
  );
};

const UntilReadyLoading = () => setup({ waiting: true });
const UntilReadyReady = () => setup({ waiting: false, ready: true });
const UntilReadyError = () => setup({ waiting: false, ready: false });

storiesOf('UntilReady', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('loading', () => <UntilReadyLoading />)
  .add('ready', () => <UntilReadyReady />)
  .add('error', () => <UntilReadyError />);
