import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';

import PredefinedFilter from './predefinedFilter';

const defaultProps = {
  dropdownRef: null,
  onToggle: () => null,
  options: [
    {
      text: 'Option 1',
      value: '1',
    },
    {
      text: 'Option 2',
      value: '2',
    },
  ],
  onSelect: () => null,
  baseClass: 'list-filter__item',
  filterButtonContent: () => 'Filter',
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return shallow(<PredefinedFilter {...testProps} />);
};

describe('PredefinedFilter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('button content', () => {
      const filterButton = wrapper.find(
        `.${defaultProps.baseClass}__filter-btn`,
      );
      expect(filterButton.text()).toBe(defaultProps.filterButtonContent());
    });
    it('2x options ', () => {
      const optionContainer = wrapper.find(
        `.${defaultProps.baseClass}__filter-collapsable`,
      );
      expect(optionContainer.children().length).toBe(2);
    });
  });

  describe('behaviour', () => {
    it('clicking button will trigger onToggle', () => {
      const onToggle = jest.fn();
      wrapper.setProps({ onToggle });
      const filterButton = wrapper.find(
        `.${defaultProps.baseClass}__filter-btn`,
      );
      filterButton.simulate('click');
      expect(onToggle).toHaveBeenCalled();
    });
    it('clicking option will trigger onSelect', () => {
      const onSelect = jest.fn();
      wrapper.setProps({ onSelect });
      const optionButton = wrapper
        .find(`.${defaultProps.baseClass}__filter-collapsable`)
        .children()
        .first()
        .find('button');
      optionButton.simulate('click', { preventDefault: () => null });
      expect(onSelect).toHaveBeenCalledWith(defaultProps.options[0].value);
    });
  });
});
