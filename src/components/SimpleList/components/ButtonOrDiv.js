import React from 'react';

type ButtonOrDivProps = {
  allowClick: boolean,
  children: any,
  index: string | number,
  clickAct: Function,
  item: any,
  identifier: string,
};

export default ({
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
