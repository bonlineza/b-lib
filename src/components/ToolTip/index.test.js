import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';
import { wrapTooltip } from './index';

const buttonText = 'children';
const defaultProps = {
  text: 'text',
  children: <button>{buttonText}</button>,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return shallow(wrapTooltip(testProps.children, testProps.text));
};

describe('ToolTip', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('without errors', () => {
      expect(wrapper.length).toBe(1);
    });

    it('children rendered without error', () => {
      expect(wrapper.find(`button`).text()).toContain('children');
    });

    it('text rendered without error', () => {
      expect(wrapper.find(`#hover-tooltip-inner`).text()).toContain('text');
    });
  });
});
