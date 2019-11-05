import React from 'react';
import PropTypes from 'prop-types';
import './scss/HorizontalProgressBar.scss';

const HorizontalProgressBar = ({ progressPercentage, transitionTimeout }) => {
  const [translatedBy, setTranslatedBy] = React.useState(-100);

  const getProgress = (percentage = 0) => {
    switch (true) {
      case percentage > 100:
        return 100;
      case percentage < 0:
        return 0;
      default:
        return percentage;
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      const progress = getProgress(progressPercentage);

      const nextTanslatedBy = progress - 100;

      setTranslatedBy(nextTanslatedBy);
    }, transitionTimeout);
  }, [progressPercentage, transitionTimeout]);

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
  progressPercentage: PropTypes.number,
  transitionTimeout: PropTypes.number,
};

HorizontalProgressBar.defaultProps = {
  progressPercentage: 0,
  transitionTimeout: 0,
};

export default HorizontalProgressBar;
