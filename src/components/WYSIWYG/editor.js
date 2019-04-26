/** @format */

import React from 'react';
import l from 'helpers/locale';

class Editor extends React.Component {
  componentDidMount() {
    const { $R } = window;

    // pass the update handler into context without
    // messing around with redactor's internals
    // eslint-disable-next-line no-undef
    (updateHandler =>
      $R.add('plugin', 'myplugin', {
        init(app) {
          this.app = app;
          this.customUpdate = updateHandler;
        },
        onkeyup() {
          // eslint-disable-next-line no-undef
          this.customUpdate($R('#js-redactor-editor', 'source.getCode'));
        },
      }))(this.addChangeHandler);

    // init redactor
    // eslint-disable-next-line no-undef
    $R.lang.selected = {
      format: l('EDITOR-BUTTON_format'),
      paragraph: l('EDITOR-BUTTON_paragraph'),
      heading1: l('EDITOR-BUTTON_h1'),
      heading2: l('EDITOR-BUTTON_h2'),
      heading3: l('EDITOR-BUTTON_h3'),

      bold: l('EDITOR-BUTTON_bold'),
      italic: l('EDITOR-BUTTON_italic'),
      lists: l('EDITOR-BUTTON_lists'),

      unorderedlist: l('EDITOR-BUTTON_ul'),
      orderedlist: l('EDITOR-BUTTON_ol'),
      outdent: l('EDITOR-BUTTON_outdent'),
      indent: l('EDITOR-BUTTON_indent'),
    };

    // eslint-disable-next-line no-undef
    $R('#js-redactor-editor', {
      buttons: ['format', 'bold', 'italic', 'lists'],
      plugins: ['myplugin'],
      lang: 'selected',
      minHeight: '100px',
      formatting: ['p', 'h1', 'h2', 'h3'],
      pastePlainText: false,
      pasteKeepStyle: [],
      pasteKeepClass: [],
      pasteInlineTags: ['br', 'strong', 'em'],
      pasteBlockTags: ['p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li'],
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.content !== nextProps.content) {
      return true;
    }
    return false;
  }

  listener = null;

  addChangeHandler = content => {
    if (this.props.onChange !== false) {
      clearTimeout(this.listener);
      this.listener = setTimeout(() => {
        this.props.onChange(content);
      }, 1000);
    }
  };

  render() {
    return (
      <div
        className={this.props.inputClass}
        data-qe-id="input-edit-wysiwyg_editor">
        <div
          id="js-redactor-editor"
          className="textarea"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: this.props.content,
          }}
        />
      </div>
    );
  }
}

export default Editor;
