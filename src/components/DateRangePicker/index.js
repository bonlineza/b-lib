import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';

type DataPickerChangeType = {
  startDate: number,
  endDate: number,
};

type PropsShape = {
  datepickerChanged?: Function,
  startDatePlaceholderText?: string,
  endDatePlaceholderText?: string,
  displayFormat?: string,
  numberOfMonths?: number,
  verticalSpacing?: number,
  startDateId?: string,
  endDateId?: string,
};

const DateRangeInput = ({
  datepickerChanged,
  startDatePlaceholderText,
  endDatePlaceholderText,
  displayFormat,
  numberOfMonths,
  verticalSpacing,
  startDateId,
  endDateId,
}: PropsShape) => {
  const [currentStartDate, setStartDate] = useState(null);
  const [currentEndendDate, setEndDate] = useState(null);
  const [isFocused, setIsFocused] = useState(null);
  return (
    <DateRangePicker
      startDateId={startDateId}
      endDateId={endDateId}
      showClearDates
      verticalSpacing={verticalSpacing}
      hideKeyboardShortcutsPanel
      enableOutsideDays
      isOutsideRange={(): boolean => false}
      startDatePlaceholderText={startDatePlaceholderText}
      endDatePlaceholderText={endDatePlaceholderText}
      numberOfMonths={numberOfMonths}
      displayFormat={displayFormat}
      startDate={currentStartDate}
      endDate={currentEndendDate}
      onDatesChange={(dates: DataPickerChangeType) => {
        const { startDate, endDate } = dates;
        setStartDate(startDate);
        setEndDate(endDate);
        return datepickerChanged({
          start: startDate,
          end: endDate,
        });
      }}
      focusedInput={isFocused}
      onFocusChange={(focusedInput: boolean) => setIsFocused(focusedInput)}
    />
  );
};

DateRangeInput.defaultProps = {
  datepickerChanged: () => false,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  displayFormat: 'LL',
  numberOfMonths: 2,
  verticalSpacing: 10,
  startDateId: 'sd-0',
  endDateId: 'ed-0',
};

export default DateRangeInput;
