import React from 'react';
import DateRangePicker from '../DateRangePicker/index';
import SimpleSelect from '../SimpleSelect/index';
import PredefinedFilter from './components/predefinedFilter';
import './scss/Filter.scss';

type DefaultPropsType = {
  predefined: Array<{
    text: string,
    value: string,
  }>,
  addDatepicker: boolean,
};

type PropsType = {
  /** css class assigned to root div of this component */
  baseClass?: string,
  /** callback function triggered when a value is changed in SimpleSelect */
  groupSelectionCB?: Function,
  /** `name` is prepended to the value of the prop `data-qe-uid` */
  name?: string,
  /** Callback that is triggered from `handlePropogation` which triggered from
   * the function in addFilter */
  callback: Function,
  /** a function that renders custom component that can run `handlePropogration` */
  addFilter?: Function,
  /** if true, the props, `isLoadingContent` will render which a custom loader
   * component */
  isLoading?: boolean,
  /** A function that renders a custom loader component passed down */
  isLoadingContent?: Function,
  /** An object array. Works with `<PredefinedFilterComponent />` to append
   * one of the array items to the search bar value. each item of the array
   * has following shape `{ text:string, value:string }` */
  predefined?: Array<{
    text: string,
    value: string,
  }>,
  /** if true, the component will render the date picker */
  addDatepicker?: boolean,
  /** callback function that runs when the date changes */
  datepickerCallback?: Function,
  /** Function that renders the click input button. parameter in function contains
   * object with the following shape:  `{ onClick, isEmpty }`,
   * --
   * `onClick` runs the function `this.clearInput`
   * --
   * `isEmpty` holds the state, isEmpty from this comeponent,
   * */
  clearInputButton?: Function,
  /** Title the component */
  filterTitle?: string,
  /** set the initial state for `state.value` */
  initialText?: string,
  /** placeholder text for  input[name="filter_text"] */
  searchInputPlaceholderText?: string,
  /** options for SimpleSelect  */
  groupSelection?: Object[],
  /** this can be custom component that is passed down. the default value for
   * this prop is `<PredefinedFilter />`.
   * */
  PredefinedFilterComponent?: any,
  /** this can be custom component that is passed down. the default value for
   * this prop is `<DateRangePicker />`.
   * */
  DateRangePickerComponent?: any,
};

type StateType = {
  value: string,
  grouping: string,
  isPredefOpen: boolean,
  isEmpty: boolean,
};

class Filter extends React.Component<PropsType> {
  static defaultProps = {
    baseClass: 'list-filter',
    predefined: [],
    isLoading: false,
    addDatepicker: false,
    datepickerCallback: () => null,
    clearInputButton: () => null,
    isLoadingContent: () => 'LOADING',
    name: '',
    filterTitle: '',
    initialText: '',
    searchInputPlaceholderText: '',
    groupSelection: null,
    addFilter: null,
    groupSelectionCB: () => false,
    PredefinedFilterComponent: PredefinedFilter,
    DateRangePickerComponent: DateRangePicker,
  };

  defaultProps: DefaultPropsType;

  timer = null;

  state: StateType;

  reactDropdown: HTMLElement;

  timerDp: any;

  static getDerivedStateFromProps(props, state) {
    if (state.value !== props.forceValue && props.forceValue) {
      return { isEmpty: !props.forceValue, value: props.forceValue };
    }
    return null;
  }

  constructor(props: PropsType) {
    super(props);
    const defaultGrouping =
      (props.groupSelection &&
        props.groupSelection
          .filter(item => item.default && item.default === true)
          .reduce((pv, cv) => cv, null)) ||
      null;
    this.state = {
      value: this.props.initialText,
      grouping: defaultGrouping,
      isEmpty: !this.props.initialText,
    };
    this.timerDp = null;
    this.reactDropdown = React.createRef();
  }

  setPredefined = (value: string) => {
    const searchQuery = `${value}`;
    this.setState({
      value: searchQuery,
      isEmpty: !value,
    });
    this.handlePropogation(value);
  };

