import React from 'react';
import Tooltip from './index';

export const wrapTooltip = (element, text) => (
  <Tooltip text={text}>{element}</Tooltip>
);
