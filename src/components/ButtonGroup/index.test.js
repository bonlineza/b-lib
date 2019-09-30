import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import ButtonGroup from './index';

const defaultProps = {
  alt: false,
  numButtons: 3,
  baseClass: 'test-button-group',
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(
    <ButtonGroup {...testProps}>
      <button type="button">Button 1</button>
      <button type="button">Button 2</button>
      <button type="button">Button 3</button>
      <button type="button">Button 4</button>
      <button type="button">Button 5</button>
    </ButtonGroup>,
  );
};

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('without errors', () => {
    expect(wrapper.length).toBe(1);
  });

  it('3 primary buttons', () => {
    const primaryButtons = wrapper.find(`.${defaultProps.baseClass}__primary`);
    expect(primaryButtons.children().length).toBe(3);
  });

  it('2 secondary buttons', () => {
    const secondaryButtons = wrapper.find(
      `.${defaultProps.baseClass}__secondary-collapsed`,
    );
    expect(secondaryButtons.children().length).toBe(2);
  });
});
