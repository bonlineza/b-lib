import React, { Fragment } from 'react';
import Filter from '../Filter/index.js';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Sections from './components/Sections.js';

type DefaultPropShape = {
  addFilter: void,
  bgcAlt: boolean,
  clickAct: Function,
  filterOpts: Array<{
    text: string,
    value: string,
  }>,
  tableTitle: string,
  sections: boolean,
  enableSearch: boolean,
  showDatepicker: boolean,
  children: false,
  allowClick: boolean,
  groupSelection: Object[],
  onScroll: Function,
};

type HeadingType = {
  name: string,
  sortable: boolean,
  text: string,
};

export type SimpleListPropsShape = {
  /** string that is used as a reference to connect to store `ConnectedSimpleList`
   * of respective project it is  being used in
   * */
  name: string,
  /** css class for root of div of component */
  baseClass?: string,
  /** Headers for list, has following prop shape:
   * --
   * `name`: string (name of Header), [required]
   * `sortable`: boolean (if true, `sort button` is rendered, [required]
   * on click of that button, columns in that column are reordered `[asc, desc]` ),
   * `text: string`, (text that appears in header)[required]
   * */
  headings: Array<HeadingType>,
  /** returns some JSX to render an additional filter */
  addFilter?: Function,
  /** if true, appends `baseClass` with `--bgc-alt` */
  bgcAlt?: boolean,
  /** Callback function that is trigger clicking on a row */
  clickAct?: Function,
  /** Array of object that are mapped to create filter options in the `<FilterComponent />`.
   * Value is placed in `predefined` prop of `<FilterComponent />`
   * When clicking on the `Filter Component` they are appear for selection
   * Clicking on a `Filter Option` will append the value to the search bar
   * */
  filterOpts?: Array<{
    text: string,
    value: string,
  }>,
  /** String of `SimpleList` table */
  tableTitle?: string,
  /** If true `<Sections />` component will be rendered and if false `<Body />`
   *  component will be rendered */
  sections?: boolean,
  /** TODO: investigate the purpose of `sectionTarget` */
  sectionTarget?: string,
  /** TODO: investigate the purpose of `sectionTitleKeys` */
  sectionTitleKeys?: string[],
  /** If true `Filter Component` renders */
  enableSearch?: boolean,
  /** Passed into `addDatePicker`prop `<FilterComponent />`.
   * If true `DatePicker` renders in  `<FilterComponent />` */
  showDatepicker?: boolean,
  /** If maps out logic that this component has wrapped. Mapping out children */
  children?: any,
  /** bool added to context so it can be used by an component wrapped in the provider */
  allowClick?: boolean,
  /** Add initial value to input of `<FilterComponent>` passed into prop `initialText` */
  initialSearch?: string,
  /** options for SimpleSelect in `<FilterComponent>` passed into prop `groupSelection` */
  groupSelection?: Object[],
  /** value of input `<FilterComponent>` */
  searchValue?: string,
  /** String acting as Title displayed on top of input for `<FilterComponent>` */
  filterTitle?: string,
  /** If true appends `--no-pointer` to `baseClass` in root div of this component */
  noPointer?: boolean,
  /** jsx to act as `HeaderComponent` right above `<BodyComponent>/<SectionComponent>` */
  HeaderComponent?: any,
  /** can either be a custom filter component or if not the default `<Filter />` */
  FilterComponent?: any,
  /** renders `<Body>` by default */
  BodyComponent?: any,
  /** renders `<Sections>` by default */
  SectionsComponent?: any,
};

type PropsShape = SimpleListPropsShape & {
  updateQuery: Function,
};

// TODO: this is outdated....
// before i flesh this out...
export type SimpleListContextShape = {
  updateQuery: Function,
  name: string,
  initial_sort: string,
  sortString: string, // not sure what the difference is here...
};

export const SimpleListContext = React.createContext({
  name: '',
  headings: [],
  sortString: '',
  initial_sort: '',
  onItemClick: null,
  updateQuery: null,
  onSort: null,
  subFilter: null,
  pageData: {
    currentPage: 0,
    lastPage: 0,
    perPage: 0,
  },
  sectionData: {
    sections: null,
    sectionTarget: null,
    sectionTitleKeys: null,
  },
  childrenRenderer: null,
  allowClick: false,
  data: [],
  initialLoad: false,
  isLoading: false,
  searchValue: '',
});

