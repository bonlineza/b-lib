import removeKeyFromObject from './removeKeyFromObject';

describe('removeKeyFromObject', () => {
  it('object has a key removed successfuly', () => {
    expect(
      JSON.stringify(
        removeKeyFromObject('somekey', { somekey: 'value', otherkey: 'value' }),
      ),
    ).toBe(JSON.stringify({ otherkey: 'value' }));
  });
});
