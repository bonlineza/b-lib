import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import MultiLineSelect from 'components/MultiLineSelect';
import AsideSlide from 'components/AsideSlide';
import Readme from '../docs/MultiLineSelect.md';

const defaultMultiLineProps = {
  label: 'Dummy Label',
  placeholder: 'Add Item',
  errors: [],
  multiline: true,
  onChange: () => false,
};

const Selector = ({
  addItem = () => null,
  isSelectorActive,
  toggleSelector,
  title,
}) => (
  <Fragment>
    <AsideSlide
      showHeader
      title={title}
      isOpen={isSelectorActive}
      toggle={toggleSelector}>
      <button
        type="button"
        onClick={() => {
          addItem('Product One');
          toggleSelector();
        }}>
        Select Product One
      </button>
      <button
        type="button"
        onClick={() => {
          addItem('Product Two');
          toggleSelector();
        }}>
        Select Product Two
      </button>
      <button
        type="button"
        onClick={() => {
          addItem('Product Three');
          toggleSelector();
        }}>
        Select Product Three
      </button>
    </AsideSlide>
  </Fragment>
);

const WrappedMultiLineSelect = (props = {}) => {
  const selectorObj = {
    selector: Selector,
  };

  const finalProps = {
    ...defaultMultiLineProps,
    ...props,
    selectorObj,
  };

  return <MultiLineSelect {...finalProps} />;
};

storiesOf('MultiLineSelect', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <WrappedMultiLineSelect />)
  .add('Can only select one item', () => (
    <WrappedMultiLineSelect multiline={false} />
  ));
