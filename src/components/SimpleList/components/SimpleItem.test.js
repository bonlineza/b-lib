import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import SimpleItem from './SimpleItem';

const defaultProps = {
  text: 'some text value',
  flex: '20%',
  align: 'left',
  itemClass: 'custom__item',
  customFormatter: value => value,
};

const setup = props => {
  const newProps = { ...defaultProps, ...props };
  return mount(<SimpleItem {...newProps} />);
};

describe('SimpleItem - Body', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('output text within span', () => {
      const comp = wrapper.find('span').first();
      expect(comp.text()).toBe(defaultProps.text);
    });
    it('uses a customFormatter when supplied', () => {
      const customFormatter = value => value.concat(value);
      wrapper.setProps({ customFormatter });
      const comp = wrapper.find('span').first();
      expect(comp.text()).toBe(defaultProps.text.concat(defaultProps.text));
    });
  });
});
