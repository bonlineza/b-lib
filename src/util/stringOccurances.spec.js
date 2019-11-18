import stringOccurances from './stringOccurances';

describe('stringOccurances', () => {
  it('count a single occurance of a string', () => {
    const expectedResult = 1;
    expect(stringOccurances('the quick brown fox', 'ick')).toBe(expectedResult);
  });
  it('count multiple occurances of a string', () => {
    const expectedResult = 3;
    expect(stringOccurances('quickly the stick flew at the brick', 'ick')).toBe(
      expectedResult,
    );
  });
  it('count multiple occurances of a string with overlapping', () => {
    const expectedResult = 3;
    expect(stringOccurances('brbrbrbr', 'brb', true)).toBe(expectedResult);
  });
});
