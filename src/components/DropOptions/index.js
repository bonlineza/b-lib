import React from 'react';
import './scss/Styles.scss';
/*
 * ::Expected Children Elements::
 * button | anchor | span
 */

type PropsShape = {
  baseElement: Function, // JSX must return a span
  children?: any, // used to generate options
  wrapperClass?: string,
};

type StateShape = {
  isOpen: boolean,
};

class DropOptions extends React.Component<PropsShape> {
  static defaultProps = {
    children: [],
    wrapperClass: '',
    baseElement: () => 'Base Element',
  };

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

  getChildren = () =>
    React.Children.map(this.props.children, (child: any) => (
      <div className="drop-options__options__item">{child}</div>
    ));

  killListener = (): any =>
    document.removeEventListener('click', this.listenerAction);

  startListener = (): any =>
    document.addEventListener('click', this.listenerAction);

  listenerAction = () => {
    this.close();
    this.killListener();
  };

  close = (): any =>
    this.setState((prevState: StateShape): StateShape => ({
      ...prevState,
      isOpen: false,
    }));

  toggleOpenState = (): any =>
    this.setState((prevState: StateShape): StateShape => {
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
    });

  render() {
    return (
      <div className={`${this.props.wrapperClass} drop-options-container`}>
        <div className="drop-options">
          <div className="drop-options__base">
            <button
              className="drop-options__base__btn"
              onClick={this.toggleOpenState}>
              {this.props.baseElement()}
            </button>
          </div>
          <div
            className={`drop-options__options ${
              this.state.isOpen ? 'drop-options__options--is-open' : ''
            }`}>
            {this.state.isOpen && this.getChildren()}
          </div>
        </div>
      </div>
    );
  }
}

export default DropOptions;
