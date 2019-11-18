import validatePhone from './validatePhone';

describe('validatePhone', () => {
  it('simple string will return false', () => {
    const expectedResult = false;
    expect(validatePhone('blah')).toBe(expectedResult);
  });
  it('a string with 9 numbers will fail', () => {
    const expectedResult = false;
    expect(validatePhone('123456789')).toBe(expectedResult);
  });
  it('a string with 11 numbers and a + will pass', () => {
    const expectedResult = true;
    expect(validatePhone('+12345678901')).toBe(expectedResult);
  });
});
