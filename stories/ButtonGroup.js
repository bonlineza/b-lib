import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonGroup from 'components/ButtonGroup';
import Readme from '../docs/ButtonGroup.md';

const DefaultButtonGroup = () => (
  <ButtonGroup>
    <button type="button" onClick={action('Button 1')}>
      Button 1
    </button>
    <button type="button" onClick={action('Button 2')}>
      Button 2
    </button>
    <button type="button" onClick={action('Button 3')}>
      Button 3
    </button>
    <button type="button" onClick={action('Button 4')}>
      Button 4
    </button>
  </ButtonGroup>
);

const ThreeAltButtonGroup = () => (
  <ButtonGroup alt numButtons={3}>
    <button type="button" onClick={action('Button 1')}>
      Button 1
    </button>
    <button type="button" onClick={action('Button 2')}>
      Button 2
    </button>
    <button type="button" onClick={action('Button 3')}>
      Button 3
    </button>
    <button type="button" onClick={action('Button 4')}>
      Button 4
    </button>
  </ButtonGroup>
);

storiesOf('ButtonGroup', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <DefaultButtonGroup />)
  .add('Three Button Alt', () => <ThreeAltButtonGroup />);
