import React from 'react';

type ButtonOrDivProps = {
  children: any,
  index: string | number,
  allowClick?: boolean,
  clickAct?: Function,
  item?: any,
  identifier?: string,
};

const ButtonOrDiv = ({
  allowClick,
  children,
  index,
  clickAct,
  item,
  identifier,
  baseClass = 'simple-list__body__row',
}: ButtonOrDivProps): React$Element<*> =>
  allowClick ? (
    <button
      type="button"
      className={`${baseClass}${index % 2 ? '--bgc-alt' : ''}`}
      onClick={e => {
        e.preventDefault();
        clickAct(item, index);
      }}
      data-qe-id={identifier}>
      {children}
    </button>
  ) : (
    <div
      className={`${baseClass}${index % 2 ? '--bgc-alt' : ''} disable-hover`}>
      {children}
    </div>
  );

ButtonOrDiv.defaultProps = {
  allowClick: true,
  clickAct: () => null,
  item: null,
  identifier: '',
  baseClass: 'simple-list__body__row',
};

export default ButtonOrDiv;
