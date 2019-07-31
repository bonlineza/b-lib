import React from 'react';

const CollapsedGroup = ({
  baseClass = 'button-group',
  id = 'action-toggle-buttongroup_secondary',
  children,
  expand,
  toggle,
  toggleButtonContents,
}) =>
  React.Children.count(children) > 0 ? ( // code smell: how best do we solve these massive ternaries?
    <div
      className={`${baseClass}__secondary${
        expand ? '--is-open' : '--is-closed'
      }`}>
      <div className={`${baseClass}__secondary-toggle`}>
        <button
          data-qe-id={id}
          className={`${baseClass}__secondary-toggle__btn`}
          onClick={toggle}
          type="button">
          {toggleButtonContents}
        </button>
      </div>
      <div className={`${baseClass}__secondary-collapsed`}>
        {React.Children.map(
          children,
          (child: React$Element<*>, index: number): React$Element<*> => (
            <div className={`${baseClass}__secondary__item`} key={index}>
              {React.cloneElement(child, {
                className: `${baseClass}__secondary__item__btn`,
                onClick: e => {
                  toggle();
                  child.props.onClick(e);
                },
              })}
            </div>
          ),
        ).reverse()}
      </div>
    </div>
  ) : null;

export default CollapsedGroup;
