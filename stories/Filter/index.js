import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import Filter from 'components/Filter';
import Readme from '../../docs/Filter.md';
import './styles.scss';

const defaultProps = {
  callback: () => null,
  baseClass: 'list-filter',
  predefined: [],
  isLoading: false,
  isLoadingContent: () => null,
  clearInputButtonContent: () => 'clear',
  centered: false,
  addDatepicker: false,
  name: 'filter',
  title: 'Filter Title',
  initialText: 'initialSearchValue',
  groupSelection: null,
  addFilter: null,
  datepickerCallback: () => null,
  request: {
    success: true,
    error: false,
    loading: false,
  },
  debounce: 300,
};

const DefaultFilter = props => {
  const [searchValue, setSearchValue] = useState(false);
  const newProps = { ...defaultProps, ...props };
  return (
    <Fragment>
      <Filter {...newProps} callback={setSearchValue} />
      Search value: {searchValue}
    </Fragment>
  );
};

storiesOf('Filter Component', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <DefaultFilter />)
  .add('with Datepicker', () => <DefaultFilter addDatepicker />)
  .add('with Predefined filters', () => (
    <DefaultFilter
      predefined={[
        {
          text: 'Option 1',
          value: '1',
        },
        {
          text: 'Option 2',
          value: '2',
        },
      ]}
    />
  ))
  .add('with Group selection options', () => (
    <DefaultFilter
      groupSelection={[
        {
          label: 'Option 1',
          value: '1',
          default: true,
        },
        {
          label: 'Option 2',
          value: '2',
        },
      ]}
    />
  ));
