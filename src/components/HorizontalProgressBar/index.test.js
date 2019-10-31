import { mount } from 'enzyme';
import React from 'react';
import 'test-util/setup';
import HorizontalProgressBar from './index';

describe('HorizontalProgressBar', () => {
  it('Horizontal Bar renders', () => {
    const wrapper = mount(<HorizontalProgressBar />);
    expect(wrapper.find('.horizontal-progress-bar').length).toBe(1);
  });

  it('Horizontal Bar has currentProgress 10 and totalProgress 30', () => {
    const wrapper = mount(
      <HorizontalProgressBar totalProgress={30} currentProgress={10} />,
    );

    const { totalProgress, currentProgress } = wrapper.props();

    expect(totalProgress).toBe(30);
    expect(currentProgress).toBe(10);
  });

  it('Horizontal Bar default props currentProgress and totalProgress to be zero', () => {
    const wrapper = mount(<HorizontalProgressBar />);
    const { totalProgress, currentProgress } = wrapper.props();
    expect(totalProgress).toBe(0);
    expect(currentProgress).toBe(0);
  });
});
