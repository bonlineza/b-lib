import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropOptions from 'components/DropOptions';

const WrappedDropOptionsButtons = () => (
  <DropOptions
    wrapperClass="test-wrapper-class"
    baseElement={() => <span>Base Element</span>}>
    <button type="button" onClick={() => action('Clicked Button 1')}>
      Button 1
    </button>
    <button type="button" onClick={() => action('Clicked Button 2')}>
      Button 2
    </button>
  </DropOptions>
);
storiesOf('DropOptions', module).add('default', () => (
  <WrappedDropOptionsButtons />
));

const WrappedDropOptionsAnchors = () => (
  <DropOptions
    wrapperClass="test-wrapper-class"
    baseElement={() => <span>Base Element</span>}>
    <a href="#1">Anchor 1</a>
    <a href="#2">Anchor 2</a>
  </DropOptions>
);
storiesOf('DropOptions', module).add('Anchors', () => (
  <WrappedDropOptionsAnchors />
));
