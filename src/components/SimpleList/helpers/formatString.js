import React, { Component } from 'react';
import { wrapTooltip } from 'components/ToolTip';
import { formatCurrency, formatDate } from './formatters';

/**
 * Detects various keywords instructing the formatter to parse as Date, Currency, SVG or Bolded
 * keywords:
 * \:d and optionally prepend |<Date Format> - example: '|L\d:' for the longform date format - note: the default format is Longform
 * \:c - for a currency format
 * \:<some-svg-key>|<some-optional-class-name>\: or \:<some-svg-key>\: - the latter skips the class name
 * \:*<string-to-be-bolded>\:* - this warps a bolding span around a string - cam be anywhere withing a large string
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
      result = formatDate(parseInt(toRender, 10), renderFormat);
      break;

    case string.includes('\\c:'):
      result = formatCurrency(string.split('\\c:')[indexTarget]);
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
