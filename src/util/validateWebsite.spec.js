import validateWebsite from './validateWebsite';

describe('validateWebsite', () => {
  it('simple string will fail', () => {
    const expectedResult = false;
    expect(validateWebsite('blah')).toBe(expectedResult);
  });
  it('basic wensite will pass', () => {
    const expectedResult = true;
    expect(validateWebsite('mysite.com')).toBe(expectedResult);
  });
  it('complex website will pass', () => {
    const expectedResult = true;
    expect(validateWebsite('mysub.mysite.sub.co')).toBe(expectedResult);
  });
  it('complex website with http will pass', () => {
    const expectedResult = true;
    expect(validateWebsite('http://mysub.mysite.sub.co')).toBe(expectedResult);
  });
});
