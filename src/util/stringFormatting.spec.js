import {
  replaceUnderscoreWithSpace,
  toTitleCase,
  snakeCaseToTitleCase,
  removeWhiteSpaces,
} from './stringFormatting';

describe('replaceUnderscoreWithSpace', () => {
  it('function takes "fatty_pants" and returns "fatty pants"', () => {
    expect(replaceUnderscoreWithSpace('fatty_pants')).toBe('fatty pants');
  });
});

describe('toTitleCase', () => {
  it('function takes "fatty pants" as a parameter returns "Fatty Pants" ', () => {
    expect(toTitleCase('fatty pants')).toBe('Fatty Pants');
  });
});

describe('snakeCaseToTitleCase', function() {
  it('function takes "fatty_pants" as a parameter returns "Fatty Pants" ', () => {
    expect(snakeCaseToTitleCase('fatty_pants')).toBe('Fatty Pants');
  });
});

describe('removeWhiteSpaces', () => {
  it('function accepts "leave days" returns "leavedays', () => {
    expect(removeWhiteSpaces('leave days')).toBe('leavedays');
  });
});
