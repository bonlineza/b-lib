import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import DateRangeInput from './index';

const setup = (props = {}) => mount(<DateRangeInput {...props} />);

describe('DateRangePicker', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('Renders', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders two inputs (Start Date and End Date Input)', () => {
    expect(wrapper.find("input[id='sd-0']").length).toBe(1);
    expect(wrapper.find("input[id='ed-0']").length).toBe(1);
  });

  it('input change triggers on datepickerChanged', () => {
    const customWrapper = setup({ datepickerChanged: jest.fn() });
    const inputElement = customWrapper.find("input[id='sd-0']");
    inputElement.simulate('change', { target: { value: '25/03/1994' } });
    const { datepickerChanged } = customWrapper.props();
    expect(datepickerChanged).toHaveBeenCalledTimes(1);
  });

  it('clear icon button renders', () => {
    const clearButtonElement = wrapper.find(
      'button.DateRangePickerInput_clearDates',
    );
    expect(clearButtonElement.length).toBe(1);
  });

  it('startDatePlaceholderText prop`s default value is `Start Date`', () => {
    const { startDatePlaceholderText } = wrapper.props();
    expect(startDatePlaceholderText).toBe('Start Date');
  });

  it('startDatePlaceholderText prop`s custom value is `BOnline Start Date`', () => {
    const customWrapper = setup({
      startDatePlaceholderText: 'BOnline Start Date',
    });
    const { startDatePlaceholderText } = customWrapper.props();
    expect(startDatePlaceholderText).toBe('BOnline Start Date');
  });
});
