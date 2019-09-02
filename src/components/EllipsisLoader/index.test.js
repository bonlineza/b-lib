import React from 'react';
import { shallow } from 'enzyme';
import 'test-util/setup';
import EllipsisLoader from './index';

describe('Ellipsis Loader', () => {
  it('EllipsisLoader renders', () => {
    const wrapper = shallow(<EllipsisLoader />);
    expect(wrapper.length).toBe(1);
  });

  it('test that there are four dots', () => {
    const wrapper = shallow(<EllipsisLoader />);
    const dotElements = wrapper.find('.loader__ellipsis__dot');

    expect(dotElements.length).toBe(4);
  });
});
