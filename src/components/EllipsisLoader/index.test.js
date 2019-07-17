import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EllipsisLoader from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Ellipsis Loader', () => {
  it('loader__lds-ellipsis__dot should have background color #666', () => {
    const wrapper = shallow(<EllipsisLoader dotColor="#666" />);
    const dotElements = wrapper.find('.loader__lds-ellipsis__dot');

    dotElements.forEach(dot => {
      const dotBackgroundColor = dot.props().style.backgroundColor;
      expect(dotBackgroundColor).toBe('#666');
    });
  });
});
