import React from 'react';
import { storiesOf } from '@storybook/react';
import DateRangePicker from 'components/DateRangePicker';
import Readme from '../docs/DateRangePicker.md';

const defaultProps = {
  datepickerChanged: date => console.log('Moment object', date),
};

const DefaultRangePicker = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return <DateRangePicker {...testProps} />;
};

storiesOf('DateRangePicker', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <DefaultRangePicker />);
