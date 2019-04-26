/** @format */

// @flow
import React, { Fragment, Component } from 'react';
import sanitiseHtml from 'sanitize-html';

import sanitiseHtmlConfig from './sanitiseHtmlConfig.json';
import Editor from './editor.js';

type PropsShape = {
  content: string,
  onChange: Function | boolean,
  inputClass: string,
  isEditing: boolean,
  paragraphClass?: string,
};

class WYSIWYG extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.content !== prevState.content) {
      return { content: nextProps.content };
    }

    return null;
  }

  static defaultProps = {
    paragraphClass: 'text--dk--flushed--wysiwyg',
  };

  constructor(props: PropsShape) {
    super(props);
    this.state = {
      content: props.content,
    };
  }

  render(): React$Element<*> {
    return (
      <Fragment>
        {this.props.isEditing ? (
          <Fragment>
            <Editor
              content={this.state.content}
              onChange={this.props.onChange}
              inputClass={this.props.inputClass}
            />
          </Fragment>
        ) : (
          <p
            className={this.props.paragraphClass}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html:
                sanitiseHtml(this.state.content, sanitiseHtmlConfig) || '-',
            }}
          />
        )}
      </Fragment>
    );
  }
}

export default WYSIWYG;
