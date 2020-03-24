import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';

import SimpleErrorBoundary from './index';

const ErrorThrowingComponent = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Thrown error');
  }
  return <div>this should not show</div>;
};

const defaultProps = {
  errorMessage: 'Something whent wrong',
  errorLogger: null,
  showMessageOnError: true,
};

const setup = newProps =>
  mount(
    <SimpleErrorBoundary {...defaultProps} {...newProps}>
      <ErrorThrowingComponent />
    </SimpleErrorBoundary>,
  );

describe('SimpleErrorBoundary', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ isOpen: false });
  });

  describe('Render', () => {
    it('Without Error', () => {
      expect(wrapper.length).toBe(1);
    });

    it('errorMessage is shown by default', () => {
      expect(wrapper.text()).toBe(defaultProps.errorMessage);
    });

    it('errorMessage is not show when `showMessageOnError` is false', () => {
      wrapper.setProps({ showMessageOnError: false });
      expect(wrapper.text()).toBe('');
    });
  });
});
