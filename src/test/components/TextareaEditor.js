import React from 'react';

const CustomEditor = ({
  content,
  onChange,
  onEditorFocus,
  editorId,
  inputClass,
}) => (
  <textarea
    type="text"
    id={editorId}
    className={inputClass}
    onChange={e => onChange(e.target.value)}
    onFocus={onEditorFocus}
    defaultValue={content}
  />
);

export default CustomEditor;
