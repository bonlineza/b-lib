import React from 'react';
import Overlay from 'components/Overlay';
import './scss/SimplePopup.scss';

type OptionShape = {
  cb: Function,
  buttonText: string,
  buttonClass: string,
  dataQeId?: string,
};

type PropsShape = {
  isOpen: boolean,
  showLoader: boolean,
  title: string,
  description?: string,
  renderContent?: Function,
  options: Array<OptionShape>,
  close: Function,
  size?: string,
  onOpen?: Function,
  onClose?: Function,
};

class SimplePopup extends React.Component<PropsShape> {
  static defaultProps = {
    baseClass: 'simple-popup',
    size: '--small',
    showLoader: false,
    description: null,
    renderContent: null,
    onOpen: null,
    onClose: null,
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
    if (this.props.isOpen) {
      if (this.props.description) {
        return (
          <p className="u-text__base u-text--center">
            {this.props.description}
          </p>
        );
      } else if (this.props.renderContent) {
        return this.props.renderContent();
      }
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
      this.reactOverlay.contains(event.target) &&
      !this.reactPopup.contains(event.target)
    ) {
      this.props.close();
    }
    return null;
  };

  listener: any;

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
            <div className={`${baseClass}__container__footer`}>
              {options.map((option: OptionShape, k: number) => (
                <div
                  key={k}
                  className={`${baseClass}__container__footer__item`}>
                  <button
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
