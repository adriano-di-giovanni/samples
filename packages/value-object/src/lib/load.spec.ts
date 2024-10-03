import { Load } from './load';

describe(Load.name, () => {
  it('should throw when weight is negative', () => {
    expect(() => new Load(-1)).toThrow(RangeError);
  });
});
