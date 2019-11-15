import React, { useState } from 'react';

type PropsShape = {
  listKey?: number,
  identifier?: string,
  title?: string,
  clickComponent?: any,
  data?: Object,
  itemRenderer?: any,
  baseClassName?: string,
  isOpenByDefault?: boolean,
};

const CategoryItem = ({
  listKey,
  identifier,
  title,
  clickComponent,
  data,
  itemRenderer,
  baseClassName,
  isOpenByDefault,
}: PropsShape) => {
  const [isOpen, setIsOpenState] = useState(isOpenByDefault);

  const ClickComponent = clickComponent;
  const ItemRenderer = itemRenderer;

  const toggle = () => setIsOpenState(!isOpen);

  return (
    <div className={`${baseClassName}__item`}>
      {clickComponent ? (
        <ClickComponent
          listKey={listKey}
          identifier={`${baseClassName}__item-${identifier}`}
          title={title}
          isOpen={isOpen}
          toggleFn={toggle}
        />
      ) : (
        <div
          key={`${identifier}-${listKey}`}
          className={`${baseClassName}__item__header`}
          tabIndex={listKey + 1}
          onClick={toggle}
          onKeyPress={() => null}
          role="button">
          {title}
        </div>
      )}
      <div
        className={`${baseClassName}__item__body ${isOpen ? 'is-open' : ''}`}>
        {itemRenderer ? <ItemRenderer data={data} /> : null}
      </div>
    </div>
  );
};

CategoryItem.defaultProps = {
  listKey: '',
  identifier: '',
  title: '',
  clickComponent: null,
  data: {},
  itemRenderer: null,
  baseClassName: '',
  isOpenByDefault: false,
};

export default CategoryItem;
