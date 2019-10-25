import React from 'react';
import Dropzone from 'react-dropzone';
import './scss/DocumentUploader.scss';

export type DocumentUploaderProps = {
  list?: Array<Object>,
  errorMessage?: string,
  isLoading?: boolean,
  dataQeId?: string,
  showUploader?: boolean,
  addFileRenderer?: Function,
  loadingRenderer?: Function,
  previewRenderer: Function,
  baseClass?: string,
  uploadHandler: Function,
};

class DocumentUploader extends React.Component<DocumentUploaderProps> {
  static defaultProps = {
    showUploader: true,
    list: [],
    errorMessage: '',
    isLoading: false,
    dataQeId: 'action-drop-document',
    addFileRenderer: () => 'Drop File Here',
    loadingRenderer: () => 'Loading...',
    baseClass: 'document-uploader',
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  fileOnDrop = (files: Object[]): any => {
    this.setState(
      prevState => ({
        ...prevState,
        files,
      }),
      () => this.startNextUploadIfExists(),
    );
  };

  startNextUploadIfExists = () => {
    if (this.state.files.length) {
      const newFiles = [...this.state.files];
      const currentFile = newFiles.shift();
      this.props.uploadHandler(currentFile, () => {
        this.fileOnDrop(newFiles);
      });
    }
  };

  render(): React$Element<*> {
    const {
      baseClass,
      showUploader,
      isLoading,
      errorMessage,
      dataQeId,
      list,
      previewRenderer,
    } = this.props;
    return (
      <div className={baseClass}>
        {list.map((v: Object, k: number) => previewRenderer(v, k))}
        {showUploader ? (
          <div className={`${baseClass}__item`}>
            <div className="image-preview-container">
              {isLoading ? (
                <div className="image-preview">
                  <div className="images-upload-loader">
                    {this.props.loadingRenderer()}
                  </div>
                </div>
              ) : (
                <div className="image-preview" data-qe-id={dataQeId}>
                  <Dropzone
                    onDrop={this.fileOnDrop}
                    className="images-upload-hover">
                    {this.props.addFileRenderer()}
                  </Dropzone>
                </div>
              )}
              <div className="image-preview__footer">{errorMessage}</div>
            </div>
          </div>
        ) : null}

        <div className={`${baseClass}__item`} />
        <div className={`${baseClass}__item`} />
        <div className={`${baseClass}__item`} />
        <div className={`${baseClass}__item`} />
      </div>
    );
  }
}

export default DocumentUploader;
