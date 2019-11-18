import flattenObject from './flattenObject';

describe('flattenObject', () => {
  it('flatten object that contains single key:value pair', () => {
    const expectedResult = {
      'prefixKey[variable1]': 'value1',
    };
    expect(flattenObject({ variable1: 'value1' }, 'prefixKey')).toStrictEqual(
      expectedResult,
    );
  });
  it('flatten object that contains multiple nested key:value pairs', () => {
    const expectedResult = {
      'prefixKey[variable1][op]': 'xyz',
      'prefixKey[variable1][v][0]': 'value1',
      'prefixKey[variable1][v][1]': 'value2',
    };
    expect(
      flattenObject(
        { variable1: { op: 'xyz', v: { '0': 'value1', '1': 'value2' } } },
        'prefixKey',
      ),
    ).toStrictEqual(expectedResult);
  });
});
