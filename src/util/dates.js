import moment from 'moment';
/**
 * @class MomentWrapper
 * @description Singleton convenience class wrapper for the 'moment' library
 */
class MomentWrapper {
  static momentInstance;

  /**
   * Returns the Moment instance and sets the locale on it
   * @param {string} locale the locale to use when getting the Moment instance
   */
  static getInstance(locale: string): Object {
    if (!this.momentInstance) {
      if (locale) moment.locale(locale);
      this.momentInstance = moment;
    }
    return this.momentInstance;
  }

  /**
   * sets or changes the locale of the current Moment instance
   * @param {string} locale the locale to use when getting the Moment instance
   */
  static setLocale(locale: string) {
    this.getInstance().locale(locale);
  }
}

/**
 * Returns the Moment instance and sets the locale on it
 * @param {string} locale the locale to use when getting the Moment instance
 */
export function getMoment(locale: string): any {
  return MomentWrapper.getInstance(locale);
}

/**
 * Formats a Unix timestamp to a Date string
 * @param {number} item - the Unix epoch number to be formatted
 * @param {string} dateFormat - the Moment DateFormat to be applied - default: L
 */
export function parseDate(
  item: number = moment().unix(),
  dateFormat: string = 'L',
): string {
  return item
    ? MomentWrapper.getInstance()
        .unix(item)
        .format(dateFormat)
        .toString()
    : '-';
}
