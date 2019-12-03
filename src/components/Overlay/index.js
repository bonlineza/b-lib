import React, { useState } from 'react';
import './scss/Styles.scss';

// see $wrap-widths in _wraps.css for sizes

type OverlayProps = {
  /** css class for root div. child element css classes will have this `baseClass`
   * preprended
   * */
  baseClass?: string,
  /** Content that `<Overlay />` has wrapped */
  children?: [] | Object,
  /** if true Overlay is visible */
  isOpen: boolean,
  /** Size of the div.${baseClass}__inner */
  size?: string,
};

/**
 * Overlay is a simple component designed as a modal background, but also allows multiple children to control which child is rendered (next/prev)
 */
const Overlay = ({ baseClass, children, isOpen, size }: OverlayProps) => {
  const [activeChild, setActiveChild] = useState(0);
  const maxChildCount = React.Children.count(children);
  return (
    <div className={`${baseClass} ${isOpen ? 'is-open' : 'is-closed'}`}>
      <div className={`${baseClass}__inner ${size ? `wrap${size}` : ''}`}>
        {isOpen &&
          React.Children.map(
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
