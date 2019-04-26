/** @format */

// @flow
import constants from './constants';

const { ADD_SVG_TO_STORE, LOADING_SVG } = constants;

const initialState = {
  angledown: '',
  angleleft: '',
  angleright: '',
  angleup: '',
  building: '',
  caretdown: '',
  circle_check: '',
  circle_clear: '',
  circle_info: '',
  circle_minus: '',
  circle_plus: '',
  circle_section: '',
  circle_user: '',
  close: '',
  contractor: '',
  dashboard: '',
  filter_menu: '',
  filter: '',
  house: '',
  job: '',
  map_pin: '',
  menu: '',
  object: '',
  scale: '',
  search: '',
  settings: '',
  star_empty: '',
  star_full: '',
  thumbs_up: '',
  user: '',
  view: '',
  spin: '',
  'symbol-file': '',
};

type StateShape = { [string]: any };

type PropsShape = {
  type: string,
  data: any,
};

export default function getSvgReducer(
  state: StateShape = initialState,
  { type, data }: PropsShape,
): StateShape {
  switch (type) {
    case ADD_SVG_TO_STORE:
      return {
        ...state,
        ...{ [data.name]: data.html },
      };
    case LOADING_SVG:
      return {
        ...state,
        ...{ [data.name]: '' },
      };
    default:
      return state;
  }
}
