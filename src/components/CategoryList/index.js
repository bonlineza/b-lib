import React, { Fragment } from 'react';
import CategoryItem from './CategoryItem.js';
import './scss/Style.scss';

type PropsShape = {
  data?: Array,
  itemRenderer?: any,
  clickComponent?: any,
  baseClassName?: string,
  isOpenByDefault?: boolean,
};

const CategoryList = ({
  data,
  itemRenderer,
  clickComponent,
  baseClassName,
  isOpenByDefault,
}: PropsShape) => (
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
            isOpenByDefault={isOpenByDefault}
          />
        </Fragment>
      ),
    )}
  </div>
);

CategoryList.defaultProps = {
  data: [],
  itemRenderer: null,
  clickComponent: null,
  baseClassName: 'category-list',
  isOpenByDefault: false,
};

export default CategoryList;
