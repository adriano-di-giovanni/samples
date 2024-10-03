import { Load } from './load';

export class Elevator {
  private readonly loads: Load[] = [];

  constructor(readonly capacity: number) {
    if (capacity < 0) {
      throw new RangeError('Capacity must be greater than or equal to 0');
    }
  }

  boardLoad(load: Load): void {
    const currentLoadWeight = this.calculateLoadWeight();
    const projectedLoadWeight = currentLoadWeight + load.weight;
    if (projectedLoadWeight > this.capacity) {
      throw new RangeError('Load weight exceeds elevator capacity');
    }
    this.loads.push(load);
  }

  calculateLoadWeight(): number {
    return this.loads.reduce((loadWeight, load) => loadWeight + load.weight, 0);
  }
}
