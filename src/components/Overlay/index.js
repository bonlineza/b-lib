import React, { useState } from 'react';
import './scss/Styles.scss';

// see $wrap-widths in _wraps.css for sizes

type OverlayProps = {
  baseClass: string,
  children: [] | Object,
  isOpen: boolean,
  size: string,
};

const Overlay = ({ baseClass, children, isOpen, size }: OverlayProps) => {
  const [activeChild, setActiveChild] = useState(0);
  const maxChildCount = React.Children.count(children);
  return (
    <div className={`${baseClass} ${isOpen ? 'is-open' : 'is-closed'}`}>
      <div className={`${baseClass}__inner ${size ? `wrap${size}` : ''}`}>
        {React.Children.map(
          children,
          (child, index) =>
            index === activeChild &&
            React.cloneElement(
              child,
              child.type !== 'div'
                ? {
                    next: () => {
                      if (maxChildCount - 1 > activeChild) {
                        setActiveChild(activeChild + 1);
                      }
                    },
                    prev: () => {
                      if (activeChild > 0) {
                        setActiveChild(activeChild - 1);
                      }
                    },
                  }
                : {},
            ),
        )}
      </div>
    </div>
  );
};

Overlay.defaultProps = {
  children: [],
  size: '',
  baseClass: 'modal',
};

export default Overlay;
