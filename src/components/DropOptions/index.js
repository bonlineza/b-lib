/** @format */

// @flow
import React from 'react';

/*
 * ::Expected Children Elements::
 * button | anchor | span
 */

type PropsShape = {
  baseElement: Function, // JSX must return a span
  children: any, // used to generate options
};

type StateShape = {
  isOpen: boolean,
};

class DropOptions extends React.Component<PropsShape> {
  constructor(props: PropsShape) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  state: StateShape;

  componentWillUnmount() {
    this.killListener();
  }

  getChildren = (): React$Element<*> =>
    React.Children.map(
      this.props.children,
      (child: any): React$Element<*> => (
        <div className="drop-options__options__item">{child}</div>
      ),
    );

  killListener = (): any =>
    document.removeEventListener('click', this.listenerAction);

  startListener = (): any =>
    document.addEventListener('click', this.listenerAction);

  listenerAction = () => {
    this.close();
    this.killListener();
  };

  close = (): any =>
    this.setState(
      (prevState: StateShape): StateShape => ({
        ...prevState,
        isOpen: false,
      }),
    );

  toggleOpenState = (): any =>
    this.setState(
      (prevState: StateShape): StateShape => {
        if (prevState.isOpen) {
          // next state is false
          this.killListener();
        } else {
          // next state is true
          this.startListener();
        }

        return {
          ...prevState,
          isOpen: !prevState.isOpen,
        };
      },
    );

  render(): React$Element<*> {
    return (
      <div className="drop-options-container">
        <div className="drop-options">
          <div className="drop-options__base">
            <button
              type="button"
              className="drop-options__base__btn"
              onClick={this.toggleOpenState}>
              {this.props.baseElement()}
            </button>
          </div>
          <div
            className={`drop-options__options ${
              this.state.isOpen ? 'drop-options__options--is-open' : ''
            }`}>
            {this.getChildren()}
          </div>
        </div>
      </div>
    );
  }
}

export default DropOptions;
