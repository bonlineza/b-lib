import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import DropOptions from './index';

it('should render correctly <DropOptions>', () => {
  const wrapper = mount(
    <DropOptions
      wrapperClass="test-wrapper-class"
      baseElement={() => <span>Base Element</span>}>
      <div>Some child element</div>
    </DropOptions>,
  );
  expect(wrapper).toMatchSnapshot();
});
