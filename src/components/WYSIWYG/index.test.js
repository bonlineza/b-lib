import React from 'react';
import 'test-util/setup';
import CustomEditor from 'test/components/TextareaEditor';
import { mount } from 'enzyme';
import WYSIWYG from './index';

const defaultProps = {
  isEditing: false,
  editorId: 'test-wysiwyg',
  placeholder: 'test palceholder',
  inputClass: 'test__textarea',
  editorClass: CustomEditor,
  onEditorFocus: () => null,
  onChange: content => content,
};

const setup = (props = {}) => {
  const testProps = { ...defaultProps, ...props };
  return mount(<WYSIWYG {...testProps} />);
};

describe('WYSIWYG', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('show paragraph by default', () => {
      const paragraph = wrapper.find('p');
      expect(paragraph.length).toBe(1);
    });
    it('with some content', () => {
      const customContent = 'test content';
      wrapper = setup({ content: customContent });
      const paragraph = wrapper.find('p');
      expect(paragraph.text()).toBe(customContent);
    });
    it('custom editor with content', () => {
      const customContent = 'test content';
      wrapper = setup({ isEditing: true, content: customContent });
      const editor = wrapper.find('#test-wysiwyg');
      expect(editor.length).toBe(1);
      expect(editor.text()).toBe(customContent);
    });
    it('html sanitiser transforms content before rendering', () => {
      const customContent = 'test content';
      const sanitisedContent = 'sanitised content';
      wrapper = setup({
        isEditing: false,
        content: customContent,
        htmlSanitiser: () => sanitisedContent,
      });
      const editor = wrapper.find('p');
      expect(editor.text()).toBe(sanitisedContent);
    });
  });

  describe('Behaviour', () => {
    it('onChange will trigger when value of input is changed', () => {
      const onChange = jest.fn();
      const newProps = {
        onChange,
        isEditing: true,
      };
      wrapper = setup(newProps);
      const newValue = 'some new value';
      const editor = wrapper.find('#test-wysiwyg');
      editor.simulate('change', { target: { value: newValue } });
      expect(onChange).toHaveBeenCalledWith(newValue);
    });
    it('editor value with change when content prop is changed', () => {
      wrapper = setup({ isEditing: true });
      const newContent = 'new custom content';
      wrapper.setProps({ content: newContent });
      const editor = wrapper.find('#test-wysiwyg');
      expect(editor.text()).toBe(newContent);
    });
  });
});
