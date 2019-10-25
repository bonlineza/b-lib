import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import DocumentUploader from './index';

const defaultProps = {
  list: [
    {
      name: 'Document 1',
      url: '/some/path.jpg',
      lastUpdated: 12345678,
    },
  ],
  isLoading: false,
  showUploader: true,
  addFileRenderer: () => <div className="add-file">Click to Add File</div>,
  loadingRenderer: () => <div className="loading">'Busy Uploading'</div>,
  previewRenderer: (data, key) => (
    <div className="preview-component" key={key}>
      <img src={data.url} alt={data.name} />
      <p>Last Updated: {data.lastUpdated}</p>
    </div>
  ),
  baseClass: 'document-uploader',
  uploadHandler: () => null,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(<DocumentUploader {...testProps} />);
};

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('without errors', () => {
    expect(wrapper.length).toBe(1);
  });

  it('Add file rederer will be redered', () => {
    const component = wrapper.find(`.add-file`);
    expect(component.length).toBe(1);
  });

  it('will render 1 preview renderer component', () => {
    const component = wrapper.find(`.preview-component`);
    expect(component.length).toBe(1);
  });

  it('will render 1 loading component when prop is set', () => {
    wrapper.setProps({ isLoading: true });
    const component = wrapper.find(`.loading`);
    expect(component.length).toBe(1);
  });

  it('will call uploadHandler when file dropped on component', () => {
    const uploadHandler = jest.fn();
    const testFile = { name: 'testFileName.jpg' };
    wrapper.setProps({ uploadHandler });
    wrapper.instance().fileOnDrop([testFile]);
    expect(uploadHandler).toHaveBeenCalled();
  });
});
