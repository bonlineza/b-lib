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
  centered: boolean,
  addDatepicker: boolean,
};

type PropsType = {
  callback: Function,
  addFilter?: Function,
  centered?: boolean,
  isLoading?: boolean,
  predefined?: Array<{
    text: string,
    value: string,
  }>,
  addDatepicker?: boolean,
  datepickerCallback?: Function,
  clearInputButtonContent?: Function,
  title?: string,
  initialText?: string,
  searchInputPlaceholderText?: string,
  groupSelection?: Object[],
  debounce?: number,
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
    centered: false,
    addDatepicker: false,
    datepickerCallback: () => null,
    clearInputButtonContent: () => null,
    name: '',
    title: '',
    initialText: '',
    searchInputPlaceholderText: '',
    groupSelection: null,
    addFilter: null,
    request: {
      success: true,
      error: false,
      loading: false,
    },
    debounce: 300,
  };

  defaultProps: DefaultPropsType;

  timer = null;

  state: StateType;

  reactDropdown: HTMLElement;

  timerDp: any;

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
      isPredefOpen: false,
      isEmpty: !this.props.initialText,
    };
    this.timerDp = null;
    this.reactDropdown = React.createRef();
  }

  setPredefined = (value: string) => {
    this.setState({
      isEmpty: !value,
    });
    this.handlePropogation(value);
  };

  handleChange = (event?: Object, setValue?: string) => {
    const value = setValue !== undefined ? setValue : event.target.value;
    this.setState({
      // value,
      isEmpty: value === '',
    });
    if (this.props.debounce) {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        (): boolean => this.handlePropogation(value),
        300,
      );
    } else {
      this.handlePropogation(value);
    }
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

  closeFilter = (): any => this.setState({ isPredefOpen: false });

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
      this.closeFilter();
    }

    if (!this.reactDropdown) {
      this.killListener();
    }
  };

  handlePropogation(data: string): boolean {
    return this.props.callback(data);
  }

  render(): React$Element<*> {
    const filterFraction =
      this.props.addDatepicker && this.props.groupSelection ? 3 : 2;
    const {
      name,
      title,
      baseClass,
      predefined,
      searchInputLabel,
      searchInputPlaceholderText,
      clearInputButtonContent,
      isLoadingContent,
      isLoading,
      groupSelectionLabel,
      groupSelection,
      datePickerLabel,
    } = this.props;
    return (
      <div className={`gw${this.props.centered ? '--center' : ''}`}>
        <div className={`g g-1/${filterFraction}`}>
          <div className={baseClass}>
            {title ? (
              <span className={`${baseClass}__title`}>{title}</span>
            ) : null}
            {predefined && predefined.length ? (
              <PredefinedFilter
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
                {!this.state.isEmpty ? (
                  <span
                    className={`${baseClass}__item__container__input__appendage`}>
                    <button
                      type="button"
                      onClick={this.clearInput}
                      className="btn--text">
                      {clearInputButtonContent()}
                    </button>
                  </span>
                ) : null}
                <span
                  data-qe-id="loading-indicator"
                  className={`${baseClass}__item__container__input__suffix`}>
                  {isLoading ? isLoadingContent() : null}
                </span>
              </div>
            </div>
            {this.props.addFilter ? (
              <div className={`${baseClass}__item`}>
                {this.props.addFilter({
                  action: this.props.callback,
                })}
              </div>
            ) : null}
          </div>
        </div>
        {this.props.addDatepicker ? (
          <div className="g g--auto">
            <div className="pos-relative">
              <label htmlFor="_" className="form__label--small">
                {datePickerLabel}
              </label>
              <div className={`${baseClass}__item__input push--small--bottom`}>
                <DateRangePicker datepickerChanged={this.datepickerChanged} />
              </div>
            </div>
          </div>
        ) : null}
        {groupSelection ? (
          <div className="g g--auto">
            <div className="pos-relative">
              <label htmlFor="_" className="form__label--small">
                {groupSelectionLabel}
              </label>
              <div className={`${baseClass}__item__input push--small--bottom`}>
                <SimpleSelect
                  onChange={this.updateGrouping}
                  value={this.state.grouping}
                  options={groupSelection}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Filter;
