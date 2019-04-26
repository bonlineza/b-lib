/** @format */

// @flow
import React, { Fragment } from 'react';

import CollapsedGroup from './collapsedGroup';

type PropsType = {
  alt?: boolean,
  children?: any,
  openOnFirstChild?: boolean,
};

type DefaultPropsType = {
  children: any,
  openOnFirstChild: boolean,
  alt: false,
};

type StateShape = {
  expand: boolean,
};

class ButtonGroup extends React.Component<PropsType, StateShape> {
  static defaultProps = {
    children: [],
    openOnFirstChild: false,
    alt: false,
  };

  defaultProps: DefaultPropsType;

  constructor(props: PropsType) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  // Return non undefined/null props.children
  getChildrenAsArray = (start = 0, end = 0) =>
    React.Children.toArray(this.props.children)
      .filter(child => child !== undefined || child !== null)
      .slice(start, end || this.getChildrenCount());

  getChildrenCount = () =>
    React.Children.toArray(this.props.children).filter(
      child => child !== undefined || child !== null,
    ).length;

  killListener = (): any =>
    document.removeEventListener('click', this.listenerAction);

  startListener = (): any =>
    document.addEventListener('click', this.listenerAction);

  reactDropdown: HTMLElement;

  close = (): any =>
    this.setState(
      (prevState: StateShape): StateShape => ({
        ...prevState,
        expand: false,
      }),
    );

  toggle = (): any =>
    this.setState(
      (prevState: StateShape): StateShape => {
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
      },
    );

  listenerAction = (event: Object) => {
    if (this.reactDropdown && !this.reactDropdown.contains(event.target)) {
      this.close();
    }

    if (!this.reactDropdown) {
      this.killListener();
    }
  };

  render(): React$Element<*> {
    const overrideObject = this.props.openOnFirstChild
      ? {
          onClick: this.toggle,
        }
      : {};
    return (
      <div
        className={`button-group${
          this.getChildrenCount() > 2 ? '--has-expand' : ''
        } ${this.props.alt ? 'button-group--alt' : ''}`}
        ref={(c: HTMLElement): boolean => {
          this.reactDropdown = c;
          return true;
        }}>
        <div className="button-group__primary">
          {this.getChildrenAsArray(0, 2).map((child, index) => (
            <div className="button-group__primary__item" key={index}>
              {React.cloneElement(child, {
                className:
                  child.props['data-meta'] &&
                  child.props['data-meta'].type === 'text'
                    ? 'button-group__primary__item__btn--text'
                    : 'button-group__primary__item__btn',
                ...overrideObject,
              })}
            </div>
          ))}
        </div>
        <CollapsedGroup expand={this.state.expand} toggle={this.toggle}>
          {this.getChildrenAsArray(2).map((child, index) => (
            <Fragment key={index}>
              {React.cloneElement(child, {
                className: 'button-group__secondary__item__btn',
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