class SimpleList extends React.Component<PropsShape> {
  static defaultProps = {
    baseClass: 'simple-list',
    clickAct: null,
    filterOpts: [],
    bgcAlt: false,
    addFilter: undefined,
    tableTitle: '',
    filterTitle: '',
    enableSearch: true,
    showDatepicker: false,
    noPointer: false,
    children: false,
    allowClick: true,
    initialSearch: '',
    sections: false,
    sectionTarget: '',
    sectionTitleKeys: [],
    groupSelection: null,
    searchValue: '',
    HeaderComponent: Header,
    FilterComponent: Filter,
    BodyComponent: Body,
    SectionsComponent: Sections,
  };

  defaultProps: DefaultPropShape;

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  updateQuery = (searchType, arg1, arg2) => {
    const { updateQuery } = this.props;
    updateQuery(searchType, arg1, arg2);
  };

  changePerPage = (perPage: string | number): any => {
    this.updateQuery('per-page', perPage);
  };

  sortData = (column: string, sortType: 'asc' | 'desc'): any =>
    this.updateQuery('sort', column, sortType);

  groupData = (grouping: string): any => {
    this.updateQuery('group', grouping);
  };

  searchData = (term: string): string => {
    this.updateQuery('search', term);
  };

  paginateData = (pageNumber: number): Function =>
    this.updateQuery('paginate', pageNumber, this.listRef.current);

  filterDataByDate = ({ start, end }: Object): Function =>
    this.updateQuery('date-filter', start, end);

  // CODE SMELL: perhaps make all query changes 'custom' ie the callers will inject the 'type' in stead of 'translating' callbacks here
  subFilter = (value = '', name = '') => {
    this.updateQuery('sub-filter', name, value);
  };

  render() {
    const {
      baseClass,
      name,
      headings,
      sortString,
      initial_sort,
      clickAct: onItemClick,
      currentPage,
      lastPage,
      perPage,
      sections,
      sectionTarget,
      sectionTitleKeys,
      children: childrenRenderer,
      allowClick,
      data,
      isLoading,
      initialLoad,
      bgcAlt,
      noPointer,
      tableTitle,
      filterTitle,
      enableSearch,
      addFilter,
      filterOpts,
      showDatepicker,
      initialSearch,
      groupSelection,
      filterPlaceholder,
      searchValue,
      HeaderComponent,
      FilterComponent,
      BodyComponent,
      SectionsComponent,
    } = this.props;
    return (
      <SimpleListContext.Provider
        value={{
          name,
          headings,
          sortString,
          initial_sort,
          onItemClick,
          updateQuery: this.updateQuery,
          subFilter: this.subFilter,
          onSort: this.sortData,
          changePage: this.paginateData,
          changePageLimit: this.changePerPage,
          pageData: {
            currentPage,
            lastPage,
            perPage,
          },
          sectionData: {
            sections,
            sectionTarget,
            sectionTitleKeys,
          },
          childrenRenderer,
          allowClick,
          data,
          isLoading,
          initialLoad,
        }}>
        <div
          ref={this.listRef}
          className={`${baseClass} ${bgcAlt ? `${baseClass}--bgc-alt` : ''} ${
            noPointer ? `${baseClass}--no-pointer` : ''
          }`}>
          {tableTitle ? (
            <h3 className={`${baseClass}__title`}>{tableTitle}</h3>
          ) : null}

          <div className="simple-list__top-block">
            {this.props.passedDownComponents &&
              this.props.passedDownComponents.length > 0 &&
              this.props.passedDownComponents.map((component, index) => (
                <Fragment key={`passed-down-${index}`}>
                  {React.cloneElement(component, { ...this.state })}
                </Fragment>
              ))}

            {enableSearch ? (
              <FilterComponent // TODO: add a context-wrapped Filter component
                callback={this.searchData}
                addFilter={addFilter || undefined}
                filterTitle={filterTitle}
                predefined={filterOpts}
                addDatepicker={showDatepicker}
                datepickerCallback={this.filterDataByDate}
                name={name}
                initialText={initialSearch}
                groupSelection={groupSelection}
                groupSelectionCB={this.groupData}
                forceValue={searchValue}
                searchInputPlaceholderText={filterPlaceholder}
                isLoading={isLoading}
              />
            ) : (
              <div />
            )}
          </div>

          <div className="simple-list__container">
            <HeaderComponent />
            {sections === true ? <SectionsComponent /> : <BodyComponent />}
          </div>
        </div>
      </SimpleListContext.Provider>
    );
  }
}

export default SimpleList;
