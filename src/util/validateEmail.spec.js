import validateEmail from './validateEmail';

describe('validateEmail', () => {
  it('simple string will return false', () => {
    const expectedResult = false;
    expect(validateEmail('blah')).toBe(expectedResult);
  });
  it('basic email will return true', () => {
    const expectedResult = true;
    expect(validateEmail('asd@asd.asd')).toBe(expectedResult);
  });
  it('complex email will return true', () => {
    const expectedResult = true;
    expect(validateEmail('asd.asd@asd.asd.asd')).toBe(expectedResult);
  });
  it('a space will fail the evaluation', () => {
    const expectedResult = false;
    expect(validateEmail('asd.asd@ asd.asd.asd')).toBe(expectedResult);
  });
});
