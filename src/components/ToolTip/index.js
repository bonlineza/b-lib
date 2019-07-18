import React, { Fragment } from 'react';
import './scss/Styles.scss';

type PropsShape = {
  text: string,
  children: any,
};

const Tooltip = ({ text, children }: PropsShape) => (
  <span className="hover-tooltip">
    <Fragment>
      {children}
      <span id="hover-tooltip-inner" className="hover-tooltip__inner">
        <span className="hover-tooltip__inner__text">{text}</span>
      </span>
    </Fragment>
  </span>
);

export function wrapTooltip(element, text) {
  return <Tooltip text={text}>{element}</Tooltip>;
}

export default Tooltip;
