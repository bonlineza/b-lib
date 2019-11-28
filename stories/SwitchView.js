import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import SwitchView from 'components/SwitchView';
import Readme from '../docs/SwitchView.md';

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

storiesOf('SwitchView', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Two Buttons - Two Views', () => <SwitchViewButtons />)
  .add('No Buttons - One View', () => <SwitchViewNoButtons />);
