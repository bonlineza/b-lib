import React, { useState, useRef, useEffect, useCallback } from 'react';

type OptionShape = {
  text: string,
  value: string,
};

type PredefinedFilterProps = {
  options: OptionShape[],
  onSelect: Function,
  baseClass?: string,
  filterButtonContent?: Function,
};

const PredefinedFilter = ({
  options,
  onSelect,
  baseClass,
  filterButtonContent,
}: PredefinedFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const listenerAction = useCallback(
    event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  const killListener = useCallback(
    (): any => document.removeEventListener('click', listenerAction),
    [listenerAction],
  );

  const startListener = useCallback(
    (): any => document.addEventListener('click', listenerAction),
    [listenerAction],
  );

  useEffect(() => {
    if (isOpen) {
      startListener();
    }
    return () => {
      killListener();
    };
  }, [isOpen, startListener, killListener]);

  const filterSelected = (event: Event, value: string) => {
    event.preventDefault();
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`${baseClass}--predefined
      ${isOpen ? 'is-open' : ''}
    `}>
      <div className={`${baseClass}__filter-btn-container`}>
        <button
          type="button"
          className={`${baseClass}__filter-btn`}
          onClick={() => setIsOpen(!isOpen)}>
          {filterButtonContent()}
        </button>
      </div>
      <div ref={dropdownRef} className={`${baseClass}__filter-collapsable`}>
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
  filterButtonContent: () => 'Filters',
};

export default PredefinedFilter;
