import React, { Fragment, useState } from 'react';
import moxios from 'moxios';
import { storiesOf } from '@storybook/react';
import PageReady, { Context } from 'components/PageReady';

moxios.install();
const data = [
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
];

const getPageReady = props => (
  <PageReady {...props}>
    <Context.Consumer>
      {({ data: names }) => (
        <Fragment>
          {names.map(({ name, id }) => (
            <div className="list-item" key={id}>
              {name}
            </div>
          ))}
        </Fragment>
      )}
    </Context.Consumer>
  </PageReady>
);

const DefaultPageReady = () => {
  moxios.stubRequest('https://fake.test/names', {
    status: 200,
    response: data,
  });
  return getPageReady({ url: 'https://fake.test/names' });
};

storiesOf('PageReady', module).add('default', () => <DefaultPageReady />);

const FailedPageReady = () => {
  moxios.stubRequest(/.*/, {
    status: 400,
  });

  return getPageReady({
    url: 'https://fake.test/sdfdkfjhg',
    customErrorMessage: 'This a custom error message',
  });
};

storiesOf('PageReady', module).add('custom error message', () => (
  <FailedPageReady />
));
