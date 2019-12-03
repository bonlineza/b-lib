import React, { Fragment } from 'react';
import PDF from 'react-pdf-js';

type PropsShape = {
  /** Array of objects that will be used to create custom `ControlComponents`
   * that are displayed alongside`prevPageButton` and `nextPageButton`
   *  each object of the array must have one prop called `useComponent`
   *  `useComponent` will be used to create `ControlComponent` via `React.cloneElement`
   *  `ControlComponent` has access to all props within the item of that array
   * */
  customControls: Array<*>,
  /** object that contains, prop `extUrl` that has the relative path to the
   * pdf to be previewed */
  data: Object,
  /** Function that returns description of previewed pdf under `div.pdf-preview__footer` */
  description?: Function | void,
  /** Custom button component passed down which is `React.cloneElement`ed with the
   * the following props:
   * - `disabled: page === 1` (button is `disabled` if `page` is 1),
   * - `onClick: this.handlePrevious` (on click of that button runs handlePrevious
   *     which decrements `page`)
   * */
  prevPageButton: Object,
  /** Custom button component passed down which is `React.cloneElement`ed with the
   * the following props:
   * - `disabled: page === pages` (button is `disabled` if you are on the last
   * page of pdf),
   * - `onClick: this.handleNext` (on click of that button runs handlePrevious
   *     which increments `page`)
   * */
  nextPageButton: Object,
};

/**
 * PDFPreview implments 'react-pdf-js' and provides a scaffold for showing Newxt/Prev button
 * customControls: can be used to trigger any other required actions
 */
class PDFPreview extends React.Component<PropsShape> {
  static defaultProps = {
    description: () => null,
  };

  constructor(props) {
    super(props);
    this.pdfBody = React.createRef();
    this.state = {
      page: 1,
      pages: 1,
    };
  }

  state = {};

  onDocumentComplete = pages => {
    this.setState({ page: 1, pages });
  };

  handlePrevious = () => {
    this.setState(prevstate => ({ page: prevstate.page - 1 }));
  };

  handleNext = () => {
    this.setState(prevstate => ({ page: prevstate.page + 1 }));
  };

  renderControls = (page, pages) => {
    const groupClassName = 'pdf-preview__footer__group';
    const itemClassName = 'image-preview__inner__controls__item';
    const { prevPageButton, nextPageButton } = this.props;
    return (
      <Fragment>
        <div className={groupClassName}>
          {this.props.customControls.map((control, key) => {
            const ControlComponent = control.useComponent;
            return (
              <ControlComponent
                key={key}
                item={control}
                wrappingClassName={itemClassName}
                data={this.props.data}
                showPreviewButton={false}
              />
            );
          })}
        </div>
        <div className={`${groupClassName}--right`}>
          <div className={itemClassName}>
            {React.cloneElement(prevPageButton, {
              disabled: page === 1,
              onClick: this.handlePrevious,
            })}
          </div>
          <div className={itemClassName}>
            {React.cloneElement(nextPageButton, {
              disabled: page === pages,
              onClick: this.handleNext,
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    let controls = null;
    if (this.state.pages) {
      controls = this.renderControls(this.state.page, this.state.pages);
    }
    return (
      <div className="pdf-preview">
        <div className="pdf-preview__body" ref={this.pdfBody}>
          <PDF
            file={this.props.data.extUrl}
            onDocumentComplete={this.onDocumentComplete}
            page={this.state.page}
            scale={1}
            containerRef={this.pdfBody}
          />
        </div>
        <div className="pdf-preview__footer">{controls}</div>
        {typeof this.props.description === 'function'
          ? this.props.description()
          : null}
      </div>
    );
  }
}

export default PDFPreview;
