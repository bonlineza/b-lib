import React from 'react';
import Dropzone from 'react-dropzone';
import './scss/DocumentUploader.scss';

export type DocumentUploaderProps = {
  /** an array of objects displayed in previewRenderer */
  list?: Array<Object>,
  /** string error message shown in `div.image-preview__footer` */
  errorMessage?: string,
  /** if true, the loadingRenderer prop will trigger */
  isLoading?: boolean,
  /** identifier used for `div.image-preview`'s in prop `data-qe-id` */
  dataQeId?: string,
  /** If true, shows `<Dropzone>` (uploader)component */
  showUploader?: boolean,
  /** Function returns prompt content to add files */
  addFileRenderer?: Function,
  /** Function returns component that acts as loader */
  loadingRenderer?: Function,
  /** Function returns a component that has access to data in `list` */
  previewRenderer: Function,
  /** css class in parent div of this component */
  baseClass?: string,
  /** callback function that runs when a file is uploaded */
  uploadHandler: Function,
};

/**
 * Displays a list of Documents and provides a Dropzone to upload aditional Documents
 */
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
