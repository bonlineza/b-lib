import React from 'react';
import Overlay from '../Overlay/index';
import './scss/SimplePopup.scss';

type OptionShape = {
  cb: Function,
  buttonText: string,
  buttonClass: string,
  dataQeId?: string,
};

type PropsShape = {
  /** if true, component will be visible */
  isOpen?: boolean,
  /** css class given to root div of this component. All child css classes will
   * have `baseClass` prepended to it */
  baseClass?: string,
  /** if true, loader shows */
  showLoader?: boolean,
  /** String title for modal */
  title?: string,
  /** String that displays in `div.${baseClass}__body` of modal */
  description?: string,
  /** Function that renders jsx in place of `description` */
  renderContent?: Function,
  /** Array of object that used to render the footer buttons of modal. Each object
   * has the following `PropShape`:
   * - `cb`: Function (callback function triggered on click),
   * - `buttonText`: string (text for button),
   * - `buttonClass`: string (css class assign to button element),
   * - `dataQeId`: string (unique identifier for button),
   * */
  options?: Array<OptionShape>,
  /** Function triggered to hide visibility of modal */
  close?: Function,
  /** Size set for `<Overlay>`'s `size` prop */
  size?: string,
  /** Callback function triggered when modal transitions to visible */
  onOpen?: Function,
  /** Callback function triggered when modal transitions not visible */
  onClose?: Function,
  /** if true, modal cannot close when clicking outside the bound field of
   * `div.${baseClass}` */
  cannotOutsideClickClose?: boolean,
};

/**
 * SimplePopup abstracts the complexities of writing a (suprisingly complex) Popup component
 * this is highly recommended for all you Popup uses
 */
class SimplePopup extends React.Component<PropsShape> {
  listener: any;

  static defaultProps = {
    isOpen: false,
    baseClass: 'simple-popup',
    showLoader: false,
    title: '',
    description: '',
    renderContent: () => false,
    options: [],
    close: () => false,
    size: '--small',
    onOpen: () => false,
    onClose: () => false,
    cannotOutsideClickClose: false,
  };

  componentWillReceiveProps(nextProps: PropsShape) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.startListener();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.killListener();
    }
  }

  getLoader = () => {
    if (this.props.renderLoader) {
      return this.props.renderLoader();
    }
    return <p className="u-text__base">LOADING</p>;
  };

  getContent = () => {
    if (this.props.description) {
      return (
        <p className="u-text__base u-text--center">{this.props.description}</p>
      );
    }
    if (this.props.renderContent) {
      return this.props.renderContent();
    }
    return null;
  };

  startListener = () => {
    if (this.props.onOpen) {
      this.props.onOpen();
    }

    document.addEventListener('click', this.listenerAction);
  };

  killListener = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
    document.removeEventListener('click', this.listenerAction);
  };

  listenerAction = (event: Object) => {
    if (!this.reactOverlay || !this.reactPopup) return null;
    if (
      !this.reactPopup.contains(event.target) &&
      !this.props.cannotOutsideClickClose
    ) {
      this.props.close();
    }
    return null;
  };

  render() {
    const { baseClass, isOpen, size, title, showLoader, options } = this.props;
    return (
      <div
        ref={c => {
          this.reactOverlay = c;
        }}>
        <Overlay isOpen={isOpen} size={size}>
          <div
            className={`${baseClass}`}
            ref={c => {
              this.reactPopup = c;
            }}>
            <div className={`${baseClass}__header`}>{title}</div>
            <div className={`${baseClass}__body`}>
              {showLoader ? this.getLoader() : this.getContent()}
            </div>
            <div className={`${baseClass}__footer`}>
              {options.map((option: OptionShape, k: number) => (
                <div key={k} className={`${baseClass}__footer__item`}>
                  <button
                    type="button"
                    className={option.buttonClass}
                    onClick={option.cb}
                    data-qe-id={option.dataQeId}
                    disabled={option.disabled}>
                    {option.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Overlay>
      </div>
    );
  }
}

export default SimplePopup;
