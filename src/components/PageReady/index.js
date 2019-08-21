import React from 'react';
import axios from 'axios';
import { interpretErrorMessage } from './formatErrors';
import type RequestShape from './request';

import defaultRequest from './request';

type PropShape = {
  predefinedAction?: Object,
  url?: string,
  postBody?: Object,
  method?: string,
  onData?: Function,
  customErrorMessage?: string,
  customErrorHandler?: Function,
  renderCustomLoader?: Function,
};

export const Context = React.createContext({ data: null });

class PageReady extends React.Component<PropShape> {
  static defaultProps = {
    onData() {
      return true;
    },
    customErrorMessage: 'Failed to load',
    url: '',
    postBody: {},
    method: 'get',
    predefinedAction: null,
    customErrorHandler: () => null,
    renderCustomLoader: () => null,
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
    } else if (request.fetching) {
      return this.props.renderCustomLoader() || <div>LOADING</div>;
    } else if (request.failed) {
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

      const requestParams = [
        this.props.url,
        this.props.method === 'post' ? { ...this.props.postBody } : {},
      ];

      axios[this.props.method.toLowerCase()](...requestParams)
        .then((res: Object): any => {
          const { data } = res;
          if (this.props.onData) {
            this.props.onData(res);
          }
          this.setState({
            ...defaultRequest,
            // eslint-disable-next-line react/no-unused-state
            success: true,
            data,
          });
        })
        .catch((err: Object): any => {
          if (this.props.customErrorHandler) {
            const { status, data } = err;
            this.props.customErrorHandler(status, data);
          }

          this.setState({
            ...defaultRequest,
            // eslint-disable-next-line react/no-unused-state
            failed: true,
            // eslint-disable-next-line react/no-unused-state
            message: interpretErrorMessage(err),
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
