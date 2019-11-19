import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { wrapTooltip } from 'components/ToolTip/wrapTooltip';

const WrappedTextToolTip = () => (
  <Fragment>
    <div className="hover-tooltip-container">
      <span>{wrapTooltip('children', 'text')}</span>
    </div>
  </Fragment>
);

storiesOf('ToolTip', module).add('default', () => <WrappedTextToolTip />);

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

storiesOf('ToolTip', module).add('ButtonToolTip', () => (
  <WrappedButtonToolTip />
));
