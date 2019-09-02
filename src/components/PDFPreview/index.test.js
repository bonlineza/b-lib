import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';

import PDFPreview from './index';

const setup = () =>
  shallow(
    <PDFPreview
      data={{ extUrl: 'someURL' }}
      description={() => (
        <div className="description-class">Some Description</div>
      )}
      customControls={[]}
      prevPageButton={
        <button type="button" className="btn-svg--base">
          &lt;
        </button>
      }
      nextPageButton={
        <button type="button" className="btn-svg--base">
          &gt;
        </button>
      }
    />,
  );

describe('PDFPreview', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('two pagination controls should exists', () => {
      const button = wrapper.find('button');
      expect(button.length).toBe(2);
    });
    it('render simple description', () => {
      const description = wrapper.find('.description-class');
      expect(description.length).toBe(1);
    });
  });

  describe('Behaviour', () => {
    it('both buttons are disabled by default', () => {
      const prevPageButton = wrapper.find('button').first();
      expect(prevPageButton.props().disabled).toBe(true);
      const nextPageButton = wrapper.find('button').last();
      expect(nextPageButton.props().disabled).toBe(true);
    });
    it('having more pages available enables the next button', () => {
      wrapper.instance().onDocumentComplete(3);
      const prevPageButton = wrapper.find('button').first();
      expect(prevPageButton.props().disabled).toBe(true);
      const nextPageButton = wrapper.find('button').last();
      expect(nextPageButton.props().disabled).toBe(false);
    });
    it('clicking the next button will enable the prev button', () => {
      wrapper.instance().onDocumentComplete(3);
      const nextPageButton = wrapper.find('button').last();
      nextPageButton.simulate('click');
      const prevPageButton = wrapper.find('button').first();
      expect(prevPageButton.props().disabled).toBe(false);
    });
  });
});
