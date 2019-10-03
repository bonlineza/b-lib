import React from 'react';
// import { formatString } from '../helpers/formatters';

type SimpleListItemShape = {
  text?: string | number | Array<*>,
  flex: string,
  align?: string,
  column: string,
  itemClass?: string,
  customFormatter?: Function,
  customRenderer?: Function,
};

const getItem = (column, item, row, formatter, renderer) => {
  if (renderer) {
    return renderer(column, row);
  }
  if (formatter) {
    return formatter(item);
  }
  return item;
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
