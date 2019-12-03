import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { wrapTooltip } from 'components/ToolTip/wrapTooltip';
import Readme from '../docs/ToolTip.md';

const WrappedTextToolTip = () => (
  <Fragment>
    <div className="hover-tooltip-container">
      <span>{wrapTooltip('children', 'text')}</span>
    </div>
  </Fragment>
);

const WrappedButtonToolTip = () => (
  <Fragment>
    <div className="hover-tooltip-container">
      <span>
        {wrapTooltip(
          <button type="button" onClick={action('actionComponent action')}>
            children
          </button>,
          'text',
        )}
      </span>
    </div>
  </Fragment>
);

storiesOf('ToolTip', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <WrappedTextToolTip />)
  .add('ButtonToolTip', () => <WrappedButtonToolTip />);
