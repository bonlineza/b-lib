import React from 'react';
import DateRangePicker from 'components/DateRangePicker';
import { storiesOf } from '@storybook/react';

const defaultProps = {
  datepickerChanged: date => console.log('Moment object', date),
};

const DefaultRangePicker = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return <DateRangePicker {...testProps} />;
};

storiesOf('DateRangePicker', module).add('default', () => (
  <DefaultRangePicker />
));
