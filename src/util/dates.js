import moment from 'moment';

// TODO: add thin wrapper to project at app level
// import {setLocale} helpers/dates
// import {getLocale} helpers/locale
// setLocale(getLocale)

class MomentWrapper {
  static momentInstance;

  static getInstance(locale: string): Object {
    if (!this.momentInstance) {
      if (locale) moment.locale(locale);
      this.momentInstance = moment;
    }
    return this.momentInstance;
  }

  static setLocale(l: string) {
    this.getInstance().locale(l);
  }
}

export function getMoment(locale): any {
  return MomentWrapper.getInstance(locale);
}

export function setLocale(): any {
  return MomentWrapper.setLocale();
}

/**
 * Formats a Unix timestamp to a Date string
 * @param {*} item - the date to be formatted in Unix epoch seconds
 * @param {*} dateFormat - the Moment DateFormat to be applied - default: L
 */
export function parseDate(
  item: mixed = moment().unix(),
  dateFormat: string = 'L',
): string {
  return item
    ? MomentWrapper.getInstance()
        .unix(item)
        .format(dateFormat)
        .toString()
    : '-';
}
