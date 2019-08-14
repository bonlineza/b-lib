import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import UntilReady from './index';

const defaultProps = {
  ready: false,
  waiting: false,
  notReadyOrWaitingText: 'failed',
  loadingRenderer: () => <div id="until-ready-loading">loading</div>,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(
    <UntilReady {...testProps}>
      <div id="until-ready-child">Child content 1</div>
    </UntilReady>,
  );
};

describe('SwitchView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Behaviour', () => {
    it('while `waiting` it true, the `loadingRenderer` will run', () => {
      wrapper.setProps({ waiting: true, ready: false });
      expect(wrapper.find(`#until-ready-loading`).length).toBe(1);
    });
    it('while `waiting` false and `ready` is true - child element should render', () => {
      wrapper.setProps({ waiting: false, ready: true });
      expect(wrapper.find(`#until-ready-child`).length).toBe(1);
    });
    it('while `waiting` is false and `ready` false - error message should render', () => {
      wrapper.setProps({ waiting: false, ready: false });
      expect(wrapper.text()).toBe(defaultProps.notReadyOrWaitingText);
    });
  });
});
