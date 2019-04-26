/** @format */

// @flow
import React from 'react';

import l from '../../helpers/locale';
import Overlay from '../../components/Overlay';

type OptionShape = {
  cb: Function,
  buttonText: string,
  buttonClass: string,
  dataQeId?: string,
};

type PropsShape = {
  isOpen: boolean,
  title: string,
  description: string,
  options: Array<OptionShape>,
  close: Function,
  size?: string,
};

class SimplePopup extends React.Component<PropsShape> {
  static defaultProps = {
    size: '--small',
  };

  componentWillReceiveProps(nextProps: PropsShape) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.startListener();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.killListener();
    }
  }

  listener: any;
  reactPopup: HTMLElement;

  startListener = () => {
    document.addEventListener('click', this.listenerAction);
  };

  killListener = () => {
    document.removeEventListener('click', this.listenerAction);
  };

  listenerAction = (event: Object) => {
    if (this.reactPopup && !this.reactPopup.contains(event.target)) {
      this.props.close();
    }
  };

  render = (): React$Element<*> => (
    <Overlay isOpen={this.props.isOpen} size={this.props.size}>
      <div
        className="layout-container"
        ref={(c: HTMLElement): boolean => {
          this.reactPopup = c;
          return true;
        }}>
        <div className="layout-container__header">
          <div className="gw">
            <div className="g g-1/1">
              <h2 className="u-text__primary-heading">{l(this.props.title)}</h2>
            </div>
          </div>
          <p className="u-text__base">{l(this.props.description)}</p>
        </div>
        <div className="layout-container__footer">
          {this.props.options.map(
            (option: OptionShape, k: number): React$Element<*> => (
              <div key={k} className="layout-container__footer__item">
                <button
                  type="button"
                  className={option.buttonClass}
                  onClick={option.cb}
                  data-qe-id={option.dataQeId}>
                  {l(option.buttonText)}
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </Overlay>
  );
}

export default SimplePopup;
