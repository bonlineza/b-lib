import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './scss/Styles.scss';

const MobileSideMenu = ({
  menuItems = [],
  closeAction,
  footerContent = null,
  isOpen,
  menuTitle,
  dataIdentifier,
  baseClassName,
}) => {
  const menuContentRef = useRef();
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuContentRef && !menuContentRef.current.contains(e.target)) {
        closeAction();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAction]);

  return (
    <div className={`${baseClassName}${isOpen ? '--active' : ''}`}>
      <div className={`${baseClassName}__overlay`} />
      <div className={`${baseClassName}__content`} ref={menuContentRef}>
        <div className={`${baseClassName}__content__title`}>{menuTitle}</div>
        {menuItems.map((item, key) => (
          <div
            key={dataIdentifier ? `${dataIdentifier}--${key}` : key}
            className={`${baseClassName}__content__item`}>
            {item}
          </div>
        ))}

        {footerContent && (
          <div className={`${baseClassName}__content__footer`}>
            {footerContent()}
          </div>
        )}
      </div>
    </div>
  );
};

MobileSideMenu.propTypes = {
  menuTitle: PropTypes.string,
  menuItems: PropTypes.array,
  dataIdentifier: PropTypes.string,
  closeAction: PropTypes.func.isRequired,
  baseClassName: PropTypes.string,
};
MobileSideMenu.defaultProps = {
  menuItems: [],
  menuTitle: '',
  dataIdentifier: '',
  baseClassName: 'mobile-side-menu',
};

export default MobileSideMenu;
