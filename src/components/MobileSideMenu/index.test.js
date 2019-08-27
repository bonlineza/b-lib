import React, { Fragment, useState } from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import MobileSideMenu from 'components/MobileSideMenu/index';

const WrappedMobileSideMenu = () => {
  const menuItems = [
    <a href="#">Menu item 1</a>,
    <a href="#">Menu item 2</a>,
    <a href="#">Menu item 3</a>,
    <a href="#">Menu item 4</a>,
  ];

  const footerContent = () => <div>Some footer content</div>;

  const [isActive, setActiveState] = useState(false);
  return (
    <Fragment>
      <button
        className="mobile-button"
        type="button"
        onClick={() => setActiveState(!isActive)}>
        Open
      </button>
      <MobileSideMenu
        isOpen={isActive}
        menuItems={menuItems}
        menuTitle="Menu Title"
        closeAction={() => setActiveState(false)}
        footerContent={footerContent}
      />
    </Fragment>
  );
};

describe('MobileSideMenu', () => {
  it('Test the mobile menu renders when button is clicked', () => {
    const wrapper = mount(<WrappedMobileSideMenu />);
    wrapper.find('.mobile-button').simulate('click');
    expect(wrapper.find('.mobile-side-menu--active').length).toBe(1);
  });

  it('Tests that overlay is present when button is clicked', () => {
    const wrapper = mount(<WrappedMobileSideMenu />);
    wrapper.find('.mobile-button').simulate('click');
    expect(wrapper.find('.mobile-side-menu__overlay').length).toBe(1);
  });

  it('Tests that the four menu items passed down in MobileSideMenu are displayed', () => {
    const wrapper = mount(<WrappedMobileSideMenu />);
    wrapper.find('.mobile-button').simulate('click');
    const menuItems = wrapper.find('.mobile-side-menu__content__item');
    expect(menuItems.length).toBe(4);
  });
});
