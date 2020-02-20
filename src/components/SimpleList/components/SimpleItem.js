import React from 'react';

type ItemRenderer = (
  itemValue: any,
  columnName: string,
  rowData: Object,
  rowIndex: number,
) => any;

type Formatter = ItemRenderer;

type SimpleListItemShape = {
  text?: string | number | Array<*>,
  flex: string,
  align?: string,
  column: string,
  itemClass?: string,
  customFormatter?: Function,
  customRenderer?: ItemRenderer,
  rowIndex: number,
};

const getItem = (
  columnName: string,
  itemValue: any,
  rowData: Object,
  formatter: Formatter,
  renderer: ItemRenderer,
  rowIndex: number,
) => {
  if (renderer) {
    return renderer(itemValue, rowData, columnName, rowIndex);
  }
  if (formatter) {
    return formatter(itemValue, rowData, columnName, rowIndex);
  }
  return itemValue;
};

const SimpleListItem = ({
  text,
  row,
  flex,
  align,
  column,
  rowIndex,
  itemClass,
  customFormatter,
  customRenderer,
}: SimpleListItemShape): React$Element<*> => (
  <span
    className={itemClass}
    style={{
      textAlign: align,
      minWidth: flex,
      maxWidth: flex,
      flexBasis: flex,
    }}>
    {getItem(column, text, row, customFormatter, customRenderer, rowIndex)}
  </span>
);

SimpleListItem.defaultProps = {
  text: '',
  itemClass: 'simple-list__row__item',
  align: 'left',
  customFormatter: null,
  customRenderer: null,
};

export default SimpleListItem;
