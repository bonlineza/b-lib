import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DocumentUploader from 'components/DocumentUploader';
import EllipsisLoader from 'components/EllipsisLoader';
import Readme from '../docs/DocumentUploader.md';

const defaultProps = {
  list: [],
  isLoading: false,
  showUploader: true,
  addFileRenderer: () => <div className="add-file">Click to Add File</div>,
  loadingRenderer: () => (
    <div className="loading">
      <EllipsisLoader />
    </div>
  ),
  previewRenderer: (data, key) => (
    <div className="preview-component" key={key}>
      <img src={data.url} alt={data.name} />
      <p>Last Updated: {data.lastUpdated}</p>
    </div>
  ),
  baseClass: 'document-uploader',
  uploadHandler: action('Called Upload Handler'),
};

const DefaultUploader = props => {
  const testProps = { ...defaultProps, ...props };
  return <DocumentUploader {...testProps} />;
};

storiesOf('DocumentUploader', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => DefaultUploader())
  .add('1 image', () =>
    DefaultUploader({
      list: [
        {
          name: 'Document 1',
          url: '/face.png',
          lastUpdated: 12345678,
        },
      ],
    }),
  )
  .add('isLoading', () => DefaultUploader({ isLoading: true }));
