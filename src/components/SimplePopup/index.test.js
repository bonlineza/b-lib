import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import SimplePopup from './index';

const testOptions = [
  {
    cb: () => {
      console.log('maybe close the popup');
    },
    buttonText: 'Test Cancel Button',
    buttonClass: 'cancel-button',
    dataQeId: 'button-cancel',
  },
  {
    cb: () => {
      console.log('Do something else... maybe trigger the loading');
    },
    buttonText: 'Test Action Button',
    buttonClass: 'action-button',
    dataQeId: 'button-submit',
  },
];

const defaultBaseClass = 'popup-modal';

const setup = ({
  isOpen = false,
  baseClass = defaultBaseClass,
  options = [],
  renderContent = null,
}) =>
  mount(
    <SimplePopup
      baseClass={baseClass}
      isOpen={isOpen}
      title="Test Title"
      close={() => console.log('Close Action Called')}
      renderLoader={() => <div className="popup-loader">Loading...</div>}
      renderContent={renderContent}
      options={options}
    />,
  );

describe('SimplePopup', () => {
  let wrapper;

  beforeEach(() => {
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
  });
});