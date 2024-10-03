import { Elevator } from './elevator';
import { Load } from './load';

describe(Elevator.name, () => {
  it('should throw a RangeError when attempting to create an elevator with negative capacity', () => {
    expect(() => new Elevator(-1)).toThrow(RangeError);
  });

  it('should successfully create an elevator with a valid capacity', () => {
    const capacity = 400;
    const elevator = new Elevator(capacity);
    expect(elevator).toBeDefined();
    expect(elevator.capacity).toEqual(capacity);
  });

  it('should initialize with a load weight of 0', () => {
    const elevator = new Elevator(400);
    expect(elevator.calculateLoadWeight()).toEqual(0);
  });

  it('should correctly calculate the load weight after a single load is boarded', () => {
    const load = new Load(50);
    const elevator = new Elevator(400);
    elevator.boardLoad(load);
    expect(elevator.calculateLoadWeight()).toEqual(load.weight);
  });

  it('should correctly calculate the load weight after multiple loads are boarded', () => {
    const load1 = new Load(50);
    const load2 = new Load(65);
    const elevator = new Elevator(400);
    elevator.boardLoad(load1);
    elevator.boardLoad(load2);
    expect(elevator.calculateLoadWeight()).toEqual(load1.weight + load2.weight);
  });

  it('should throw a RangeError when the total load weight exceeds the elevator capacity', () => {
    expect(() => {
      const load1 = new Load(200);
      const load2 = new Load(201);
      const elevator = new Elevator(400);
      elevator.boardLoad(load1);
      elevator.boardLoad(load2);
    }).toThrow(RangeError);
  });
});
