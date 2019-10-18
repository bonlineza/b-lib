import React from 'react';
import 'test-util/setup';
import { mount } from 'enzyme';
import Sections from './Sections';
import { SimpleListContext } from '../index';

const defaultProps = {};

const defaultSectionData = [
  {
    section_ref: '01',
    section_type: 'Type',
    section_description: 'lorem ipsum',
    objects: [
      {
        id: '1',
        name: 'Object Name',
        description: 'Lorem ipsum',
      },
      {
        id: '2',
        name: 'Object Name',
        description: 'Lorem ipsum',
      },
    ],
  },
  {
    section_ref: '02',
    section_type: 'Type',
    section_description: 'lorem ipsum',
    objects: [
      {
        id: '3',
        name: 'Object Name 4',
        description: 'Lorem ipsum',
      },
      {
        id: '4',
        name: 'Object Name 4',
        description: 'Lorem ipsum',
      },
    ],
  },
];

const defaultHeadings = [
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

const defaultContext = {
  name: 'list-name',
  data: defaultSectionData,
  headings: defaultHeadings,
  onItemClick: () => null,
  changePage: () => null,
  changePageLimit: () => null,
  pageData: { currentPage: 0, lastPage: 0 },
  sectionData: {
    sectionTarget: 'objects',
    sectionTitleKeys: ['section_ref', 'section_type', 'section_description'],
  },
};

const setup = (props, context) => {
  const newProps = { ...defaultProps, ...props };
  const newContext = { ...defaultContext, ...context };
  return mount(
    <SimpleListContext.Provider value={{ ...newContext }}>
      <Sections {...newProps} />
    </SimpleListContext.Provider>,
  );
};

describe('SimpleList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe('Render', () => {
    it('withour error', () => {
      expect(wrapper.length).toBe(1);
    });
    it('2x Sections', () => {
      const base = wrapper.find(`.simple-list__body__section`);
      expect(base.length).toBe(2);
    });
    it('4x Buttons (2 per Section)', () => {
      wrapper.setProps({ bgcAlt: true });
      const rows = wrapper.find(`button`);
      expect(rows.length).toBe(
        defaultSectionData.reduce(
          (pv, cv) => pv + cv[defaultContext.sectionData.sectionTarget].length,
          0,
        ),
      );
    });
  });

  describe('Behaviour', () => {
    let onItemClick;
    beforeEach(() => {
      onItemClick = jest.fn();
      wrapper = setup({}, { onItemClick });
    });

    it('Clicking on a Row item will trigger the onItemCLick function', () => {
      const firstRow = wrapper.find('button').first();
      firstRow.simulate('click', { preventDefault: () => null });
      expect(onItemClick).toHaveBeenCalled();
    });
  });
});
