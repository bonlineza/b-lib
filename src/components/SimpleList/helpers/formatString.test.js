import React from 'react';
import 'test-util/setup';
import { formatString } from './formatString';

const TestSvgComponent = ({ svg, wrapperClass }) => (
  <div className={wrapperClass}>{svg}</div>
);

describe('Format Strings', () => {
  describe('Given', () => {
    it('\\:d prepended to a unix timestamp will result in a longform date', () => {
      expect(formatString('\\:d1519211809')).toBe('02/21/2018');
    });
    it('\\:c prepended to a cent value of a number will result in a formatted currency string', () => {
      expect(formatString('\\c:123366')).toBe('$ 123,366');
    });
    it('\\:my-svg|my-class\\: will result in the SvgComponent being rendered', () => {
      const comp = formatString('\\:my-svg|my-class\\:', TestSvgComponent);
      expect(comp.props.svg).toBe('my-svg');
      expect(comp.props.wrapperClass).toBe('my-class');
    });
    it('\\*some-string\\* will result in a "some-string" being wrapped in a bolding span', () => {
      const comp = formatString('\\*some-string\\*');
      expect(comp.type).toBe('span');
      expect(comp.props.className).toBe('fw--bold');
      expect(comp.props.children).toBe('some-string');
    });
    it('anything else than a string - will simply return the value', () => {
      const testVal = [];
      expect(formatString(testVal)).toBe(testVal);
    });
  });
});
