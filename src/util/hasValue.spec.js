import hasValue from './hasValue';

describe('hasValue', () => {
  it('function hasValue with 21345 as a parameter should return true', () => {
    expect(hasValue(21345)).toBe(true);
  });

  it('function hasValue with undefined as a parameter should return false', () => {
    expect(hasValue(undefined)).toBe(false);
  });

  it('function hasValue with 1 as a parameter should return true', () => {
    expect(hasValue(1)).toBe(true);
  });

  it('function hasValue with 0 as a parameter should return true', () => {
    expect(hasValue(0)).toBe(true);
  });
});
