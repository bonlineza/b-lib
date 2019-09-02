import React, { Fragment } from 'react';

type PropsShape = {
  content?: string,
  placeholder?: string,
  onChange: Function,
  onEditorFocus?: Function,
  inputClass?: string,
  isEditing?: boolean,
  paragraphClass?: string,
  editorId?: string,
  editorClass: Function | Object,
  htmlSanitiser?: Function,
};

class WYSIWYG extends React.Component<PropsShape> {
  static defaultProps = {
    content: '',
    placeholder: '',
    onEditorFocus: () => {},
    inputClass: '',
    isEditing: false,
    paragraphClass: 'text--dk--flushed--wysiwyg',
    editorId: 'editor',
    customSanitiseHtmlConfig: null,
    htmlSanitiser: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.content !== prevState.content) {
      return { content: nextProps.content };
    }

    return null;
  }

  onEditorChange = (content: string): any => {
    this.props.onChange(content);
  };

  render() {
    const Editor = this.props.editorClass;
    return (
      <Fragment>
        {this.props.isEditing ? (
          <Fragment>
            <Editor
              content={this.state.content}
              editorId={this.props.editorId}
              editorFocus={this.props.onEditorFocus}
              placeholder={this.props.placeholder}
              inputClass={this.props.inputClass}
              onChange={this.onEditorChange}
            />
          </Fragment>
        ) : (
          <p
            className={this.props.paragraphClass}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: this.props.htmlSanitiser
                ? this.props.htmlSanitiser(this.state.content)
                : this.state.content,
            }}
          />
        )}
      </Fragment>
    );
  }
}

export default WYSIWYG;
