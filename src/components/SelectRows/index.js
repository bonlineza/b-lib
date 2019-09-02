import React, { Fragment } from 'react';
import './scss/SelectRows.scss';

const SelectRows = ({
  single,
  rows,
  onAddClick,
  onRemoveClick,
  rowClassName = 'select-rows',
  placeholder = 'Add Item',
  addActionRenderer = () => '+',
  removeActionRenderer = () => '-',
}) => {
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
};

export default SelectRows;
