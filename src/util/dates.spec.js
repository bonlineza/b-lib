import moment from 'moment';
import { getMoment, parseDate } from './dates';

describe('dates', () => {
  describe('getMoment', () => {
    it('getMoment and "moment" instances are the same', () => {
      const expectedResult = moment;
      expect(getMoment()).toBe(expectedResult);
    });
  });

  describe('parseDate', () => {
    it('parses a unix epoch (seconds) number to a date string', () => {
      const expectedValue = '11/18/2019';
      expect(parseDate(1574078298)).toBe(expectedValue);
    });
    it('parses a unix epoch (seconds) number to a date string with Long form format', () => {
      const expectedValue = 'November 18, 2019';
      expect(parseDate(1574078298, 'LL')).toBe(expectedValue);
    });
    it('a non truthy input will result in a "-"', () => {
      const expectedValue = '-';
      expect(parseDate(null, 'LL')).toBe(expectedValue);
    });
  });
});
