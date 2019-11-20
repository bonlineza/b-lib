import React from 'react';
import Tooltip from 'components/ToolTip/index';

export const wrapTooltip = (element, text) => (
  <Tooltip text={text}>{element}</Tooltip>
);
