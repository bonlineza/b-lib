import React from 'react';
import { shallow } from 'enzyme';
import 'test-util/setup';
import EllipsisLoader from './index';

describe('Ellipsis Loader', () => {
  it('loader__lds-ellipsis__dot should have background color #666', () => {
    const wrapper = shallow(<EllipsisLoader dotColor="#666" />);
    const dotElements = wrapper.find('.loader__lds-ellipsis__dot');

    dotElements.forEach(dot => {
      const dotBackgroundColor = dot.props().style.backgroundColor;
      expect(dotBackgroundColor).toBe('#666');
    });
  });

  it('test that four dots render', () => {
    const wrapper = shallow(<EllipsisLoader dotColor="#666" />);
    const dotElements = wrapper.find('.loader__lds-ellipsis__dot');

    expect(dotElements.length).toBe(4);
  });
});
