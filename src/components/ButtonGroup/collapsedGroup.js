/** @format */

// @flow

import React from 'react';

import GetSvg from 'components/GetSvg';

const CollapsedGroup = ({ children, expand, toggle }) =>
  React.Children.count(children) > 0 ? (
    <div
      className={`button-group__secondary${
        expand ? '--is-open' : '--is-closed'
      }`}>
      <div className="button-group__secondary-toggle">
        <button
          data-qe-id="action-toggle-buttongroup_secondary"
          className="button-group__secondary-toggle__btn"
          onClick={toggle}
          type="button">
          {' '}
          <GetSvg svg="menu" />
        </button>
      </div>
      <div className="button-group__secondary-collapsed">
        {React.Children.map(
          children,
          (child: React$Element<*>, index: number): React$Element<*> => (
            <div className="button-group__secondary__item" key={index}>
              {React.cloneElement(child, {
                className: 'button-group__secondary__item__btn',
                onClick: e => {
                  toggle();
                  child.props.onClick(e);
                },
              })}
            </div>
          ),
        )}
      </div>
    </div>
  ) : null;

export default CollapsedGroup;
