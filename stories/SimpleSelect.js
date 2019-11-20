import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleSelect from 'components/SimpleSelect';

const WrappedSimpleSelect = ({ props = {} }) => {
  const defaultProps = {
    onChange: value => console.log(value),
    options: [
      { label: 'apple', value: 'apple' },
      { label: 'banana', value: 'banana' },
    ],
    hideResetButton: false,
  };
  const combineProps = {
    ...defaultProps,
    ...props,
  };

  return <SimpleSelect {...combineProps} />;
};

storiesOf('SimpleSelect', module).add('simple select with options', () => (
  <WrappedSimpleSelect />
));

storiesOf('SimpleSelect', module).add(
  'simple select hiding reset button',
  () => (
    <WrappedSimpleSelect
      props={{
        hideResetButton: true,
      }}
    />
  ),
);

storiesOf('SimpleSelect', module).add('Open by default', () => (
  <WrappedSimpleSelect
    props={{
      open: true,
    }}
  />
));
