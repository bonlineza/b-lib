import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import SelectRows from 'components/SelectRows';

const rowsData = [
  {
    value: 'Item 1',
    key: 0,
  },
  {
    value: 'Item 2',
    key: 1,
  },
  {
    value: 'Item 3',
    key: 2,
  },
];

const defaultProps = {
  single: false,
  rows: rowsData,
  onAddClick: null,
  onRemoveClick: null,
};

const DefaultSelectRows = props => {
  const [rows, setRows] = useState(props.rows);
  const onAddClick = () => {
    setRows(rows.concat({ value: 'New Item', key: rows.length }));
  };
  const onRemoveClick = key => {
    const keyIndex = rows.findIndex(item => item.key === key);
    const newSelection = [...rows];
    newSelection.splice(keyIndex, 1);
    setRows(newSelection);
  };
  return (
    <Fragment>
      <SelectRows
        {...props}
        rows={rows}
        onAddClick={onAddClick}
        onRemoveClick={onRemoveClick}
      />
    </Fragment>
  );
};

storiesOf('SelectRows', module).add('Add Multiple Items', () => (
  <DefaultSelectRows {...defaultProps} />
));

storiesOf('SelectRows', module).add('Can Only have single Item', () => (
  <DefaultSelectRows {...defaultProps} single rows={[]} />
));
