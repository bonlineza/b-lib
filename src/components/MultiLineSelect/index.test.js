import React, { Fragment } from 'react';
import 'test-util/setup';
import MultiLineSelect from 'components/MultiLineSelect/index';
import { mount } from 'enzyme';

const defaultMultiLineProps = {
  label: 'Dummy Label',
  placeholder: 'Add Item',
  rowClassName: 'button-row',
  hasError: false,
  errors: [],
  multiline: true,
  viewOnly: false,
  onChange: () => false,
};

const ItemSelector = ({ addItem = () => null }) => (
  <Fragment>
    <button
      type="button"
      id="item-choice-one"
      onClick={() => addItem('Product One')}>
      Select Product One
    </button>
    <button
      type="button"
      id="item-choice-two"
      onClick={() => addItem('Product Two')}>
      Select Product Two
    </button>
    <button
      type="button"
      id="item-choice-three"
      onClick={() => addItem('Product Three')}>
      Select Product Three
    </button>
  </Fragment>
);

const WrappedMultiLineSelect = (props = {}) => {
  const selectorObj = {
    selector: ItemSelector,
  };

  const finalProps = {
    ...defaultMultiLineProps,
    ...props,
    selectorObj,
  };

  return <MultiLineSelect {...finalProps} />;
};

describe('MultiSelect', () => {
  it('Multiselect can add and remove an product one', () => {
    const wrapper = mount(<WrappedMultiLineSelect />);
    wrapper.find('#item-choice-one').simulate('click');
    expect(wrapper.find('.button-row--value').text()).toBe('Product One');
    wrapper.find('.button-row--value').simulate('click');
    expect(wrapper.find('.button-row').length).toBe(1);
  });

  it('Multiselect can only add one product to list', () => {
    const wrapper = mount(<WrappedMultiLineSelect multiline={false} />);

    wrapper.find('#item-choice-one').simulate('click');
    expect(wrapper.find('.button-row--value').text()).toBe('Product One');
    wrapper.find('.button-row--value').simulate('click');

    wrapper.find('#item-choice-two').simulate('click');
    expect(wrapper.find('.button-row--value').text()).toBe('Product Two');
    wrapper.find('.button-row--value').simulate('click');

    wrapper.find('#item-choice-three').simulate('click');
    expect(wrapper.find('.button-row--value').text()).toBe('Product Three');
    wrapper.find('.button-row--value').simulate('click');
  });
});
