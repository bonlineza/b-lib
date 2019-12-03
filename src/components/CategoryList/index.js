import React, { Fragment } from 'react';
import CategoryItem from './CategoryItem.js';
import './scss/Style.scss';

type ArrayItemShape = {
  title: string,
  catName: string,
  catData: any,
};

type PropsShape = {
  /**
   * Array of data which is rendered in itemRenderer
   * Data shape of `ArrayItemShape` is the following:
   * --
   * `title(string):` String title of category
   * --
   * `catName(string):` catName gets passed into the identifier prop in
   * `<CatItem />` which is then used as a `data-id`
   * --
   * `catData(array)`: Array of data within category
   */
  data?: Array<ArrayItemShape>,
  /**
   * itemRenderer renders items `data` prop
   *
   */
  itemRenderer?: any,
  /**
   * `passed down custom component which can be used for toggling visibility of
   * itemRenderer. Receives the following props`
   * ---
   * `listKey(number): index for items in category`
   * ---
   * `identifier(id): this can be used as data id`
   * ---
   * `title(string): Title for your click component`
   * ---
   * `isOpen(boolean): props which tracks whether the categoryItem is open or not`
   * ---
   * `toggleFn(function): togglesIsOpen state`
   * */
  clickComponent?: any,
  /**
   * css class for root div in this component
   */
  baseClassName?: string,
  /**
   * bool value to determine when the category items are open by default
   */
  isOpenByDefault?: boolean,
};

/**
 * CategoryList displays a list of 'categories' which can be toggled to show each sub-list of items
 */
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
