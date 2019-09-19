import React from 'react';
import { SimpleSelect as ReactSelect } from 'react-selectize';
import './scss/SimpleSelect.scss';

const SimpleSelect = ({ onChange, value, options, hideResetButton = true }) => (
  <ReactSelect
    hideResetButton={hideResetButton}
    onValueChange={onChange}
    value={value}
    options={options}
  />
);

export default SimpleSelect;
