import React, { Fragment } from 'react';
import './scss/SelectRows.scss';

type RowType = {
  key: number | string,
  value: any,
};

type PropsShape = {
  /** If true, only one item can be added to the props row */
  single?: boolean,
  /** Array of objects with each object having the follow prop shape:
   * `{ key, value }`. each item is used to render a `button element`. onClick
   * `onRemoveClick` is triggered */
  rows?: Array<RowType>,
  /** Function used to append item to `row` from control logic in upperscope */
  onAddClick?: Function,
  /** Function used to remove item to `row` from control logic in upperscope */
  onRemoveClick?: Function,
  /** css class name given to each `button element` mapped out from `row` array */
  rowClassName?: string,
  /** button text for `add item button element` */
  placeholder?: string,
  /** function that returns jsx(content) in the `add item button element` after
   * its `placeholder` */
  addActionRenderer?: Function,
  /** function that renders jsx(content) in for each mapped out row item
   * `(button element)`. This will display after the button's text */
  removeActionRenderer?: Function,
};

const SelectRows = ({
  single,
  rows,
  onAddClick,
  onRemoveClick,
  rowClassName,
  placeholder,
  addActionRenderer,
  removeActionRenderer,
}: PropsShape) => {
  const getAddButton = () => (
    <button type="button" className={rowClassName} onClick={() => onAddClick()}>
      <span className={`${rowClassName}--placeholder`}>{placeholder}</span>
      <span className={`${rowClassName}--action`}>{addActionRenderer()}</span>
    </button>
  );

  const getRemoveButton = (value, key) => (
    <button
      key={key}
      type="button"
      className={rowClassName}
      onClick={() => onRemoveClick(key)}>
      <span className={`${rowClassName}--value`}>{value}</span>
      <span className={`${rowClassName}--action`}>
        {removeActionRenderer()}
      </span>
    </button>
  );

  const getSingleView = () => {
    const item = rows.length ? rows[0] : null;
    return rows.length ? getRemoveButton(item.value, item.key) : getAddButton();
  };

  const getMultiView = () => (
    <Fragment>
      {getAddButton()}
      <Fragment>
        {rows.map(item => getRemoveButton(item.value, item.key))}
      </Fragment>
    </Fragment>
  );

  return single ? getSingleView() : getMultiView();
};

SelectRows.defaultProps = {
  single: true,
  rows: [],
  onAddClick: () => false,
  onRemoveClick: () => false,
  rowClassName: 'select-rows',
  placeholder: 'Add Item',
  addActionRenderer: () => false,
  removeActionRenderer: () => false,
};

export default SelectRows;
