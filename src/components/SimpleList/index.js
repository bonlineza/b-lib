import React from 'react';
import Filter from '../Filter';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Section from './components/Sections.js';

type DefaultPropShape = {
  addFilter: void,
  bgcAlt: boolean,
  clickAct: Function,
  clickPropOne: string,
  clickPropTwo: string,
  filterOpts: Array<{
    text: string,
    value: string,
  }>,
  tableTitle: string,
  section: boolean,
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
  section?: boolean,
  sectionTarget?: string,
  sectionTitleKeys?: string[],
  enableSearch?: boolean,
  showDatepicker: boolean,
  children?: any,
  allowClick?: boolean,
  initialSearch?: string,
  groupSelection?: Object[],
};

type PropsShape = SimpleListPropsShape & {
  updateQuery: Function,
};

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
  pageData: {
    currentPage: 0,
    lastPage: 0,
    perPage: 0,
  },
  sectionData: {
    section: null,
    sectionTarget: null,
    sectionTitleKeys: null,
  },
  childrenRenderer: null,
  allowClick: false,
  data: [],
  isLoading: false,
});

class SimpleList extends React.Component<PropsShape> {
  static defaultProps = {
    baseClass: 'simple-list',
    clickAct: null,
    filterOpts: [],
    bgcAlt: false,
    addFilter: undefined,
    tableTitle: '',
    section: false,
    enableSearch: true,
    showDatepicker: false,
    noPointer: false,
    children: false,
    allowClick: true,
    initialSearch: '',
    sectionTarget: '',
    sectionTitleKeys: [],
    groupSelection: null,
  };

  defaultProps: DefaultPropShape;

  changePerPage = (perPage: string | number): any =>
    this.props.updateQuery('per-page', perPage);

  sortData = (column: string, sortType: 'asc' | 'desc'): any =>
    this.props.updateQuery('sort', column, sortType);

  groupData = (grouping: string): any => {
    this.props.updateQuery('group', grouping);
  };

  searchData = (term: string): string => {
    this.props.updateQuery('search', term);
  };

  paginateData = (pageNumber: number): Function => (): any => {
    this.props.updateQuery('paginate', pageNumber);
  };

  filterDataByDate = ({ start, end }: Object): Function =>
    this.props.updateQuery('date-filter', start, end);

  render() {
    const { baseClass } = this.props;
    return (
      <SimpleListContext.Provider
        value={{
          name: this.props.name,
          headings: this.props.headings,
          sortString: this.props.sortString,
          initial_sort: this.props.initial_sort,
          onItemClick: this.props.clickAct,
          updateQuery: this.props.updateQuery,
          onSort: this.sortData,
          pageData: {
            currentPage: this.props.currentPage,
            lastPage: this.props.lastPage,
            perPage: this.props.perPage,
          },
          sectionData: {
            section: this.props.section,
            sectionTarget: this.props.sectionTarget,
            sectionTitleKeys: this.props.sectionTitleKeys,
          },
          childrenRenderer: this.props.children,
          allowClick: this.props.allowClick,
          data: this.props.data,
          isLoading: this.props.isLoading,
        }}>
        <div
          ref={this.listRef}
          className={`${baseClass} ${
            this.props.bgcAlt ? `${baseClass}--bgc-alt` : ''
          } ${this.props.noPointer ? `${baseClass}--no-pointer` : ''}`}>
          {this.props.tableTitle !== '' ? (
            <h3 className={`${baseClass}__title`}>{this.props.tableTitle}</h3>
          ) : null}
          {this.props.enableSearch ? (
            <Filter // TODO: add a context-wrapped Filter component
              callback={this.searchData}
              groupSelectionCB={this.groupData}
              // TODO: use context props within - when merging Filter changes into this
              addFilter={this.props.addFilter || undefined}
              predefined={this.props.filterOpts}
              addDatepicker={this.props.showDatepicker}
              datepickerCallback={this.filterDataByDate}
              connectName={this.props.name}
              initialText={this.props.initialSearch}
              groupSelection={this.props.groupSelection}
            />
          ) : (
            <div />
          )}
          <Header />
          {this.props.section === true ? (
            <Section changePage={this.paginateData} />
          ) : (
            <Body
              changePage={this.paginateData}
              changePageLimit={this.changePerPage}
            />
          )}
        </div>
      </SimpleListContext.Provider>
    );
  }
}

export default SimpleList;
