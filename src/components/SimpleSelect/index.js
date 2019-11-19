import React from 'react';
import { SimpleSelect as ReactSelect } from 'react-selectize';
import './scss/SimpleSelect.scss';

type PropShapes = {
  onChange?: Function,
  /** value passed into `value`  prop of `SimpleSelect` */
  value?: any,
  /** Array of object with value `{ label, value }`. Selection of options */
  options?: Array,
  /** If true, hides reset button to clear value */
  hideResetButton?: boolean,
};

const SimpleSelect = ({
  onChange,
  value,
  options,
  hideResetButton,
}: PropShapes) => (
  <ReactSelect
    hideResetButton={hideResetButton}
    onValueChange={onChange}
    value={value}
    options={options}
  />
);

SimpleSelect.defaultProps = {
  onChange: () => false,
  value: null,
  options: [],
  hideResetButton: true,
};

export default SimpleSelect;
