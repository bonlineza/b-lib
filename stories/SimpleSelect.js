import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleSelect from 'components/SimpleSelect';
import Readme from '../docs/SimpleSelect.md';

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

storiesOf('SimpleSelect', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('simple select with options', () => <WrappedSimpleSelect />)
  .add('simple select hiding reset button', () => (
    <WrappedSimpleSelect
      props={{
        hideResetButton: true,
      }}
    />
  ))
  .add('Open by default', () => (
    <WrappedSimpleSelect
      props={{
        open: true,
      }}
    />
  ));
