import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import PageReady, { Context } from 'components/PageReady';
import Readme from '../docs/PageReady.md';

const getSuccessRequestInstance = () =>
  new Promise(resolve => {
    setTimeout(function() {
      resolve([
        {
          id: 1,
          name: 'Clark Kent',
        },
        {
          id: 2,
          name: 'Diana Prince',
        },
        {
          id: 3,
          name: 'Harley Quinn',
        },
      ]);
    }, 250);
  });

const getPageReady = props => (
  <PageReady {...props}>
    <Context.Consumer>
      {({ data }) => (
        <Fragment>
          {data.map(({ id, name }) => (
            <div key={id}>{name}</div>
          ))}
        </Fragment>
      )}
    </Context.Consumer>
  </PageReady>
);

const DefaultPageReady = () =>
  getPageReady({ getRequestInstance: getSuccessRequestInstance });

const getFailedRequestInstance = () =>
  fetch('https://local.test/546456').then(function(response) {
    return response.json();
  });

const FailedPageReady = () =>
  getPageReady({
    getRequestInstance: getFailedRequestInstance,
    customErrorMessage: 'Custom error message',
  });

storiesOf('PageReady', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('default', () => <DefaultPageReady />)
  .add('custom error message', () => <FailedPageReady />);
