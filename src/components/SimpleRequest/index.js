/** @format */

// @flow

/*
 * Usage: (simple)
 *  import SimpleRequest, { SimpleRequestContext }
 *
 *
 *  <SimpleRequest getEndpoint="/my-super-awesome-api/1">
 *    {
 *      (data) => <MySuperComponent data={data}
 *    }
 *  </SimpleRequest>
 *
 *  # Dont like props?
 *  # Just use <SimpleRequestContext.Subscribe> and access it as 'data'
 */

import React from 'react';

import axios from '../../helpers/axios';
import l from '../../helpers/locale';

import GetSvg from '../GetSvg';

import Context from './context';

type PropsShape = {
  getEndpoint: string,
  children: Function, // receives error and data
  noError?: boolean, // when a component wants to do it's own error stuff
  onResolve?: Function, // receives response.data
  onReject?: Function, // receives error
};

type StateShape = {
  loading: false,
  failed: false,
  message: '',
  data: {},
  error: boolean | Object,
  render: false,
};

class SimpleRequest extends React.Component<PropsShape, StateShape> {
  static defaultProps = {
    onError: false,
    noError: false,
    onReject() {
      return true;
    },
    onResolve() {
      return true;
    },
  };

  constructor(props) {
    super(props);
    this.baseState = {
      loading: false,
      failed: false,
      message: '',
      data: {},
      error: false,
      render: false,
    };

    this.state = this.baseState;
  }

  componentDidMount() {
    this.initRequest();
  }

  getLoaderContent = () => {
    switch (true) {
      case this.state.loading:
        return (
          <div className="until-ready">
            <div className="until-ready__container">
              <GetSvg svg="loading" wrapperClass="until-ready__loading" />
            </div>
          </div>
        );
      case this.state.failed && !this.props.noError:
        return (
          <div className="align--center">
            {l('RESULT-ERROR-retrieving_data')}
          </div>
        );
      default:
        return (
          <div className="align--center">
            You found a monkey. Please contact the zoo.
          </div>
        );
    }
  };

  setFailedState = error =>
    this.setState(() => ({
      ...this.baseState,
      failed: true,
      render: this.props.noError,
      error,
    }));

  setLoadingState = () =>
    this.setState(() => ({
      ...this.baseState,
      loading: true,
    }));

  setSuccessState = data =>
    this.setState(() => ({
      ...this.baseState,
      render: true,
      data,
    }));

  baseState: StateShape;

  initRequest = () =>
    new Promise((resolve, reject) => {
      axios
        .get(this.props.getEndpoint)
        .then(result => {
          this.setSuccessState(result.data);
          resolve(this.props.onResolve(result.data));
        })
        .catch(error => {
          this.setFailedState(error);
          reject(this.props.onReject(error));
        });
    });

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.state.render
          ? this.props.children(this.state.error, this.state.data)
          : this.getLoaderContent()}
      </Context.Provider>
    );
  }
}

export const SimpleRequestContext = Context;

export default SimpleRequest;
