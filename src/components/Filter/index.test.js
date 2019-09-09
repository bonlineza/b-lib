import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';

import Filter from './index';

const defaultProps = {
  callback: () => null,
  baseClass: 'list-filter',
  predefined: [],
  isLoading: false,
  isLoadingContent: () => null,
  centered: false,
  addDatepicker: false,
  name: 'filter',
  title: 'Filter Title',
  initialText: 'initialSearchValue',
  groupSelection: null,
  addFilter: null,
  datepickerCallback() {
    return null;
  },
  request: {
    success: true,
    error: false,
    loading: false,
  },
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return shallow(<Filter {...testProps} />);
};

describe('Filter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });

    it('PredefinedFilter wen props are set', () => {
      wrapper.setProps({
        predefined: [
          {
            text: 'Option 1',
            value: '1',
          },
        ],
      });
      const PredefinedFilter = wrapper.find(`PredefinedFilter`);
      expect(PredefinedFilter.length).toBe(1);
    });

    it('show loadingContent when in isLoading state', () => {
      const loadingText = '-Loading-';
      wrapper.setProps({
        isLoading: true,
        isLoadingContent: () => loadingText,
      });
      const loader = wrapper.find(`[data-qe-id='loading-indicator']`);
      expect(loader.text()).toBe(loadingText);
    });
    it('show DatePicker when in addDatepicker is set', () => {
      wrapper.setProps({
        addDatepicker: true,
      });
      const picker = wrapper.find(`DateRangePicker`);
      expect(picker.length).toBe(1);
    });
    it('show SimpleSelect when in groupSelection is set', () => {
      wrapper.setProps({
        groupSelection: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ],
      });
      const picker = wrapper.find(`SimpleSelect`);
      expect(picker.length).toBe(1);
    });
    it('run addFilter when is set', () => {
      wrapper.setProps({
        addFilter: () => (
          <span data-qe-id="some-custom-filter">Some new Filter</span>
        ),
      });
      const customFilter = wrapper.find('[data-qe-id="some-custom-filter"]');
      expect(customFilter.length).toBe(1);
    });
  });

  describe('behaviour', () => {
    it('trigger callback when input is changed', () => {
      const changeValue = 'valueChanged';
      const callback = jest.fn();
      wrapper.setProps({ callback, debounce: 0 });
      const searchInput = wrapper.find(
        `[data-qe-id="${defaultProps.name}-table-search-field"]`,
      );
      searchInput.simulate('change', { target: { value: changeValue } });
      expect(callback).toHaveBeenCalledWith(changeValue);
    });
  });
});
