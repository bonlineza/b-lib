import React from 'react';
import 'test-util/setup';
import OverlayChild from 'test-util/OverlayChild';
import { mount } from 'enzyme';

import Overlay from './index';

const setup = ({ isOpen = false, baseClass = 'overlay' }) =>
  mount(
    <Overlay isOpen={isOpen} baseClass={baseClass}>
      <OverlayChild id="1" />
      <OverlayChild id="2" />
    </Overlay>,
  );

describe('Overlay', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ isOpen: false });
  });

  describe('Render', () => {
    it('Overlay', () => {
      expect(wrapper.length).toBe(1);
    });
    it('baseClass', () => {
      expect(wrapper.find(`.overlay`).length).toBe(1);
    });
  });

  describe('Behaviour', () => {
    it('is-closed by default', () => {
      expect(wrapper.find(`.is-closed`).length).toBe(1);
    });
    it('is-open is added when the prop isOpen is set to true', () => {
      wrapper.setProps({ isOpen: true });
      expect(wrapper.find(`.is-open`).length).toBe(1);
    });
    it('children are not rendered by default', () => {
      const firstChild = wrapper.find(`#overlay-child-1`);
      expect(firstChild.length).toBe(0);
    });
    it('children are rendered when isOpen is set', () => {
      wrapper.setProps({ isOpen: true });
      const firstChild = wrapper.find(`#overlay-child-1`);
      expect(firstChild.length).toBe(1);
    });
    it('trigger "next" from first child renders second child', () => {
      wrapper.setProps({ isOpen: true });
      const firstChild = wrapper.find(`#overlay-child-1`);
      const firstChildButton = firstChild.find('#next-button');
      firstChildButton.simulate('click');
      const secondChild = wrapper.find(`#overlay-child-2`);
      expect(secondChild.length).toBe(1);
    });
    it('trigger "prev" from second child renders first child', () => {
      wrapper.setProps({ isOpen: true });
      let firstChild = wrapper.find(`#overlay-child-1`);
      expect(firstChild.length).toBe(1);
      firstChild.find('#next-button').simulate('click');
      let secondChild = wrapper.find(`#overlay-child-2`);
      expect(secondChild.length).toBe(1);
      secondChild.find('#prev-button').simulate('click');
      secondChild = wrapper.find(`#overlay-child-2`);
      expect(secondChild.length).toBe(0);
      firstChild = wrapper.find(`#overlay-child-1`);
      expect(firstChild.length).toBe(1);
    });
  });
});
