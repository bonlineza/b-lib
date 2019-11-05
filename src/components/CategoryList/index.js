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
    {data.map(
      (
        {
          title = '',
          catName = '',
          catData = {},
          topSeperatorComponent = null,
        },
        key,
      ) => (
        <Fragment key={key}>
          {topSeperatorComponent}
          <CategoryItem
            listKey={key}
            title={title}
            identifier={catName}
            data={catData}
            itemRenderer={itemRenderer}
            clickComponent={clickComponent}
            baseClassName={baseClassName}
          />
        </Fragment>
      ),
    )}
  </div>
);

export default CategoryList;
