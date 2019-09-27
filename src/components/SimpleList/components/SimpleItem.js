import React from 'react';
import formatString from '../helpers/formatString';
// import GetSvg from 'components/GetSvg';

// 1. custom formatter for specific rows (not much work)
// 2. formatted

type SimpleListItemShape = {
  text?: string | number | Array<*>,
  flex: string,
  itemClass: string,
  customFormatter?: Object | Function | any,
};

const SimpleListItem = ({
  text,
  flex,
  align,
  itemClass, // NOTE: this should not be required
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
  align: 'left',
  customFormatter: false,
};

export default SimpleListItem;
