import { Load } from './load';
import { Weight } from './weight';

export class Elevator {
  private readonly loads: Load[] = [];

  constructor(readonly capacity: Weight) {}

  boardLoad(load: Load): void {
    const currentLoadWeight = this.calculateLoadWeight();
    const projectedLoadWeight = currentLoadWeight.add(load.weight);
    if (projectedLoadWeight.isGreaterThan(this.capacity)) {
      throw new RangeError('Load weight exceeds elevator capacity');
    }
    this.loads.push(load);
  }

  calculateLoadWeight(): Weight {
    return this.loads.reduce(
      (loadWeight, load) => loadWeight.add(load.weight),
      this.capacity.zero()
    );
  }
}
