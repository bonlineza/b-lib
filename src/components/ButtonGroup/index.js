import React, { Fragment } from 'react';
import CollapsedGroup from './collapsedGroup';

import './scss/ButtonGroup.scss';

type PropsType = {
  /** If true append modifier string `--alt` to `baseClass` */
  alt?: boolean,
  /** Array of that renders buttons */
  children?: any,
  /** Open on click of buttons outside menu */
  openOnFirstChild?: boolean,
  /** Number of buttons displayed outside the menu */
  numButtons?: number,
  /** if true added `disabled prop` to all rendered buttons */
  disableButtons?: boolean,
  /** Renders content in menu button */
  toggleButtonContents?: React$Element,
  /** css class for parent div of this component */
  baseClass?: string,
};

type DefaultPropsType = {
  children: any,
  openOnFirstChild: boolean,
  alt: false,
  numButtons: number,
  disableButtons: boolean,
  baseClass?: string,
};

type StateShape = {
  expand: boolean,
};

/**
 * ButtonGroup is a wrapper that transforms given buttons into a small set of buttons with a dropdown menu based on the configuration given
 */
class ButtonGroup extends React.Component<PropsType, StateShape> {
  static defaultProps = {
    baseClass: 'button-group',
    children: [],
    openOnFirstChild: false,
    alt: false,
    numButtons: 2,
    disableButtons: false,
    toggleButtonContents: <span>Menu</span>,
  };

  isFirstFlag = false;

  defaultProps: DefaultPropsType;

  reactDropdown: HTMLElement;

  constructor(props: PropsType) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  // Return non undefined/null props.children
  getChildrenAsArray = (start = 0, end = 0) =>
    React.Children.toArray(this.props.children)
      .filter(child => child)
      .slice(start, end || this.getChildrenCount());

  getChildrenCount = () =>
    React.Children.toArray(this.props.children).filter(child => child).length;

  getButtonClasses = (child, index) => {
    const { baseClass } = this.props;
    let classes = `${baseClass}__primary__item`;

    // return modifier if this is the first non-text child
    if (this.isFirstPrimaryButton(child)) {
      classes = `${classes} ${baseClass}__item--is-first`;

      // if this is also the last primary button it is the only primary button
      if (this.isLastPrimaryButton(index)) {
        classes = `${classes} ${baseClass}__item--is-only`;
      }
    }

    return classes;
  };

  killListener = (): any =>
    document.removeEventListener('click', this.listenerAction);

  startListener = (): any =>
    document.addEventListener('click', this.listenerAction);

  close = (): any =>
    this.setState((prevState: StateShape): StateShape => ({
      ...prevState,
      expand: false,
    }));

  toggle = (): any =>
    this.setState((prevState: StateShape): StateShape => {
      const nextExpand = !prevState.expand;

      if (nextExpand) {
        this.startListener();
      } else {
        this.killListener();
      }

      return {
        ...prevState,
        expand: nextExpand,
      };
    });

  listenerAction = (event: Object) => {
    if (this.reactDropdown && !this.reactDropdown.contains(event.target)) {
      this.close();
    }

    if (!this.reactDropdown) {
      this.killListener();
    }
  };

  isFirstPrimaryButton = child => {
    if (child.props['data-meta']?.type !== 'text' && !this.isFirstFlag) {
      this.isFirstFlag = true;
      return true;
    }

    return false;
  };

  isLastPrimaryButton = index => {
    const kids = this.getChildrenAsArray(0, this.props.numButtons);
    return kids.length === index + 1;
  };

  render(): React$Element<*> {
    const {
      baseClass,
      numButtons,
      disableButtons,
      alt,
      toggleButtonContents,
    } = this.props;
    const overrideObject = this.props.openOnFirstChild
      ? {
          onClick: this.toggle,
        }
      : {};
    this.isFirstFlag = false;
    return (
      <div
        className={`${baseClass}${
          this.getChildrenCount() > numButtons ? '--has-expand' : ''
        } ${alt ? `${baseClass}--alt` : ''}`}
        ref={ref => {
          this.reactDropdown = ref;
        }}>
        <div className={`${baseClass}__primary`}>
          {this.getChildrenAsArray(0, numButtons).map((child, index) => (
            <div className={this.getButtonClasses(child, index)} key={index}>
              {React.cloneElement(child, {
                disabled: disableButtons,
                className:
                  child.props['data-meta'] &&
                  child.props['data-meta'].type === 'text'
                    ? `${baseClass}__primary__item__btn--text`
                    : `${baseClass}__primary__item__btn`,
                ...overrideObject,
              })}
            </div>
          ))}
        </div>
        <CollapsedGroup
          toggleButtonContents={toggleButtonContents}
          baseClass={baseClass}
          expand={this.state.expand}
          toggle={this.toggle}>
          {this.getChildrenAsArray(numButtons).map((child, index) => (
            <Fragment key={index}>
              {React.cloneElement(child, {
                disabled: disableButtons,
                className: `${baseClass}__secondary__item__btn`,
                onClick: e => {
                  this.toggle();
                  child.props.onClick(e);
                },
              })}
            </Fragment>
          ))}
        </CollapsedGroup>
      </div>
    );
  }
}

export default ButtonGroup;
