import React, { Component, Fragment } from 'react';
import SelectRows from '../SelectRows/index';

type SelectorObj = {
  selector: any,
  selectorProps: Object,
};

type MultiLineSelectProps = {
  /** An object with the following PropShape:
   * --
   *- `selector`: `Custom Component`passed down that receives props
   *- `title`: title for custom component
   *- `isSelectorActive`: indicates whether Selector is active or not,
   *- `toggleSelector`: toggles visibility of selector,
   *- `addItem`: add item to selection
   * `selectorProp`: initial props passed down for custom component selector,
   * */
  selectorObj: Object<SelectorObj>,
  /** `placeholder` acts as title for CustomSelector and placeholder `SelectRow` */
  placeholder?: string,
  /** if true the single prop for `SelectRows` is false */
  multiline?: boolean,
  /** callback function triggered when row is add. the parameter for this function
   * contains `this.state.rows` which is the data present from selector */
  onChange?: Function,
  /** if this prop has a value, then this passed into the prop `rows` of
   * `<SelectRows>` instead of `state.rows` */
  displayData?: null | [{ key: string, value: string }],
  /** Identifier for row items */
  keyField?: string,
  /** Base class name root div in this component */
  baseClassName?: string,
  /** Row class name for `RowSelect` */
  rowClassName?: string,
};

/**
 * MultiLineSelect
 * show one or many rows that are removable - top one is always 'addable' in multi-mode
 * add button triggers onAdd, remove button triggers onRemove
 */
class MultiLineSelect extends Component<MultiLineSelectProps> {
  static defaultProps = {
    placeholder: '',
    multiline: false,
    onChange: () => false,
    displayData: null,
    keyField: 'id',
    baseClassName: 'multiline-select',
    rowClassName: 'select-rows',
  };

  constructor(props: MultiLineSelectProps) {
    super(props);
    this.state = {
      selectListVisible: false,
      selection: props.defaultValue ? [props.defaultValue] : [],
    };
  }

  handleChange = rows => this.props.onChange(rows);

  removeItem = key => {
    this.setState(prevState => {
      const keyIndex = prevState.selection.findIndex(
        item => item[this.props.keyField] === key,
      );
      const newSelection = [...prevState.selection];
      newSelection.splice(keyIndex, 1);
      this.handleChange(newSelection);
      return { ...prevState, selection: newSelection };
    });
  };

  addItem = row => {
    this.setState(prevState => {
      const newSelection = [...prevState.selection].concat(row);
      this.handleChange(newSelection);
      return {
        ...prevState,
        selection: newSelection,
      };
    });
  };

  toggle = stateProp =>
    this.setState(prevState => ({
      ...prevState,
      [stateProp]: !prevState[stateProp],
    }));

  showList = () => {
    this.toggle('selectListVisible');
  };

  render = () => {
    const {
      selectorObj: { selector: Selector, selectorProps = {} },
      placeholder,
      multiline,
      displayData,
    } = this.props;

    const combinedSelectorProps = {
      ...selectorProps,
      ...{
        title: placeholder,
        isSelectorActive: this.state.selectListVisible,
        toggleSelector: () => this.toggle('selectListVisible'),
        addItem: this.addItem,
      },
    };

    return (
      <Fragment>
        <div className={this.props.baseClassName}>
          <SelectRows
            single={!multiline}
            rows={
              displayData ||
              this.state.selection.map((item, key) => ({
                key: `${this.props.keyField}-${key}`,
                value: item,
              }))
            }
            onAddClick={() => this.showList()}
            onRemoveClick={key => this.removeItem(key)}
            rowClassName={this.props.rowClassName}
            placeholder={placeholder}
          />
        </div>
        <Selector {...combinedSelectorProps} />
      </Fragment>
    );
  };
}

export default MultiLineSelect;
