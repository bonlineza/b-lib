import React, { Fragment } from 'react';

type PropsShape = {
  /** String which is set to the initial state of `state.content`.
   * `state.content` is bound to component `<Editor />`'s prop `content` */
  content?: string,
  /** Acts a placeholder for `<Editor />``. value gets passed into
   * placeholder prop of `Editor` */
  placeholder?: string,
  /** Callback function that triggers when `editorOnChange` is run.
   * The first parameter of this function has `content` of editor */
  onChange: Function,
  /** Callback function that triggers when Editor is focused */
  onEditorFocus?: Function,
  /** String css class for `input element` of `Editor` component */
  inputClass?: string,
  /** Boolean, if true the,markdown can be created or deleted in`Editor`  */
  isEditing?: boolean,
  /** String css class that is applied to `<p>` with `dangerouslySetInnerHTML` */
  paragraphClass?: string,
  /** identifier for editor input */
  editorId?: string,
  /** Input component that should accept the following props and perform logic
   * accordingly:
   *```
   *  content,
   * onChange,
   * onEditorFocus,
   * editorId,
   * inputClass,
   * ```
   * */
  editorClass: Function | Object,
  /** Function to sanitise `dangerouslySetInnerHTML` */
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
