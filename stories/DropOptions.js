import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropOptions from 'components/DropOptions';

const WrappedDropOptions = () => (
  <DropOptions
    wrapperClass="test-wrapper-class"
    baseElement={() => <p>Base Element</p>}>
    <button type="button" onClick={() => action('Clicked Button 1')}>
      Button 1
    </button>
    <button type="button" onClick={() => action('Clicked Button 2')}>
      Button 2
    </button>
  </DropOptions>
);
storiesOf('DropOptions', module).add('default', () => <WrappedDropOptions />);
