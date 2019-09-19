import React, { useState } from 'react';

type OptionShape = {
  text: string,
  value: string,
};

type PredefinedFilterProps = {
  dropdownRef: any,
  onToggle: Function,
  options: OptionShape[],
  onSelect: Function,
  baseClass?: string,
  filterButtonContent?: Function,
};

const PredefinedFilter = ({
  dropdownRef,
  onToggle,
  options,
  onSelect,
  baseClass = 'list-filter__item',
  filterButtonContent = () => 'Filter',
}: PredefinedFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerToggle = e => {
    if (e) e.preventDefault();
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const filterSelected = (event: Event, value: string) => {
    event.preventDefault();
    onSelect(value);
    triggerToggle();
  };

  return (
    <div
      className={`${baseClass}--predefined
    ${isOpen ? 'is-open' : ''}
  `}>
      <div className={`${baseClass}__filter-btn-container`}>
        <button
          type="button"
          ref={dropdownRef}
          className={`${baseClass}__filter-btn`}
          onClick={e => triggerToggle(e)}>
          {filterButtonContent()}
        </button>
      </div>
      <div className={`${baseClass}__filter-collapsable`}>
        {options.map((v: { text: string, value: string }, vk: number) => (
          <div className={`${baseClass}__filter-collapsable__item`} key={vk}>
            <button
              onClick={e => filterSelected(e, v.value)}
              className={`${baseClass}__filter-collapsable__item__btn`}
              type="button">
              {v.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

PredefinedFilter.defaultProps = {
  baseClass: 'list-filter__item',
  filterButtonContent: () => null,
};

export default PredefinedFilter;
