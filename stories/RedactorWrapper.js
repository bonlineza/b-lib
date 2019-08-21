import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RedactorWrapper from 'components/RedactorWrapper';
import customConfig from 'test-util/redactorConfig';

const exampleHTML = '<p>some <b>bold</b> content with a <h1>heading</h1></p>';

const DefaultRedactorWrapper = props => {
  const defaultProps = {
    placeholder: 'placeholder text',
    content: 'Demo Content',
    editorId: 'redactor-wrapper',
    inputClass: 'redactor-wrapper__input',
    onEditorFocus: action('onFocus'),
    onChange: action('onChange'),
  };
  const testProps = { ...defaultProps, ...props };
  return <RedactorWrapper {...testProps} />;
};

storiesOf('RedactorWrapper', module).add(
  'Default Behavior - Default Menu',
  () => <DefaultRedactorWrapper />,
);

storiesOf('RedactorWrapper', module).add(
  'Default Behaviour - Custom Menu',
  () => <DefaultRedactorWrapper redactorConfig={customConfig} />,
);

storiesOf('RedactorWrapper', module).add(
  'Default Behaviour - Custom Menu - HTML Content',
  () => (
    <DefaultRedactorWrapper
      redactorConfig={customConfig}
      content={exampleHTML}
    />
  ),
);

storiesOf('RedactorWrapper', module).add(
  'Legacy Behaviour - Text Content',
  () => <DefaultRedactorWrapper legacyBehaviour />,
);
storiesOf('RedactorWrapper', module).add(
  'Legacy Behaviour - HTML Content',
  () => <DefaultRedactorWrapper content={exampleHTML} legacyBehaviour />,
);
