import React, { Component } from 'react';
import { wrapTooltip } from 'components/ToolTip';

// todo: reword date/currency parser
// import { parseDate } from 'helpers/dates';
// import { fC } from 'helpers/locale';
// temp placeholders
const parseDate = val => val;
const fC = val => val;

// TODO: this should be a generic function, and confitions and formatting functions to be passed in as config - allowing expandability and project differences

/**
 * Detects various keywords instructing the formatter to parse as Date, Currency, SVG or Bolded
 */
export const formatString = (string: string, SvgComponent: Component) => {
  if (string === null) return '';
  let toRender;
  let renderFormat;
  let result = string;
  let tooltipText = '';
  const indexTarget = 1;

  switch (true) {
    case typeof string !== 'string':
      result = string;
      break;
    case string.includes('\\:d'):
      toRender = string.split('\\:d')[indexTarget];
      renderFormat = 'L';

      if (toRender.includes('|')) {
        renderFormat = toRender.split('|')[indexTarget];
      }

      result = (
        <span className="fw--bold">
          {parseDate(parseInt(toRender, 10), renderFormat)}
        </span>
      );
      break;

    case string.includes('\\c:'):
      result = <span>{fC(string.split('\\c:')[indexTarget])}</span>;
      break;
    case string.includes('\\:'):
      toRender = string.split('\\:')[indexTarget];
      renderFormat = '';

      if (toRender.includes('|')) {
        renderFormat = toRender.split('|')[indexTarget];
        [toRender] = toRender.split('|');
      }

      result = <SvgComponent svg={toRender} wrapperClass={renderFormat} />;
      break;

    case string.includes('\\*'):
      result = <span className="fw--bold">{string.split('\\*')[1]}</span>;
      break;

    default:
      result = string;
      break;
  }
  /* @todo
   * Handle unexpected types a bit more neatly,
   * we previously strictly expected strings from the backend, however, we no
   * longer do since numbers are valid (to make calculations on totals of
   * payment and job lists in projects)
   * - @robguy21
   */
  if (string.includes && string.includes('\\tp:')) {
    tooltipText = string.split('\\tp:')[indexTarget];
    result = wrapTooltip(result, tooltipText);
  }
  return result;
};
