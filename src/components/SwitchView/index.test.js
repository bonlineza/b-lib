import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import SwitchView from './index';

const testViews = [
  {
    type: 'viewType1',
    label: 'Test List',
    active: true,
  },
  {
    type: 'viewType2',
    label: 'Test Forms',
    active: false,
  },
];

const defaultProps = {
  views: testViews,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(
    <SwitchView {...testProps}>
      <div type="viewType1">
        <div className="switchview-child-1">Child 1</div>
      </div>
      <div type="viewType2">
        <div className="switchview-child-2">Child 2</div>
      </div>
    </SwitchView>,
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
    it('will render the "active" view by default', () => {
      expect(wrapper.find(`.switchview-child-1`).length).toBe(1);
    });
    it('will not render the "inactive" view by default', () => {
      expect(wrapper.find(`.switchview-child-2`).length).toBe(0);
    });
    it('switch views to second child when clikcing the second button', () => {
      const secondButton = wrapper.find('button').at(1);
      secondButton.simulate('click');
      expect(wrapper.find(`.switchview-child-1`).length).toBe(0);
      expect(wrapper.find(`.switchview-child-2`).length).toBe(1);
    });
    it('wont render buttons when there is only one configured view', () => {
      wrapper = setup({
        views: [
          {
            type: 'viewType2',
            label: 'Test Forms',
            active: true,
          },
        ],
      });
      expect(wrapper.find('button').length).toBe(0);
    });
  });
});
