import React, { Fragment } from 'react';
import CategoryItem from './CategoryItem.js';
import './scss/Style.scss';

const CategoryList = ({
  data = [],
  itemRenderer = null,
  clickComponent = null,
  baseClassName = 'category-list',
}) => (
  <div className={baseClassName}>
    {data.map((categoryItem, key) => (
      <Fragment key={key}>
        <CategoryItem
          listKey={key}
          title={categoryItem.title}
          identifier={categoryItem.catName}
          data={categoryItem.catData}
          itemRenderer={itemRenderer}
          clickComponent={clickComponent}
          baseClassName={baseClassName}
        />
      </Fragment>
    ))}
  </div>
);

export default CategoryList;
