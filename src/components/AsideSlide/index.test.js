import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';
import AsideSlide from './index';

const defaultProps = {
  title: 'Basic Test Title',
  isOpen: false,
  toggle: () => null,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return shallow(
    <AsideSlide {...testProps}>
      <div className="aside-child">Some child element</div>
    </AsideSlide>,
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

  it('open state', () => {
    wrapper.setProps({ isOpen: true });
    const child = wrapper.find('.is-open');
    expect(child.length).toBe(1);
  });

  it('child does not render by default', () => {
    const child = wrapper.find('.aside-child');
    expect(child.length).toBe(0);
  });

  it('child renders when isOpen is set', () => {
    wrapper = setup({
      isOpen: true,
    });
    const child = wrapper.find('.aside-child');
    expect(child.length).toBe(1);
  });

  it('slidebar', () => {
    wrapper = setup({
      isOpen: true,
      slideBar: () => <div className="aside-slidebar">Test</div>,
    });
    const child = wrapper.find('.aside-slidebar');
    expect(child.length).toBe(1);
  });
});
