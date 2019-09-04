import React, { useState } from 'react';

const CategoryItem = ({
  listKey = '',
  identifier = '',
  title = '',
  clickComponent = null,
  data = {},
  itemRenderer = null,
  baseClassName = '',
}) => {
  const [isOpen, setIsOpenState] = useState(false);

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

export default CategoryItem;
