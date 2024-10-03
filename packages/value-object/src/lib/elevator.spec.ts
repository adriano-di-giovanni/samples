import { Elevator } from './elevator';
import { Load } from './load';
import { Weight } from './weight';
import { WeightUnit } from './weight-unit.enum';

describe(Elevator.name, () => {
  it('should successfully create an elevator with a valid capacity', () => {
    const capacity = new Weight(400, WeightUnit.Kilogram);
    const elevator = new Elevator(capacity);
    expect(elevator).toBeDefined();
    expect(elevator.capacity.equals(capacity)).toBe(true);
  });

  it('should initialize with a load weight of 0', () => {
    const elevator = new Elevator(new Weight(400, WeightUnit.Kilogram));
    expect(elevator.calculateLoadWeight()).toEqual(
      new Weight(0, WeightUnit.Kilogram)
    );
  });

  it('should correctly calculate the load weight after a single load is boarded', () => {
    const elevator = new Elevator(new Weight(400, WeightUnit.Kilogram));
    const load = new Load(new Weight(50, WeightUnit.Kilogram));
    elevator.boardLoad(load);
    expect(elevator.calculateLoadWeight()).toEqual(load.weight);
  });

  it('should correctly calculate the load weight after multiple loads are boarded', () => {
    const load1 = new Load(new Weight(50, WeightUnit.Kilogram));
    const load2 = new Load(new Weight(100, WeightUnit.Kilogram));
    const elevator = new Elevator(new Weight(400, WeightUnit.Kilogram));
    elevator.boardLoad(load1);
    elevator.boardLoad(load2);
    expect(elevator.calculateLoadWeight()).toEqual(
      load1.weight.add(load2.weight)
    );
  });

  it('should throw a RangeError when the total load weight exceeds the elevator capacity', () => {
    expect(() => {
      const load1 = new Load(new Weight(200, WeightUnit.Kilogram));
      const load2 = new Load(new Weight(201, WeightUnit.Kilogram));
      const elevator = new Elevator(new Weight(400, WeightUnit.Kilogram));
      elevator.boardLoad(load1);
      elevator.boardLoad(load2);
    }).toThrow(RangeError);
  });
});
