import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Paginator from 'components/Paginator';

const defaultProps = {
  onChangePage: action('changed page'),
  currentPage: 0,
  totalPages: 10,
  hasItems: true,
  isLoading: false,
  baseClass: 'paginator',
  isLoadingContent: () => 'loading',
  isEmptyContent: () => 'empty',
  prevBtnContent: () => '<',
  nextBtnContent: () => '>',
};

const DefaultPaginator = (props = {}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const testProps = { ...defaultProps, ...props };
  return (
    <Fragment>
      <p>totalPages: {testProps.totalPages}</p>
      <p>Page: {currentPage}</p>
      <Paginator
        {...testProps}
        currentPage={currentPage}
        onChangePage={page => setCurrentPage(page)}
      />
    </Fragment>
  );
};

storiesOf('Paginator', module).add('Simple Example', () => (
  <DefaultPaginator />
));
