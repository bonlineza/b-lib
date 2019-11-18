import constrainSearch, { sanitizeInputForConstraints } from './constrainable';

describe('Constrainable', () => {
  describe('constrainSearch', () => {
    it('formats a single constraint', () => {
      const expectedResult = 'constraint[variable1]=value1';
      expect(constrainSearch('variable1:value1')).toBe(expectedResult);
    });
    it('formats multiple same constraints', () => {
      const expectedResult =
        'constraint[variable1][v][0]=value1&constraint[variable1][v][1]=value2';
      expect(constrainSearch('variable1:value1,value2')).toBe(expectedResult);
    });
    it('formats multiple different constraints', () => {
      const expectedResult =
        'constraint[variable1]=value1&constraint[variable2]=value2';
      expect(constrainSearch('variable1:value1 variable2:value2')).toBe(
        expectedResult,
      );
    });
    it('formats multiple constraints also using operators', () => {
      const expectedResult =
        'constraint[variable1][op]=>&constraint[variable1][v]=value1&constraint[variable2][op]=<>&constraint[variable2][v]=first,second';
      expect(
        constrainSearch('variable1:>value1 variable2:<>first,second'),
      ).toBe(expectedResult);
    });
  });

  describe('sanitizeInputForConstraints', () => {
    it('turns a string into an array, separating string search and constraints', () => {
      const expectedValue = [
        'someKey:anotherValue anotherKey:some spaced values',
        'anotherSeparateValue',
      ];
      expect(
        sanitizeInputForConstraints(
          'someKey:anotherValue anotherKey:"some spaced values" anotherSeparateValue',
        ),
      ).toStrictEqual(expectedValue);
    });
  });
});
