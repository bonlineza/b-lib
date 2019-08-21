import React from 'react';
import { canUseRedactor } from '../../helpers/featureDetection';
import RedactorInit from '../../vendor/redactor/redactor';
import '../../vendor/redactor/_scss/redactor.scss';

export function getEditorContent(editorId) {
  if (canUseRedactor()) {
    // use Redactor
    return window.$R(`#${editorId}`, 'source.getCode');
  }

  // get content from targets children
  const node = document.querySelector(`#${editorId}`);
  if (!node) return '';
  const children = Array.from(node.children);
  let stringifiedHTML = '';
  if (!children.length) {
    // we have no children so use text content
    stringifiedHTML = node.textContent;
  } else {
    stringifiedHTML = children.reduce(
      (accumulated, current) => `${accumulated}${current.outerHTML}`,
      ``,
    );
  }
  return stringifiedHTML;
}

const defaultRedactorConfig = {
  settings: {},
  lang: {},
};

type PropsShape = {
  placeholder?: string,
  content?: string,
  onChange?: Function,
  onEditorFocus?: Function,
  editorId?: string,
  inputClass?: string,
  redactorConfig?: {
    settings: Object,
    lang: Object,
  },
  testId?: string,
  legacyBehaviour?: boolean,
};

class RedactorWrapper extends React.Component<PropsShape> {
  static defaultProps = {
    placeholder: '',
    content: '',
    onChange: () => null,
    onEditorFocus: () => null,
    editorId: 'redactor-wrapper',
    inputClass: 'redactor-wrapper__input',
    redactorConfig: { settings: {}, lang: {} },
    testId: 'input-edit-wysiwyg_editor',
    legacyBehaviour: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      legacyBehaviour: this.props.legacyBehaviour || !canUseRedactor(),
      hasContent: this.props.content.length > 0,
    };
  }

  componentDidMount() {
    if (!this.state.legacyBehaviour) {
      this.settings = {
        ...defaultRedactorConfig.settings,
        ...this.props.redactorConfig.settings,
      };
      this.lang = {
        ...defaultRedactorConfig.lang,
        ...this.props.redactorConfig.lang,
      };
      RedactorInit();

      (({ onChange, onFocus }) =>
        $R.add('plugin', 'myplugin', {
          init(app) {
            this.app = app;
          },
          onchanged(html) {
            onChange(html);
          },
          onblur: () => {
            onFocus(false);
          },
          onfocus: () => {
            onFocus(true);
          },
        }))({ onChange: this.onChangeHandler, onFocus: this.onFocusHandler });

      $R.lang.selected = this.lang;
      $R(`#${this.props.editorId}`, this.settings);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.content !== nextProps.content ||
      this.props.placeholder !== nextProps.placeholder
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.placeholder !== this.props.placeholder &&
      !this.state.hasContent &&
      !this.state.legacyBehaviour
    ) {
      $R(`#${this.props.editorId}`, 'destroy');
      $R(`#${this.props.editorId}`, this.settings);
    }
  }

  componentWillUnmount() {
    if (!this.state.legacyBehaviour) {
      $R(`#${this.props.editorId}`, 'destroy');
      const potentiallyOrphanedChildren = document.getElementsByClassName(
        're-button-tooltip',
      );
      for (let i = 0; i < potentiallyOrphanedChildren.length; i + 1) {
        const element = potentiallyOrphanedChildren.item(i);
        element.parentElement.removeChild(element);
      }
    }
  }

  onChangeHandler = (content: string) => {
    this.setState({ hasContent: content && content.length > 0 });
    this.props.onChange(content);
  };

  onFocusHandler = (flag: boolean) => this.props.onEditorFocus(flag);

  legacyChangeListener = event => {
    if (event.target.children && event.target.children.length) {
      const items = event.target.children;
      const stringifiedHTML = Array.from(items).reduce(
        (accumulated, current) => `${accumulated}${current.outerHTML}`,
        ``,
      );
      this.onChangeHandler(stringifiedHTML);
    } else {
      this.onChangeHandler(event.target.innerText);
    }
  };

  render() {
    return (
      <div data-qe-id={this.props.testId}>
        {!this.state.legacyBehaviour ? (
          <div
            id={this.props.editorId}
            className={this.props.inputClass}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: this.props.content,
            }}
          />
        ) : (
          <div
            contentEditable
            tabIndex="0"
            role="textbox"
            id={this.props.editorId}
            className={this.props.inputClass}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: this.props.content,
            }}
            onKeyUp={this.legacyChangeListener}
            onFocus={this.onFocusHandler}
          />
        )}
      </div>
    );
  }
}

export default RedactorWrapper;
