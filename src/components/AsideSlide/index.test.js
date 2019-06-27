import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import AsideSlide from './index';

it('should render correctly <AsideSlide>', () => {
  const wrapper = mount(
    <AsideSlide title="Basic Aside Slide test" isOpen toggle={() => null}>
      <div>Some child element</div>
    </AsideSlide>,
  );
  expect(wrapper).toMatchSnapshot();
});
