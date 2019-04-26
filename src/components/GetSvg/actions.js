/** @format */

import dompurify from 'dompurify';

import constants from './constants';
import axios from '../../helpers/axios';

let purify = null;
if (typeof window !== 'undefined') {
  purify = dompurify(window);
}

let cache = [];
const { ADD_SVG_TO_STORE } = constants;

export function addSvgToStore(name, html) {
  return {
    type: ADD_SVG_TO_STORE,
    data: {
      name,
      html: purify ? purify.sanitize(html) : '',
    },
  };
}

export function fetchSvgFromStorage(name, dispatch) {
  if (!cache.includes(name)) {
    cache = [...cache, name];

    axios
      .get(`/svgs/${name}.svg`)
      .then(res => {
        dispatch(addSvgToStore(name, res.data));
      })
      .catch(() => true);
  }

  return name;
}
