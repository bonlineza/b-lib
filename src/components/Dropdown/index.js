/** @format */

// @flow
/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { Select } from 'semantic-ui-react';

type OptsObjectType = {
  label: string,
  val: string,
};

type OptsType = Array<OptsObjectType>;

const Dropdown = ({
  title,
  opts,
}: {
  title: string,
  opts: OptsType,
}): React$Element<*> => {
  const options = opts.map(
    (v: OptsObjectType): { key: string, value: string } => ({
      key: v.val,
      value: v.label,
    }),
  );
  return (
    <div>
      <Select placeholder={title} options={options} />
    </div>
  );
};

export default Dropdown;
