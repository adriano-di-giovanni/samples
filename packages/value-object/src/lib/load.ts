export class Load {
  constructor(readonly weight: number) {
    if (weight < 0) {
      throw new RangeError('Weight must be greater than or equal to 0');
    }
  }
}
