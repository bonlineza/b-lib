import React, { Fragment } from 'react';
import PDF from 'react-pdf-js';

type PropsShape = {
  customControls: Array<*>,
  data: Object,
  description?: Function | void,
  prevPageButton: Object,
  nextPageButton: Object,
};

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
