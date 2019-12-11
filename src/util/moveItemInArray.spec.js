import moveItemInArray from './moveItemInArray';

const testArray = ['lion', 'tiger', 'cheetah', 'sabre-tooth'];

describe('moveItemInArray', () => {
  it(`newArray[3] will be "lion" and newArray[2] will be "sabre-tooth"`, () => {
    const newArray = moveItemInArray(testArray, 0, 3);
    expect(newArray[2]).toBe('sabre-tooth');
    expect(newArray[3]).toBe('lion');
  });
});
