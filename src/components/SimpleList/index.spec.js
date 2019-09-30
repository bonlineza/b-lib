import React from 'react';
import 'test-util/setup';
import { shallow } from 'enzyme';
import SimpleList from './index';

const defaultProps = {
  name: 'list-name',
  isLoading: false,
  baseClass: 'simple-list',
  bgcAlt: false, // asd
  tableTitle: '', // adds H3 title to top of list
  allowClick: true,
  clickAct: null, // will be called if chiild is clicked and 'allowClick' is set
  noPointer: false, // apply special ${baseClass}--no-pointer class
  enableSearch: true, // controls if filter element is used (search and filter)
  initialSearch: '',
  filterOpts: [], // use a build-in filter dropdown with options
  addFilter: undefined, // add some custom filter
  showDatepicker: false, // use a built-in date range picker
  section: false, // enables Sections - as opposed to Standard Listing
  sectionTarget: '', // base object key to reference each section from
  sectionTitleKeys: [], // keys inside that base object to use as the section title (dash separated)
  groupSelection: null, // a list of Dropdown values are that use used to trigger Grouping filters - only relevant if grouping is manually imlemented in the list renderer
  children: false, // a child render function that accepts list data and returns JSX
  data: [], // the list data to process
  headings: [], // the column headings
  updateQuery: () => null, // will trigger on page/sort/group/search/date-filter
};

const sectionProps = {
  sections: true,
  sectionTarget: 'objects',
  sectionTitleKeys: ['section_ref', 'section_type', 'section_description'],
  data: [
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
  ],
};

// baseClass
// bgc alt
// noPointer
// tableTitle
// enableSearch - shows Filter component
// has HeaderComponent
// has Section component if 'section' = true
// has Body Component

// const rowsData = [
//   {
//     value: 'Item 1',
//     key: 1,
//   },
//   {
//     value: 'Item 2',
//     key: 2,
//   },
//   {
//     value: 'Item 3',
//     key: 3,
//   },
// ];

const setup = props => {
  const newProps = { ...defaultProps, ...props };
  return shallow(<SimpleList {...newProps} />);
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
    it('baseClass', () => {
      const base = wrapper.find(`.${defaultProps.baseClass}`);
      expect(base.length).toBe(1);
    });
    it('bgcAlt prop adds "--bgc-alt" class modifier', () => {
      wrapper.setProps({ bgcAlt: true });
      const rows = wrapper.find(`.${defaultProps.baseClass}--bgc-alt`);
      expect(rows.length).toBe(1);
    });
    it('H3 tableTitle text', () => {
      const tableTitle = 'Simple List Title';
      wrapper.setProps({ tableTitle });
      const title = wrapper.find('h3');
      expect(title.text()).toBe(tableTitle);
    });
    it('Filter is enableSearch is set to true', () => {
      wrapper.setProps({ enableSearch: true });
      const comp = wrapper.find('Filter');
      expect(comp.length).toBe(1);
    });
    it('Header', () => {
      const comp = wrapper.find('Header');
      expect(comp.length).toBe(1);
    });
    it('Section if "section" props is true', () => {
      wrapper.setProps({ ...sectionProps });
      const comp = wrapper.find('Sections');
      expect(comp.length).toBe(1);
    });
    it('Body', () => {
      const comp = wrapper.find('Body');
      expect(comp.length).toBe(1);
    });
  });
});
