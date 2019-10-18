import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import Body from './Body';
import { SimpleListContext } from '../index';

const DefaultHeadings = [
  {
    name: 'key1',
    order: false,
    sortType: 'asc',
    sortable: true,
    text: 'Heading 1',
    flex: '30%',
  },
  {
    name: 'key2',
    order: false,
    sortType: 'asc',
    sortable: true,
    text: 'Heading 2',
    flex: '30%',
  },
];

const defaultData = [
  {
    key1: 'Some Value 1-1',
    key2: 'Some Value 1-2',
    key3: 'Some Value 1-3',
  },
  {
    key1: 'Some Value 2-1',
    key2: 'Some Value 2-2',
    key3: 'Some Value -23',
  },
  {
    key1: 'Some Value 3-1',
    key2: 'Some Value 3-2',
    key3: 'Some Value 3-3',
  },
];

const DefaultBodyContext = {
  name: 'some_list_name',
  headings: DefaultHeadings,
  pageData: { lastPage: 0, currentPage: 0, perPage: 40 },
  data: defaultData,
  isLoading: false,
  childrenRenderer: null,
  allowClick: true,
  onItemClick: null,
};

const defaultProps = {
  changePage: () => null,
  changePageLimit: () => null,
};

const setup = props => {
  const newProps = { ...DefaultBodyContext, ...defaultProps, ...props };
  return mount(
    <SimpleListContext.Provider value={{ ...newProps }}>
      <Body />
    </SimpleListContext.Provider>,
  );
};

describe('SimpleList - Body', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('3x Buttons as a row', () => {
      const rows = wrapper.find('button');
      expect(rows.length).toBe(defaultData.length);
    });
    it('Paginator', () => {
      const comp = wrapper.find('Paginator');
      expect(comp.length).toBe(1);
    });
  });
});
