import React, { Component } from 'react';
import './scss/ActionBar.scss';

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
    };
  }

  componentDidMount = () => {
    if (this.props.messages.length) {
      this.show(this.props.visibleDuration);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.show(this.props.visibleDuration);
    }
  };

  componentWillUnmount = () => {
    this.props.clearList();
  };

  show = (wait: number) => {
    this.props.focus();
    window.setTimeout(() => {
      this.setState({ isShowing: false });
    }, wait);
    this.setState({ isShowing: true });
  };

  render = () => {
    const { messages, baseClassName, id, formatter } = this.props;
    const { isShowing } = this.state;
    const text = messages[messages.length - 1];
    return (
      <div
        className={`${baseClassName} ${
          isShowing ? `${baseClassName}--is-open` : ''
        }`}
        data-qe-id={id}>
        {isShowing ? (
          <p className={`${baseClassName}__text`}>
            {formatter ? formatter(text) : text}
          </p>
        ) : (
          <p />
        )}
      </div>
    );
  };
}

ActionBar.defaultProps = {
  messages: [],
  clearList: () => null,
  focus: () => null,
  baseClassName: 'action-bar',
  id: 'view-showing-actionbar',
  formatter: null,
  visibleDuration: 2000,
};

export default ActionBar;
