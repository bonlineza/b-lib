import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import Header from './Header';
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
    sortable: false,
    text: 'Heading 2',
    flex: '30%',
  },
];

const DefaultBodyContext = {
  headings: DefaultHeadings,
  onSort: () => null,
  sortString: '', // a valid and up-to-date 'sortString' TODO: provide example
  name: 'list-name',
  initial_sort: '', // an initial sorting setup for the list
};

const TestSortComponent = () => <div>test sort component</div>;

const setup = (props, context) => {
  const newProps = { ...DefaultBodyContext, ...context };
  return mount(
    <SimpleListContext.Provider value={{ ...newProps }}>
      <Header SortComponent={TestSortComponent} {...props} />
    </SimpleListContext.Provider>,
  );
};

describe('SimpleList - Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('2x Headings as Buttons', () => {
      const rows = wrapper.find('button');
      expect(rows.length).toBe(DefaultHeadings.length);
    });
    it(`Each Heading with 'sortable' will render a TestSortComponent`, () => {
      const comp = wrapper.find('TestSortComponent');
      expect(comp.length).toBe(
        DefaultHeadings.filter(item => item.sortable).length,
      );
    });
  });

  describe('Behaviour', () => {
    let onSort;
    beforeEach(() => {
      onSort = jest.fn();
      wrapper = setup({}, { onSort });
    });

    it('Clicking on a Header will trigger the onSort function', () => {
      const sortheader = wrapper.find('button').first();
      sortheader.simulate('click', { preventDefault: () => null });
      expect(onSort).toHaveBeenCalled();
    });
  });
});
