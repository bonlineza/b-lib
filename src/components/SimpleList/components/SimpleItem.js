import React from 'react';

type Formatter = (itemValue: any) => any;

type ItemRenderer = (
  itemValue: any,
  columnName: string,
  rowData: Object,
) => any;

type SimpleListItemShape = {
  text?: string | number | Array<*>,
  flex: string,
  align?: string,
  column: string,
  itemClass?: string,
  customFormatter?: Function,
  customRenderer?: ItemRenderer,
};

const getItem = (
  columnName: string,
  itemValue: any,
  rowData: Object,
  formatter: Formatter,
  renderer: ItemRenderer,
) => {
  if (renderer) {
    return renderer(itemValue, rowData, columnName);
  }
  if (formatter) {
    return formatter(itemValue, rowData, columnName);
  }
  return itemValue;
};

const SimpleListItem = ({
  text,
  row,
  flex,
  align,
  column,
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
    {getItem(column, text, row, customFormatter, customRenderer)}
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
