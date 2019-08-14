import React from 'react';
import { storiesOf } from '@storybook/react';
import UntilReady from 'components/UntilReady';

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
storiesOf('UntilReady', module).add('loading', () => <UntilReadyLoading />);

const UntilReadyReady = () => setup({ waiting: false, ready: true });
storiesOf('UntilReady', module).add('ready', () => <UntilReadyReady />);

const UntilReadyError = () => setup({ waiting: false, ready: false });
storiesOf('UntilReady', module).add('error', () => <UntilReadyError />);
