/** @format */

import { createContext } from 'react';

const defaultContext = {
  fetching: false,
  failed: false,
  success: false,
  message: '',
  data: {},
  error: false,
};

export default createContext(defaultContext);
