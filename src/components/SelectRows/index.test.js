import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';
import SelectRows from './index';

const defaultProps = {
  single: true,
  rows: [],
  onAddClick: null,
  onRemoveClick: null,
  rowClassName: 'select-rows',
  placeholder: 'Add Item',
  addActionRenderer: () => '+',
  removeActionRenderer: () => '-',
};

const rowsData = [
  {
    value: 'Item 1',
    key: 1,
  },
  {
    value: 'Item 2',
    key: 2,
  },
  {
    value: 'Item 3',
    key: 3,
  },
];

const setup = props => {
  const newProps = { ...defaultProps, ...props };
  return shallow(<SelectRows {...newProps} />);
};

describe('SimplePopup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('single mode - no rows', () => {
      const rows = wrapper.find(`.${defaultProps.rowClassName}`);
      expect(rows.length).toBe(1);
    });
    it('multi mode - no rows', () => {
      wrapper.setProps({ single: false });
      const rows = wrapper.find(`.${defaultProps.rowClassName}`);
      expect(rows.length).toBe(1);
    });
  });

  describe('Behaviour', () => {
    it('will render placeholder and addActionIcon', () => {
      wrapper.setProps();
      const firstRow = wrapper.find(`.${defaultProps.rowClassName}`).first();
      expect(firstRow.text()).toBe(
        `${defaultProps.placeholder}${defaultProps.addActionRenderer()}`,
      );
    });
    it('will render 4x rows when 3x data rows are given', () => {
      wrapper.setProps({ single: false, rows: rowsData });
      const rows = wrapper.find(`.${defaultProps.rowClassName}`);
      expect(rows.length).toBe(4);
    });
    it('onAddClick is tiggered when the first row is clicked', () => {
      const onAddClick = jest.fn();
      wrapper.setProps({ onAddClick });
      const addButton = wrapper.find(`.${defaultProps.rowClassName}`).first();
      addButton.simulate('click');
      expect(onAddClick.mock.calls.length).toBe(1);
    });
    it('onRemoveClick is triggered when second row is clicked', () => {
      const onRemoveClick = jest.fn();
      wrapper.setProps({ onRemoveClick, rows: rowsData });
      const removeButton = wrapper.find(`.${defaultProps.rowClassName}`).last();
      removeButton.simulate('click');
      expect(onRemoveClick.mock.calls.length).toBe(1);
    });
  });
});
