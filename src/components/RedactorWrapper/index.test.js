import React from 'react';
import 'test-util/setup';
import customConfig from 'test-util/redactorConfig';
import { mount } from 'enzyme';

import RedactorWrapper from './index.js';

const defaultProps = {
  placeholder: 'placeholder text',
  content: 'Demo Content',
  editorId: 'redactor-wrapper',
  inputClass: 'redactor-wrapper__input',
  redactorConfig: customConfig,
};

const exampleHTML = '<p>some <b>bold</b> content with a <h1>heading</h1></p>';
const transformedHTML =
  '<p>some <b>bold</b> content with a </p><h1>heading</h1><p></p>';

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(<RedactorWrapper {...testProps} />);
};

describe('SimplePopup', () => {
  let wrapper;

  describe('Render Simple', () => {
    beforeEach(() => {
      wrapper = setup();
    });
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('text content', () => {
      expect(wrapper.find(`.${defaultProps.inputClass}`).text()).toBe(
        defaultProps.content,
      );
    });
  });

  describe('Render HTML', () => {
    beforeEach(() => {
      wrapper = setup({ content: exampleHTML, legacyBehaviour: true });
    });

    it('HTML content is returned and transformed onChange', () => {
      const onChange = jest.fn();
      wrapper.setProps({ onChange });
      const editor = wrapper.find(`.${defaultProps.inputClass}`);
      editor.simulate('keyup', { target: { innerText: transformedHTML } });
      expect(onChange).toHaveBeenCalledWith(transformedHTML);
    });
  });

  describe('Default Behaviour', () => {
    beforeEach(() => {
      wrapper = setup();
    });
    it('onChange is called when the input is changed', () => {
      const onChange = jest.fn();
      wrapper.setProps({ onChange });
      const editor = wrapper.find(`.${defaultProps.inputClass}`);
      editor.simulate('keyup', { target: { value: defaultProps.content } });
      expect(onChange).toHaveBeenCalled();
    });
    it('onEditorFocus is called when the input is focused', () => {
      const onEditorFocus = jest.fn();
      wrapper.setProps({ onEditorFocus });
      const editor = wrapper.find(`.${defaultProps.inputClass}`);
      editor.simulate('focus', { target: { value: defaultProps.content } });
      expect(onEditorFocus).toHaveBeenCalled();
    });
  });

  describe('Legacy Behaviour', () => {
    beforeEach(() => {
      wrapper = setup({ legacyBehaviour: true });
    });
    it('onChange is called when the input is changed', () => {
      const onChange = jest.fn();
      wrapper.setProps({ onChange });
      const editor = wrapper.find(`.${defaultProps.inputClass}`);
      editor.simulate('keyup', { target: { value: defaultProps.content } });
      expect(onChange).toHaveBeenCalled();
    });
    it('onEditorFocus is called when the input is focused', () => {
      const onEditorFocus = jest.fn();
      wrapper.setProps({ onEditorFocus });
      const editor = wrapper.find(`.${defaultProps.inputClass}`);
      editor.simulate('focus', { target: { value: defaultProps.content } });
      expect(onEditorFocus).toHaveBeenCalled();
    });
  });
});
