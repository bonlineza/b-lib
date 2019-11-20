import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import SimpleSelect from './index';

const defaultProps = {
  options: [
    { label: 'apple', value: 'apple' },
    { label: 'banana', value: 'banana' },
  ],
  hideResetButton: true,
};

const setup = (props = {}) => {
  const testProps = {
    ...defaultProps,
    ...props,
  };

  return mount(<SimpleSelect {...testProps} />);
};

describe('SimpleSelect', () => {
  const map = {};
  beforeEach(() => {
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
  });

  it('renders', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('reset button is accessible', () => {
    const wrapper = setup({ hideResetButton: false });
    const resetButtonElement = wrapper.find(
      '.react-selectize-reset-button-container',
    );
    expect(resetButtonElement.length).toBe(1);
  });

  it('SimpleSelect renders two options', () => {
    const wrapper = setup({ open: true });
    expect(wrapper.find('.option-wrapper').length).toBe(2);
  });

  it('triggers prop onChange when SimpleSelect option is changed', () => {
    const onChange = jest.fn();
    const wrapper = setup({ open: true, onChange });
    const openWrapperElements = wrapper.find('OptionWrapper');
    openWrapperElements.first().invoke('onClick')({
      preventDefault: () => null,
      stopPropagation: () => null,
    });

    expect(onChange).toHaveBeenCalled();
  });
});
