import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import ButtonOrDiv from './ButtonOrDiv';

const defaultProps = {
  allowClick: true,
  children: <div>some content</div>,
  index: 0,
  clickAct: () => null,
  item: { some: 'data', key1: 'value 1' },
  identifier: 'some-unique-identifier',
  baseClass: 'simple-list__body__row',
};

const setup = props => {
  const newProps = { ...defaultProps, ...props };
  return mount(<ButtonOrDiv {...newProps} />);
};

describe('ButtonOrDiv - Body', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('no button when allowClick is false', () => {
      wrapper.setProps({ allowClick: false });
      const comp = wrapper.find('button');
      expect(comp.length).toBe(0);
    });
  });
  describe('Behaviour', () => {
    it('clickAction is called on click', () => {
      const clickAct = jest.fn();
      wrapper.setProps({ clickAct });
      const button = wrapper.find('button');
      button.simulate('click', { preventDefault: () => null });
      expect(clickAct).toHaveBeenCalled();
    });
  });
});
