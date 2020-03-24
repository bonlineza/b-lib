import constrainSearch, {
  sanitizeInputForConstraints,
} from './util/constrainable';
import { usePrevious } from './util/usePrevious';
import { getMoment, parseDate } from './util/dates';
import flattenObject from './util/flattenObject';
import getTokenFromStorage from './util/getToken';
import hasOwn from './util/hasOwn.func';
import hasValue from './util/hasValue';
import smoothScrollTo, { scrollToSelector } from './util/smoothScrollTo';
import stringOccurances from './util/stringOccurances';
import validateEmail from './util/validateEmail';
import validatePhone from './util/validatePhone';
import validateWebsite from './util/validateWebsite';
import debounced from './util/debounced';
import isObjectEmpty from './util/isObjectEmpty';
import moveItemInArray from './util/moveItemInArray';
import removeKeyFromObject from './util/removeKeyFromObject';
import {
  snakeCaseToTitleCase,
  toTitleCase,
  replaceUnderscoreWithSpace,
  removeWhiteSpaces,
} from './util/stringFormatting';

export {
  constrainSearch,
  sanitizeInputForConstraints,
  parseDate,
  getMoment,
  flattenObject,
  getTokenFromStorage,
  hasOwn,
  smoothScrollTo,
  scrollToSelector,
  stringOccurances,
  validateEmail,
  validatePhone,
  validateWebsite,
  debounced,
  hasValue,
  isObjectEmpty,
  moveItemInArray,
  removeKeyFromObject,
  snakeCaseToTitleCase,
  toTitleCase,
  replaceUnderscoreWithSpace,
  removeWhiteSpaces,
  usePrevious,
};
