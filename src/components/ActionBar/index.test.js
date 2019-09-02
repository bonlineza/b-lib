import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import ActionBar from './index';

const defaultProps = {
  messages: [],
  clearList: () => null,
  focus: () => null,
  baseClassName: 'action-bar',
  id: 'view-showing-actionbar',
  formatter: null,
  visibleDuration: 2000,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(<ActionBar {...testProps} />); // use mount here because shallow does not trigger hooks
};

describe('ActionBar', () => {
  describe('renders', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    it('without errors', () => {
      expect(wrapper.length).toBe(1);
    });

    it('no text by default', () => {
      const child = wrapper.find('p');
      expect(child.text()).toBe('');
    });
  });

  describe('renders with messages', () => {
    let wrapper;
    const focus = jest.fn();
    const clearList = jest.fn();
    const firstMessage = 'one messages';

    beforeEach(() => {
      wrapper = setup({ messages: [firstMessage], focus, clearList });
    });

    it('canShow will call focus', () => {
      expect(focus).toHaveBeenCalled();
    });

    it('text renders', () => {
      const child = wrapper.find('p');
      expect(child.text()).toBe(firstMessage);
    });

    it('text renders with formatter', () => {
      const formatter = (text: string) => [...text].reverse();
      wrapper.setProps({ formatter });
      const child = wrapper.find('p');
      expect(child.text()).toBe(formatter(firstMessage).join(''));
    });

    it('clearList triggers on unmount', () => {
      wrapper.unmount();
      expect(clearList).toHaveBeenCalled();
    });
  });
});
