/** @format */

import React from 'react';
import './scss/Styles.scss';

const EllipsisLoader = ({ baseClassName = 'loader' }) => (
  <div className={baseClassName}>
    <div className={`${baseClassName}__ellipsis`}>
      <div className={`${baseClassName}__ellipsis__dot`} />
      <div className={`${baseClassName}__ellipsis__dot`} />
      <div className={`${baseClassName}__ellipsis__dot`} />
      <div className={`${baseClassName}__ellipsis__dot`} />
    </div>
  </div>
);

export default EllipsisLoader;
