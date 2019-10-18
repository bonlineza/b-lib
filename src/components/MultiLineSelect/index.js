import React, { Component, Fragment } from 'react';
import SelectRows from '../SelectRows/index';

/**
 * Description
 * show one or many rows that are removable - top one is always 'addable' in multi-mode
 * add button triggers onAdd, remove button triggers onRemove
 */

type MultiLineSelectProps = {
  selectorObj?: Object,
  label: string,
  placeholder: string,
  viewOnly: boolean,
  hasError: boolean,
  errors?: [],
  multiline: boolean,
  onChange?: Function,
  displayData?: null | [{ key: String, value: String }],
  keyField?: string,
  baseClassName?: string,
};

class MultiLineSelect extends Component {
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

MultiLineSelect.defaultProps = {
  default: {},
  multiline: false,
  onChange: () => false,
  displayData: null,
  keyField: 'id',
  baseClassName: 'multiline-select',
  rowClassName: 'select-rows',
};

export default MultiLineSelect;
