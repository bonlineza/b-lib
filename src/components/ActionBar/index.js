import React, { Component } from 'react';
import './scss/ActionBar.scss';

type ActionBarProps = {
  /**
   * Unique identifier under: data-qe-id
   */
  id?: string,
  /**
   * callback function triggers when a message arrives
   */
  focus?: Function,
  /**
   * Array of message strings
   */
  messages?: Array<string>,
  /**
   * Triggers on unMount - useable for emptying message queue
   */
  clearList?: Function,
  /**
   * formatter function that processes a message string
   */
  formatter?: null | (string => string),
  /**
   * base class name
   */
  baseClassName?: string,
  /**
   * the number of milliseconds to 'show' the latest message
   */
  visibleDuration?: number,
};

/**
 * Shows a text message from a given list for a set amount of time
 */
class ActionBar extends Component<null, ActionBarProps, null> {
  constructor(props: ActionBarProps) {
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
  id: 'view-showing-actionbar',
  focus: () => null,
  messages: [],
  clearList: () => null,
  formatter: null,
  baseClassName: 'action-bar',
  visibleDuration: 2000,
};

export default ActionBar;
