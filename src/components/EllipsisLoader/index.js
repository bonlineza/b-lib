/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import './scss/Styles.scss';

const EllipsisLoader = ({ dotColor }) => (
  <div className="loader">
    <div className="loader__lds-ellipsis">
      <div
        className="loader__lds-ellipsis__dot"
        style={{ backgroundColor: dotColor }}
      />
      <div
        className="loader__lds-ellipsis__dot"
        style={{ backgroundColor: dotColor }}
      />
      <div
        className="loader__lds-ellipsis__dot"
        style={{ backgroundColor: dotColor }}
      />
      <div
        className="loader__lds-ellipsis__dot"
        style={{ backgroundColor: dotColor }}
      />
    </div>
  </div>
);

EllipsisLoader.propTypes = {
  dotColor: PropTypes.string,
};
EllipsisLoader.defaultProps = {
  dotColor: '#af1e2d',
};

export default EllipsisLoader;
