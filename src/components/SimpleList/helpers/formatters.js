import React from 'react';
import { formatString as fS } from './formatString';
import fC from '../../../util/formatCurrency';

export const getArrayFormatterWithClass = (className = '') => value => (
  <span className={className}>{formatArray(value)}</span>
);

export const formatArray = value =>
  value.map((j: string, jk: number): React$Element<*> => (
    <span key={jk}>{formatString(j)}</span>
  ));

// NOTE: project currency formatter will decaelare custom formats and locales for use by 'numberal' library
// example project currency formatter
// const formatCurrency = currencyFormatter => (number, round, format) =>
//   formatCurrency(number, round, format);

export const formatCurrency = fC;
export const formatString = fS;
