/** @format */

import React from 'react';
import './scss/Styles.scss';

type PropsShape = {
  baseClassName?: string,
};

const EllipsisLoader = ({ baseClassName }: PropsShape) => (
  <div className={baseClassName}>
    <div className={`${baseClassName}__ellipsis`}>
      <div className={`${baseClassName}__ellipsis__dot`} />
      <div className={`${baseClassName}__ellipsis__dot`} />
      <div className={`${baseClassName}__ellipsis__dot`} />
      <div className={`${baseClassName}__ellipsis__dot`} />
    </div>
  </div>
);

EllipsisLoader.defaultProps = {
  baseClassName: 'loader',
};

export default EllipsisLoader;
