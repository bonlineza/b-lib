import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import SwitchView from 'components/SwitchView';

const SwitchViewButtons = () => (
  <Fragment>
    <SwitchView
      views={[
        {
          type: 'viewType1',
          label: 'Test List',
          active: true,
        },
        {
          type: 'viewType2',
          label: 'Test Forms',
          active: false,
        },
      ]}>
      <div type="viewType1">
        <div className="switchview-child-1">Child 1</div>
      </div>
      <div type="viewType2">
        <div className="switchview-child-2">Child 2</div>
      </div>
    </SwitchView>
  </Fragment>
);

storiesOf('SwitchView', module).add('Two Buttons - Two Views', () => (
  <SwitchViewButtons />
));

const SwitchViewNoButtons = () => (
  <Fragment>
    <SwitchView
      views={[
        {
          type: 'viewType1',
          label: 'Test List',
          active: true,
        },
      ]}>
      <div type="viewType1">
        <div className="switchview-child-1">Child 1</div>
      </div>
    </SwitchView>
  </Fragment>
);

storiesOf('SwitchView', module).add('No Buttons - One View', () => (
  <SwitchViewNoButtons />
));
