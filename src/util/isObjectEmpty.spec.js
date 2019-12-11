import isObjectEmpty from './isObjectEmpty';

describe('isObjectEmpty', () => {
  it('function isObjectEmpty with "{}" as a parameter should return true', () => {
    expect(isObjectEmpty({})).toBe(true);
  });

  it('function isObjectEmpty with "{ isSad: false }" as a parameter should return true', () => {
    expect(isObjectEmpty({ isSad: false })).toBe(false);
  });
});
