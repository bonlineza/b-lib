import React from 'react';
import { mount } from 'enzyme';
import 'test-util/setup';
import CategoryList from './index';

const itemRenderer = ({ data = {} }) => (
  <div className="item-rendered">{data.description}</div>
);

const categoryListData = [
  {
    title: 'Category One',
    catName: 'category-one',
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
  {
    title: 'Category Two',
    catName: 'category-two',
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
  {
    title: 'Category Three',
    catName: 'category-three',
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
];

const DefaultCategoryList = (props = {}) => {
  const defaultProps = {
    data: categoryListData,
    itemRenderer,
  };

  const testProps = { ...defaultProps, ...props };

  return <CategoryList {...testProps} />;
};

describe('Category List', () => {
  it('Category List renders', () => {
    const wrapper = mount(<DefaultCategoryList />);
    expect(wrapper.length).toBe(1);
  });

  it('Category List renders 3 `category-list__item__header`s (default) with titles', () => {
    const wrapper = mount(<DefaultCategoryList />);

    const defaultCatHeaders = wrapper.find('.category-list__item__header');

    expect(defaultCatHeaders.length).toBe(3);

    defaultCatHeaders.forEach((item, index) => {
      expect(item.text()).toBe(categoryListData[index].title);
    });
  });

  it('Renders 3 custom click components', () => {
    const ClickComponent = ({ identifier, toggleFn }) => (
      <button
        className="action-button"
        type="button"
        data-id={identifier}
        onClick={toggleFn}>
        Action Button
      </button>
    );

    const wrapper = mount(
      <DefaultCategoryList
        itemRenderer={itemRenderer}
        clickComponent={ClickComponent}
      />,
    );

    const actionButtons = wrapper.find('.action-button');
    expect(actionButtons.length).toBe(3);
  });
});

it('Can open cat body by clicking respective cat list item header', () => {
  const wrapper = mount(<DefaultCategoryList />);
  const catListHeaders = wrapper.find('.category-list__item__header');
  catListHeaders.forEach(header => {
    header.simulate('click');
  });
  expect(wrapper.find('.is-open').length).toBe(3);
});

it('text rendered in category body matches data passed through', () => {
  const wrapper = mount(<DefaultCategoryList />);
  const renderedItems = wrapper.find('.item-rendered');
  renderedItems.forEach((item, key) => {
    expect(item.text()).toBe(categoryListData[key].catData.description);
  });
});
