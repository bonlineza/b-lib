import React from 'react';
import type RequestShape from './request';
import defaultRequest from './request';

type PropShape = {
  predefinedAction?: Object,
  getRequestInstance: () => Promise<*>,
  onData?: Function,
  customErrorMessage?: string,
  customErrorHandler?: Function,
  renderCustomLoader?: Function,
  errorMessageInterpreter?: Function,
};

export const Context = React.createContext({ data: null });

class PageReady extends React.Component<PropShape> {
  static defaultProps = {
    onData() {
      return true;
    },
    customErrorMessage: 'Failed to load',
    predefinedAction: null,
    customErrorHandler: () => null,
    renderCustomLoader: () => null,
    errorMessageInterpreter: () => 'Error receiving Data',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...defaultRequest,
      data: null,
    };
  }

  state: RequestShape;

  componentDidMount() {
    this.initRequest();
  }

  getPageReadyContent = () => {
    const request = this.props.predefinedAction
      ? this.props.predefinedAction.request
      : this.state;

    if (request.success) {
      return this.props.children;
    }
    if (request.fetching) {
      return this.props.renderCustomLoader() || <div>LOADING</div>;
    }
    if (request.failed) {
      return (
        <div className="page-ready__content">
          {this.props.customErrorMessage || request.message}
        </div>
      );
    }

    return null;
  };

  initRequest = (): any => {
    if (this.props.predefinedAction) {
      this.props.predefinedAction.dispatch();
    } else {
      this.setState({
        ...defaultRequest,
        // eslint-disable-next-line
        fetching: true,
      });

      this.props
        .getRequestInstance()
        .then(data => {
          if (this.props.onData) {
            this.props.onData(data);
          }
          this.setState({
            ...defaultRequest,
            // eslint-disable-next-line react/no-unused-state
            success: true,
            data,
          });
        })
        .catch(err => {
          if (this.props.customErrorHandler) {
            const { status, data } = err;
            this.props.customErrorHandler(status, data);
          }

          this.setState({
            ...defaultRequest,
            // eslint-disable-next-line react/no-unused-state
            failed: true,
            // eslint-disable-next-line react/no-unused-state
            message: this.props.errorMessageInterpreter(err),
          });
        });
    }
  };

  render() {
    return (
      <Context.Provider value={{ data: this.state.data }}>
        <div className="page-ready">{this.getPageReadyContent()}</div>
      </Context.Provider>
    );
  }
}

export default PageReady;
