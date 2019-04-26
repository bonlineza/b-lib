import React from 'react';
import Select from 'react-virtualized-select';
import l from 'helpers/locale';

const VirtualizedSelect = props => (
  <Select
    placeholder={l('SELECT-placeholder')}
    className="allianz-selector"
    classNamePrefix="allianz__"
    {...props}
  />
);

export default VirtualizedSelect;
