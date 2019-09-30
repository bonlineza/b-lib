import React from 'react';
import { formatString } from '../helpers/formatters';

type SimpleListItemShape = {
  text?: string | number | Array<*>,
  flex: string,
  itemClass?: string,
  customFormatter?: Object | Function | any,
};

const SimpleListItem = ({
  text,
  flex,
  align,
  itemClass,
  customFormatter,
}: SimpleListItemShape): React$Element<*> => (
  <span
    className={itemClass}
    style={{
      minWidth: flex,
      maxWidth: flex,
      flexBasis: flex,
    }}>
    <span style={{ textAlign: align }}>
      {customFormatter && typeof customFormatter === 'function'
        ? customFormatter(text)
        : formatString(text)}
    </span>
  </span>
);

SimpleListItem.defaultProps = {
  text: '',
  itemClass: 'simple-list__row__item',
  align: 'left',
  customFormatter: false,
};

export default SimpleListItem;
