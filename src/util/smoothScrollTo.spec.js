import smoothScrollTo, { scrollToSelector } from './smoothScrollTo';

describe('smoothScrollTo', () => {
  it('function will return undefined as it only produces side-effects', () => {
    const expectedResult = undefined;
    expect(smoothScrollTo()).toBe(expectedResult);
  });
});
describe('scrollToSelector', () => {
  it('function will return undefined as it only produces side-effects', () => {
    const expectedResult = undefined;
    expect(scrollToSelector()).toBe(expectedResult);
  });
});
