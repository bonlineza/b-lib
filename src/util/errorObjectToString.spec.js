import errorObjectToString from './errorObjectToString';

describe('errorObjectToString', () => {
  it('will return string of the value', () => {
    const testObj = { firstName: 'First name required' };
    const expectedResult = 'firstName: First name required';
    expect(errorObjectToString(testObj)).toBe(expectedResult);
  });

  it('will return the values of object as string', () => {
    const testObj = {
      firstName: 'First name required',
      lastName: 'Field is required',
    };
    const expectedResult =
      'firstName: First name required; lastName: Field is required';
    expect(errorObjectToString(testObj)).toBe(expectedResult);
  });

  it('will return the values of object as string even if have array of errors', () => {
    const testObj = {
      firstName: ['First name required', 'Must be string not a number'],
      lastName: 'Field is required',
    };
    const expectedResult =
      'firstName: First name required, Must be string not a number; lastName: Field is required';
    expect(errorObjectToString(testObj)).toBe(expectedResult);
  });
});
