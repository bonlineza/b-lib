import React from 'react';
import { formatString as fS } from './formatString';
import fC from '../../../util/formatCurrency';
import { parseDate as formatUnixTimestamp } from '../../../util/dates';

export const getArrayFormatterWithClass = (className = '') => value => (
  <span className={className}>{formatArray(value)}</span>
);

export const formatArray = value =>
  value.map((j: string, jk: number): React$Element<*> => (
    <span key={jk}>{formatString(j)}</span>
  ));

export const formatCurrency = fC;
export const formatString = fS;
export const formatDate = formatUnixTimestamp;
