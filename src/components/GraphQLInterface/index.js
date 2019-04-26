import React from 'react';
import { createPortal } from 'react-dom';

import graphi from 'helpers/graphi';
import GetSvg from 'components/GetSvg';
import schemaQuery from './schemaQuery.js';

class GraphQLInterface extends React.Component {
  constructor() {
    super();

    this.state = {
      response: null,
      open: false,
    };
  }

  getSchema = () => this.graphQuery(schemaQuery);

  timeout = null;

  debounce = (func, wait = 3000) => (...args) => {
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => func(...args), wait);
  };

  handler = e => {
    if (e.target.value) {
      return this.debounce(this.graphQuery)(e.target.value);
    }

    return null;
  };

  graphQuery = shape =>
    graphi(shape)
      .then(response => {
        if (response.data.errors && response.data.errors.length) {
          return this.setState({ response: response.data.errors });
        }

        return this.setState({ response: response.data.data });
      })
      .catch(e => this.setState({ response: e }));

  toggle = () => this.setState(prevState => ({ open: !prevState.open }));

  // thanks http://jsfiddle.net/KJQ9K/554/
  highlight = json => {
    const jsonColours = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const result = jsonColours.replace(
      // eslint-disable-next-line
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      match => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
    return { __html: result };
  };

  render() {
    if (
      process.env.NODE_ENV === 'production' ||
      window.localStorage.getItem('dev') !== 'true'
    )
      return null;

    return createPortal(
      <div className={`graphql-interface${this.state.open ? '--open' : ''}`}>
        <div className="graphql-interface__pull">
          <button
            onClick={this.toggle}
            type="button"
            className="btn-svg--primary">
            {this.state.open ? (
              <GetSvg svg="angle_right" />
            ) : (
              <GetSvg svg="angle_left" />
            )}
          </button>
        </div>
        <div className="graphql-interface__body">
          <div className="graphql-interface__body__input">
            <textarea onChange={this.handler} />
            <div className="graphql-interface__body__input__footer">
              <button
                onClick={this.getSchema}
                className="btn--primary"
                type="button">
                Fetch Schema
              </button>
            </div>
          </div>
          <div className="graphql-interface__body__output">
            <pre
              // eslint-disable-next-line
              dangerouslySetInnerHTML={this.highlight(
                JSON.stringify(this.state.response, null, 2),
              )}
            />
          </div>
        </div>
      </div>,
      document.querySelector('#react-dev-graphqi'),
    );
  }
}

export default GraphQLInterface;
