/** @format */

// @flow
import React from 'react';
import GetSvg from 'components/GetSvg';
import axios from 'helpers/axios';
import type RequestShape from 'constants/request';
import defaultRequest from 'constants/request';

import { interpretErrorMessage } from '../../helpers/formatErrors';

type MetaObject = {
  config?: Object,
  payload?: Object | string,
};

type PropShape = {
  url: string,
  onData?: Function | boolean,
  customErrorMessage?: string,
  meta?: MetaObject,
  requestType?: 'get' | 'post',
};

class PageReady extends React.Component<PropShape> {
  static defaultProps = {
    onData: false,
    customErrorMessage: '',
    meta: null,
    requestType: 'get',
  };
  constructor(props) {
    super(props);
    this.state = {
      ...defaultRequest,
    };
  }

  state: RequestShape;

  componentDidMount() {
    this.get();
  }

  getConfig = () =>
    this.props.meta && this.props.meta.config ? this.props.meta.config : null;

  getPayload = () =>
    this.props.meta && this.props.meta.payload ? this.props.meta.payload : null;

  get = (): any => {
    this.setState({
      ...defaultRequest,
      fetching: true,
    });
    axios[this.props.requestType](
      this.props.url,
      this.getPayload(),
      this.getConfig(),
    )
      .then(
        (res: Object): any => {
          if (this.props.onData) {
            this.props.onData(res);
          }
          this.setState({
            success: true,
            fetching: false,
          });
        },
      )
      .catch(
        (err: Object): any => {
          this.setState({
            failed: true,
            fetching: false,
            message: interpretErrorMessage(err),
          });
        },
      );
  };

  render() {
    return (
      <div className="until-ready">
        {this.state.success && !this.state.failed
          ? this.props.children
          : (this.state.fetching && (
              <div className="until-ready__container">
                <GetSvg svg="loading" wrapperClass="until-ready__loading" />
              </div>
            )) || (
              <div className="align--center">
                {this.props.customErrorMessage || this.state.message}
              </div>
            )}
      </div>
    );
  }
}

export default PageReady;
