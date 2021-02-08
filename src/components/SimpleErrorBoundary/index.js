import React from 'react';

type PropType = {
  /** The error message that gets thrown */
  errorMessage?: string,
  /** a function that can trigger an error log in the system */
  errorLogger?: Function,
  /** show the error message flag */
  showMessageOnError?: boolean,
};

/**
 * SimpleErrorBoundary a simple wrapper for pobbible brittle components
 */
class SimpleErrorBoundary extends React.Component {
  constructor(props: PropType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    if (this.props.errorLogger) this.props.errorLogger(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.showMessageOnError ? (
        <h1>{this.props.errorMessage}</h1>
      ) : null;
    }

    return this.props.children;
  }
}

SimpleErrorBoundary.defaultProps = {
  errorMessage: 'Something whent wrong',
  errorLogger: null,
  showMessageOnError: true,
};

export default SimpleErrorBoundary;