  handleChange = (event?: Object, setValue?: string) => {
    const value = setValue !== undefined ? setValue : event.target.value;
    this.setState({
      value,
      isEmpty: !value,
    });
    this.handlePropogation(value);
  };

  updateGrouping = selection => {
    this.setState({
      grouping: selection,
    });
    this.props.groupSelectionCB(selection.value);
  };

  toggleFilter = (isOpen: boolean) => {
    if (isOpen) {
      this.startListener();
    } else {
      this.killListener();
    }
  };

  killListener = (): any =>
    document.removeEventListener('click', this.listenerAction);

  startListener = (): any =>
    document.addEventListener('click', this.listenerAction);

  clearInput = (e: Object): any => {
    e.preventDefault();
    return this.handleChange(e, '');
  };

  datepickerChanged = ({ start, end }: Object): any => {
    if ((start && end) || (!start && !end)) {
      clearTimeout(this.timerDp);

      this.timerDp = setTimeout((): any => {
        this.setState(prevState => ({
          ...prevState,
        }));

        return this.props.datepickerCallback({ start, end });
      }, 300);
    }
    return { start, end };
  };

  listenerAction = (event: Object) => {
    if (
      this.reactDropdown.current &&
      !this.reactDropdown.current.contains(event.target)
    ) {
      this.toggleFilter();
    }

    if (!this.reactDropdown) {
      this.killListener();
    }
  };

  componentWillUnmount = () => {
    this.killListener();
  };

  handlePropogation(data: string): boolean {
    return this.props.callback(data);
  }

  render(): React$Element<*> {
    const {
      name,
      filterTitle,
      baseClass,
      addFilter,
      predefined,
      searchInputLabel,
      searchInputPlaceholderText,
      clearInputButton,
      isLoadingContent,
      isLoading,
      groupSelectionLabel,
      groupSelection,
      datePickerLabel,
      PredefinedFilterComponent,
      DateRangePickerComponent,
    } = this.props;
    return (
      <div className={baseClass}>
        {filterTitle ? (
          <span className={`${baseClass}__title`}>{filterTitle}</span>
        ) : null}
        <div className={`${baseClass}__filter`}>
          {predefined && predefined.length ? (
            <PredefinedFilterComponent
              dropdownRef={this.reactDropdown}
              onToggle={this.toggleFilter}
              options={predefined}
              onSelect={this.setPredefined}
            />
          ) : (
            <div className={`${baseClass}__item--hidden`} />
          )}
          <div className={`${baseClass}__item__container`}>
            <label htmlFor="filter_text" className="form__label--small">
              {searchInputLabel}
            </label>
            <div className={`${baseClass}__item__container__input`}>
              <input
                name="filter_text"
                type="text"
                value={this.state.value}
                placeholder={searchInputPlaceholderText}
                onChange={this.handleChange}
                className="form__input"
                data-qe-id={`${name}-table-search-field`}
              />
              <span
                className={`${baseClass}__item__container__input__appendage`}>
                {clearInputButton({
                  onClick: this.clearInput,
                  isEmpty: this.state.isEmpty,
                })}
              </span>

              <span
                data-qe-id="loading-indicator"
                className={`${baseClass}__item__container__input__suffix`}>
                {isLoading ? isLoadingContent() : null}
              </span>
            </div>
          </div>
          {addFilter ? (
            <div className={`${baseClass}__item`}>
              {addFilter({
                action: this.handlePropogation,
              })}
            </div>
          ) : null}
        </div>
        {this.props.addDatepicker ? (
          <div className={`${baseClass}__date-picker`}>
            <label htmlFor="_" className="form__label--small">
              {datePickerLabel}
            </label>
            <div className={`${baseClass}__item__input`}>
              <DateRangePickerComponent
                datepickerChanged={this.datepickerChanged}
              />
            </div>
          </div>
        ) : null}
        {groupSelection ? (
          <div className={`${baseClass}__group-selection`}>
            <label htmlFor="_" className="form__label--small">
              {groupSelectionLabel}
            </label>
            <div className={`${baseClass}__item__input`}>
              <SimpleSelect
                onChange={this.updateGrouping}
                value={this.state.grouping}
                options={groupSelection}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Filter;
