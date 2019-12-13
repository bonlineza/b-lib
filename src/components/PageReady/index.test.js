import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import axios from 'axios';
import 'test-util/setup';
import defaultRequest from './request';
import PageReady, { PageReadyContext } from './index';

describe('Page Ready', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const getAxiosRequestInstance = (url = '', method = 'get', postBody = {}) => {
    const requestParams = [url, method === 'post' ? { ...postBody } : {}];
    return axios[method.toLowerCase()](...requestParams);
  };

  it('tests that the prop name in the state of obj of the component is `John Doe`', done => {
    const data = {
      id: 1,
      name: 'John Doe',
    };

    moxios.stubRequest('https://fake.test/name/1', {
      status: 200,
      response: data,
    });

    const wrapper = mount(
      <PageReady
        getRequestInstance={() =>
          getAxiosRequestInstance('https://fake.test/name/1')
        }
      />,
    );

    moxios.wait(() => {
      wrapper.update();
      const {
        data: {
          data: { name },
        },
      } = wrapper.state();
      expect(name).toEqual('John Doe');
      done();
      wrapper.unmount();
    });
  });

  it('tests that names map out in the context consumer of PageReady and match with array of data', done => {
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
    moxios.stubRequest('https://fake.test/names', {
      status: 200,
      response: data,
    });

    const wrapper = mount(
      <PageReady
        getRequestInstance={() =>
          getAxiosRequestInstance('https://fake.test/name/1')
        }>
        <PageReadyContext.Consumer>
          {({
            data: {
              data: { names },
            },
          }) => (
            <Fragment>
              {names.map(({ name, id }) => (
                <div className="list-item" key={id}>
                  {name}
                </div>
              ))}
            </Fragment>
          )}
        </PageReadyContext.Consumer>
      </PageReady>,
    );

    moxios.wait(() => {
      wrapper.update();

      wrapper.find('.list-item').forEach((item, index) => {
        expect(item.text()).toBe(data[index].name);
      });
      done();
      wrapper.unmount();
    });
  });

  it('test that PageReady can make post requests to end points', done => {
    moxios.stubRequest('https://fake.test/names/1', {
      status: 200,
      data: 'dummy data',
    });

    const wrapper = mount(
      <PageReady
        getRequestInstance={() =>
          getAxiosRequestInstance('https://fake.test/names/1', 'post', {
            name: 'Jason Todd',
          })
        }
      />,
    );

    moxios.wait(() => {
      wrapper.update();
      const { name } = JSON.parse(moxios.requests.mostRecent().config.data);
      expect(name).toBe('Jason Todd');
      done();
      wrapper.unmount();
    });
  });

  it('Tests that you can use a custom loader', done => {
    moxios.stubRequest('https://fake.test/names', {
      status: 200,
      data: null,
    });
    const wrapper = mount(
      <PageReady
        getRequestInstance={() =>
          getAxiosRequestInstance('https://fake.test/names')
        }
        renderCustomLoader={() => (
          <div className="custom-loader">custom loader</div>
        )}
      />,
    );

    moxios.wait(() => {
      wrapper.update();
      wrapper.setState(
        {
          ...defaultRequest,
          fetching: true,
        },
        () => {
          expect(wrapper.find('.custom-loader').length).toBe(1);
        },
      );

      done();
      wrapper.unmount();
    });
  });
});
