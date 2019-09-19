import React, { useLayoutEffect, useState } from 'react';
import { DateRangePicker as ReactDates } from 'react-dates';

type DataPickerChangeType = {
  startDate: number,
  endDate: number,
};

const DateRangePicker = ({
  datepickerChanged,
  init,
  startDatePlaceholderText,
  endDatePlaceholderText,
  displayFormat = 'LL',
  numberOfMonths = 2,
  verticalSpacing = 10,
}) => {
  const [currentStartDate, setStartDate] = useState(null);
  const [currentEndendDate, setEndDate] = useState(null);
  const [isFocused, setIsFocused] = useState(null);
  useLayoutEffect(() => {
    if (init) {
      init();
    }
  }, [init]);
  return (
    <ReactDates
      startDateId="0"
      endDateId="0"
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

export default DateRangePicker;
