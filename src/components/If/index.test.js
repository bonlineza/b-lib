import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import If from './index';

const renderChildren = 'Render Something';

const setup = ({ condition = false }) =>
  mount(<If condition={condition}>{renderChildren}</If>);

describe('If', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({});
  });

  it('Renders without error', () => {
    expect(wrapper.length).toBe(1);
  });

  it('Renders children when condition is true', () => {
    wrapper.setProps({ condition: true });
    expect(wrapper.text()).toBe(renderChildren);
  });

  it('Renders empty when condition is false', () => {
    wrapper.setProps({ condition: false });
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
