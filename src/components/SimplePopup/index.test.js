import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import SimplePopup from './index';

const testOptions = [
  {
    cb: () => null,
    buttonText: 'Test Cancel Button',
    buttonClass: 'cancel-button',
    dataQeId: 'button-cancel',
  },
  {
    cb: () => null,
    buttonText: 'Test Action Button',
    buttonClass: 'action-button',
    dataQeId: 'button-submit',
  },
];

const defaultBaseClass = 'popup-modal';

const defaultProps = {
  isOpen: false,
  baseClass: defaultBaseClass,
  options: [],
  title: 'Test Title',
  renderContent: null,
  close: jest.fn(),

  renderLoader: () => <div className="popup-loader">Loading...</div>,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(<SimplePopup {...testProps} />);
};

describe('SimplePopup', () => {
  let wrapper;
  const map = {};
  beforeEach(() => {
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    wrapper = setup({ isOpen: false });
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('baseClass', () => {
      wrapper.setProps({ isOpen: true });
      expect(wrapper.find(`.${defaultBaseClass}`).length).toBe(1);
    });
  });

  describe('Behaviour', () => {
    it('will not render any content by default', () => {
      expect(wrapper.find(`.popup-content`).length).toBe(0);
    });
    it('will render content when renderContent is supplied a valid renderer', () => {
      wrapper.setProps({
        isOpen: true,
        renderContent: () => (
          <div className="popup-content">some div with content</div>
        ),
      });
      expect(wrapper.find(`.popup-content`).length).toBe(1);
    });
    it('will render content when description is supplied', () => {
      wrapper.setProps({
        isOpen: true,
        description: 'test description',
      });
      expect(wrapper.find(`p`).text()).toContain('description');
    });
    it('renders two buttons when given options prop', () => {
      wrapper.setProps({ options: testOptions, isOpen: true });
      const buttons = wrapper.find(`button`);
      expect(buttons.length).toBe(2);
    });
    it('renders loader when showLoader prop is set to true', () => {
      wrapper.setProps({ showLoader: true, isOpen: true });
      const loader = wrapper.find(`.popup-loader`);
      expect(loader.length).toBe(1);
    });
    it('hides loader when showLoader prop is set to false', () => {
      wrapper.setProps({ showLoader: false, isOpen: true });
      const loader = wrapper.find(`.popup-loader`);
      expect(loader.length).toBe(0);
    });

    it('modal does not close if clicked outside the area of the popup', () => {
      wrapper.setProps({ isOpen: true });
      const modalElement = wrapper
        .find('.modal')
        .first()
        .getDOMNode();
      map.click({ target: modalElement });

      expect(wrapper.props().close).toHaveBeenCalled();
      wrapper.setProps({
        isOpen: true,
        cannotOutsideClickClose: true,
      });

      map.click({ target: modalElement });
      // It will be one and not zero because close ran the previous time
      expect(wrapper.props().close).toHaveBeenCalledTimes(1);
    });
  });
});
