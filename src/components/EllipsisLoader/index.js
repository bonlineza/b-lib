/** @format */

import React from 'react';
import './scss/Styles.scss';

type PropsShape = {
  /** css class name for the base div of this component */
  baseClassName?: string,
};

/**
 * EllipsisLoader is a placeholder animation for indicating that data is Loading
 */
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
