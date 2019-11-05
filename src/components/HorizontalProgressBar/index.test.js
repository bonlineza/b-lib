import { mount } from 'enzyme';
import React from 'react';
import 'test-util/setup';
import HorizontalProgressBar from './index';

describe('HorizontalProgressBar', () => {
  it('Horizontal Bar renders', () => {
    const wrapper = mount(<HorizontalProgressBar />);
    expect(wrapper.find('.horizontal-progress-bar').length).toBe(1);
  });

  it('Horizontal Bar has progressPercentage of 30', () => {
    const wrapper = mount(<HorizontalProgressBar progressPercentage={30} />);

    const { progressPercentage } = wrapper.props();

    expect(progressPercentage).toBe(30);
  });

  it('Horizontal Bar progressPercentage prop is zero by default', () => {
    const wrapper = mount(<HorizontalProgressBar />);
    const { progressPercentage } = wrapper.props();
    expect(progressPercentage).toBe(0);
  });
});
