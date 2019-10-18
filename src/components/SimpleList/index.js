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

export type SimpleListPropsShape = {
  name: string,
  headings: [
    {
      name: string,
      sortable: boolean,
      text: string,
    },
  ],
  addFilter?: Function, // returns some JSX to render an additional filter
  bgcAlt?: boolean,
  clickAct?: Function,
  filterOpts?: Array<{
    text: string,
    value: string,
  }>,
  tableTitle?: string,
  sections?: boolean,
  sectionTarget?: string,
  sectionTitleKeys?: string[],
  enableSearch?: boolean,
  showDatepicker?: boolean,
  children?: any,
  allowClick?: boolean,
  initialSearch?: string,
  groupSelection?: Object[],
  searchValue?: string,
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
    this.updateQuery('paginate', pageNumber);

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
