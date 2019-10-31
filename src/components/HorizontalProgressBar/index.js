import React from 'react';
import PropTypes from 'prop-types';
import './scss/HorizontalProgressBar.scss';

const HorizontalProgressBar = ({ totalProgress, currentProgress }) => {
  const [translatedBy, setTranslatedBy] = React.useState(-100);

  React.useEffect(() => {
    const nextTanslatedBy = (currentProgress / totalProgress) * 100 - 100;
    setTranslatedBy(nextTanslatedBy);
  }, [currentProgress, totalProgress]);

  const transformStyle = {
    transform: `translateX(${translatedBy}%)`,
  };

  return (
    <div className="horizontal-progress-bar">
      <div
        className="horizontal-progress-bar__progress"
        style={transformStyle}
      />
    </div>
  );
};

HorizontalProgressBar.propTypes = {
  totalProgress: PropTypes.number,
  currentProgress: PropTypes.number,
};

HorizontalProgressBar.defaultProps = {
  totalProgress: 0,
  currentProgress: 0,
};

export default HorizontalProgressBar;
