import React from 'react';
import { SimpleSelect as ReactSelect } from 'react-selectize';
import './scss/SimpleSelect.scss';

type ItemShape = {
  value: any,
  label: string,
};

type PropShapes = {
  /** `(selectedValue){}` invoked when the user selects an option (by click on enter).
   * `onChange` accepts the an object with the `shape` which will equate to
   * the current `value` prop */
  onChange?: Function<ItemShape>,
  /** the selected value, i.e. one of the objects in the options array */
  value?: Object<ItemShape>,
  /** list of items by default each option object MUST have `label` & `value` property,
   * otherwise you must implement the render* & filterOptions methods */
  options?: Array<ItemShape>,
  /** If true, hides the reset button, even if the select element is not empty */
  hideResetButton?: boolean,
  /** controls the visibility of the dropdown menu */
  open?: boolean,
};

/**
 * SimpleSelect is an implementation of 'reat-selectize' - providing a few defaults and a common interface
 */
const SimpleSelect = ({
  onChange,
  value,
  options,
  hideResetButton,
  open,
}: PropShapes) => (
  <ReactSelect
    hideResetButton={hideResetButton}
    onValueChange={onChange}
    value={value}
    options={options}
    {...(open ? { open: true } : {})}
  />
);

SimpleSelect.defaultProps = {
  onChange: () => false,
  value: {},
  options: [],
  hideResetButton: true,
  open: false,
};

export default SimpleSelect;
