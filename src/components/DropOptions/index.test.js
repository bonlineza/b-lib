import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';

import DropOptions from './index';

const testElementString = 'Test Base Element';
const TestBaseElement = () => <span>{testElementString}</span>;
const wrapperClass = 'test-wrapper-class';

const setup = baseElement =>
  shallow(
    <DropOptions wrapperClass={wrapperClass} baseElement={baseElement}>
      <div className="option-item">Option Item 1</div>
      <div className="option-item">Option Item 2</div>
    </DropOptions>,
  );

describe('DropOptions', () => {
  let wrapper;
  let button;
  let options;

  beforeEach(() => {
    wrapper = setup(TestBaseElement);
  });

  describe('Render', () => {
    it('wrapperClass', () => {
      expect(wrapper.find(`.${wrapperClass}`).length).toBe(1);
    });
    it('button', () => {
      button = wrapper.find('button');
      expect(button.length).toBe(1);
    });
    it('baseElement', () => {
      expect(button.find('span').length).toBe(1);
    });
  });

  describe('Behaviour', () => {
    it('class changes on click and children render', () => {
      button = wrapper.find('button');
      button.simulate('click');
      expect(wrapper.find('.drop-options__options--is-open').length).toBe(1);
      options = wrapper.find('.drop-options__options--is-open');
      expect(options.find('.option-item').length).toBe(2);
    });
    it('class changes back and children dont render', () => {
      wrapper = setup(TestBaseElement);
      button = wrapper.find('button');
      button.simulate('click');
      wrapper.update();
      button.simulate('click');
      wrapper.update();
      expect(wrapper.find('.drop-options__options--is-open').length).toBe(0);
      expect(wrapper.find('.drop-options__options').length).toBe(1);
      options = wrapper.find('.drop-options__options');
      expect(options.find('.option-item').length).toBe(0);
    });
  });
});
