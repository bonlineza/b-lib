import React from 'react';
import { SimpleSelect } from 'react-selectize';

export default ({ onChange, value, options, hideResetButton = true }) => (
  <SimpleSelect
    hideResetButton={hideResetButton}
    onValueChange={onChange}
    value={value}
    options={options}
  />
);
