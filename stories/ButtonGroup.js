import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonGroup from 'components/ButtonGroup';

storiesOf('DateRangePicker (DRP)', module).add('default', () => {
  const buttons = [
    {
      type: 'fancy',
      name: 'button1',
      text: 'Button 1 Text',
    },
    {
      type: 'fancy',
      name: 'button2',
      text: 'Button 2 Text',
    },
  ];
  return (
    <ButtonGroup alt>
      {buttons.map((item, key) => (
        <button
          key={key}
          type="button"
          data-meta={{ type: item.type || 'default' }}
          onClick={() => console.log(item.name)}
          data-qe-id={`action-click-${item.name}`}>
          {item.text}
        </button>
      ))}
    </ButtonGroup>
  );
});
