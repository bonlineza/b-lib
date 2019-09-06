import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import Paginator from './index';

const defaultProps = {
  onChangePage: () => null,
  onChangePageLimit: () => null,
  currentPage: 0,
  totalPages: 0,
  hasItems: false,
  isLoading: false,
  baseClass: 'paginator',
  isLoadingContent: () => 'loading',
  isEmptyContent: () => 'empty',
  prevBtnContent: () => '&lt;',
  nextBtnContent: () => '&gt;',
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(<Paginator {...testProps} />);
};

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('without errors', () => {
    expect(wrapper.length).toBe(1);
  });

  it('show empty content by default', () => {
    expect(wrapper.text()).toBe(defaultProps.isEmptyContent());
  });

  it('show loading content when in that state', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.text()).toBe(defaultProps.isLoadingContent());
  });

  describe('has content', () => {
    let onChangePage;

    beforeEach(() => {
      onChangePage = jest.fn();
      wrapper.setProps({
        isLoading: false,
        hasItems: true,
        totalPages: 2,
        onChangePage,
      });
    });

    it('two pagination buttons when not loading, hasitems and totaPages > 1', () => {
      const buttonContainer = wrapper.find(`.${defaultProps.baseClass}`);
      expect(buttonContainer.children().length).toBe(2);
    });
    it('onchangepage is called with page param when click second button', () => {
      const buttonContainer = wrapper.find(`.${defaultProps.baseClass}`);
      const nextButton = buttonContainer
        .children()
        .last()
        .find('button');
      nextButton.simulate('click');
      expect(onChangePage).toHaveBeenCalledWith(defaultProps.currentPage + 1);
    });
    it('first button is disabled', () => {
      const buttonContainer = wrapper.find(`.${defaultProps.baseClass}`);
      const prevButton = buttonContainer
        .children()
        .first()
        .find('button');
      expect(prevButton.props().disabled).toBe(true);
    });
  });
});
