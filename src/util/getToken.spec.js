import getToken from './getToken';

describe('getToken', () => {
  it('in jest the result will be null', () => {
    const expectedResult = null;
    expect(getToken()).toBe(expectedResult);
  });
});
