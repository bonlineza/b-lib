import constrainSearch, {
  sanitizeInputForConstraints,
} from './util/constrainable';
import { getMoment, parseDate } from './util/dates';
import flattenObject from './util/flattenObject';
import getTokenFromStorage from './util/getToken';
import hasOwn from './util/hasOwn.func';
import smoothScrollTo, { scrollToSelector } from './util/smoothScrollTo';
import stringOccurances from './util/stringOccurances';
import validateEmail from './util/validateEmail';
import validatePhone from './util/validatePhone';
import validateWebsite from './util/validateWebsite';

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
};
