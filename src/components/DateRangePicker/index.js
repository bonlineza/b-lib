import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';

type DataPickerChangeType = {
  startDate: number,
  endDate: number,
};

type PropsShape = {
  /** callback function that runs on date change. Holds `Moment Obj` in
   * paramenter */
  datepickerChanged?: Function,
  /** placeholder text for start date input */
  startDatePlaceholderText?: string,
  /** placeholder text for end date input */
  endDatePlaceholderText?: string,
  /** Display LongDateFormat specified
   *  The following formats are acceptable:
   *  - `LTS:` Time (with seconds) i.e `08:30:00 PM`
   *  - `LT:` Time (without seconds) i.e `08:30 PM`
   *  - `LL:` Month name, day of month, year `September 4 1986`
   *  - `LLL:` Month name, day of month, year, time `September 4 1986 8:30 PM`
   *  - `LLLL:` Day of week, month name, day of month, year, time `Thursday, September 4 1986 8:30 PM`
   *
   * */
  displayFormat?: string,
  /** Number of months shown for selection */
  numberOfMonths?: number,
  /** vertical spacing for days in open calendar selection */
  verticalSpacing?: number,
  /** identifier for start date input */
  startDateId?: string,
  /** identifier for end date input */
  endDateId?: string,
};

/**
 * DateRangePicker is a simple wrapper for DateRangePicker from 'react-dates' with a few commonly used defaults
 */
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
