import React from 'react';
import './scss/HorizontalProgressBar.scss';

type PropsShape = {
  /**
   * Whole number out of 100 which sets how full you want the bar to be
   */
  progressPercentage?: number,
  /**
   * Number that sets the milliseconds taken to start the transition
   */
  transitionTimeout?: number,
};

/**
 * HorizontalProgressBar is a visual component to indicate any type of progress
 */
const HorizontalProgressBar = ({
  progressPercentage,
  transitionTimeout,
}: PropsShape) => {
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

HorizontalProgressBar.defaultProps = {
  progressPercentage: 0,
  transitionTimeout: 0,
};

export default HorizontalProgressBar;
