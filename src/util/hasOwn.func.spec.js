import hasOwn from './hasOwn.func';

describe('hasOwn', () => {
  it('empty object will return false', () => {
    const expectedResult = false;
    expect(hasOwn({}, 'someKey')).toBe(expectedResult);
  });
  it('object with named key will return true', () => {
    const expectedResult = true;
    expect(hasOwn({ someKey: 'value' }, 'someKey')).toBe(expectedResult);
  });
});
