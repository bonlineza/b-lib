import React from 'react';

const SimpleListContext = React.createContext({
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

export default SimpleListContext;
