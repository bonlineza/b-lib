import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import WYSIWYG from 'components/WYSIWYG';
import CustomEditor from 'test/components/TextareaEditor';
import Readme from '../docs/WYSIWYG.md';

const defaultProps = {
  isEditing: false,
  editorId: 'test-wysiwyg',
  placeholder: 'test palceholder',
  inputClass: 'test__textarea',
  editorClass: CustomEditor,
  onEditorFocus: () => console.log('did focus'),
  onChange: content => console.log(content),
};

const DefaultWYSIWYG = () => {
  const [isEditing, setIsEditing] = useState(defaultProps.isEditing);
  const [content, setContent] = useState('');
  return (
    <Fragment>
      <button type="button" onClick={() => setIsEditing(!isEditing)}>
        toggle edit mode
      </button>
      <WYSIWYG
        {...defaultProps}
        onChange={e => {
          e.preventDefault();
          setContent(e.target.value);
        }}
        isEditing={isEditing}
      />
      <p>content: {content}</p>
    </Fragment>
  );
};

storiesOf('WYSIWYG', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <DefaultWYSIWYG />);
