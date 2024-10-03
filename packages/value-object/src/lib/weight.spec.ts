import { KILOGRAM_TO_POUND, POUND_TO_KILOGRAM } from './constants';
import { Weight } from './weight';
import { WeightUnit } from './weight-unit.enum';

describe.each([
  [WeightUnit.Kilogram, WeightUnit.Pound, KILOGRAM_TO_POUND],
  [WeightUnit.Pound, WeightUnit.Kilogram, POUND_TO_KILOGRAM],
])(Weight.name, (unit, otherUnit, conversionFactor) => {
  it('should throw a RangeError when attempting to create a weight with negative value', () => {
    expect(() => new Weight(-1, unit)).toThrow(RangeError);
  });

  it.each([0, 50])(
    'should successfully create a weight with a valid value',
    () => {
      const weight = new Weight(50, unit);
      expect(weight).toBeDefined();
    }
  );

  describe(Weight.prototype.add.name, () => {
    it('should add a weight with the same unit', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(2, unit);
      const actualWeight = weight1.add(weight2);
      const expectedWeight = new Weight(3, unit);
      expect(actualWeight.equals(expectedWeight)).toBe(true);
    });

    it('should add a weight with a different unit', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(1 * conversionFactor, otherUnit);
      const actualWeight = weight1.add(weight2);
      const expectedWeight = new Weight(2, unit);
      expect(actualWeight.equals(expectedWeight)).toBe(true);
    });
  });

  describe(Weight.prototype.compareTo.name, () => {
    it('should return 0 when comparing to itself', () => {
      const weight = new Weight(50, unit);
      expect(weight.compareTo(weight)).toBe(0);
    });

    it(
      'should return 0' +
        ' when comparing to another weight with the same value and unit',
      () => {
        const weight1 = new Weight(50, unit);
        const weight2 = new Weight(50, unit);
        expect(weight1.compareTo(weight2)).toBe(0);
      }
    );

    it(
      'should return 0' +
        ' when comparing to another weight with the same value but different unit',
      () => {
        const weight1 = new Weight(1, unit);
        const weight2 = new Weight(1 * conversionFactor, otherUnit);
        expect(weight1.compareTo(weight2)).toBe(0);
      }
    );

    it('should return -1 when comparing to a weight with a greater value', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(2, unit);
      expect(weight1.compareTo(weight2)).toBe(-1);
    });

    it('should return 1 when comparing to a weight with a lesser value', () => {
      const weight1 = new Weight(2, unit);
      const weight2 = new Weight(1, unit);
      expect(weight1.compareTo(weight2)).toBe(1);
    });

    it(
      'should return -1' +
        ' when comparing to a weight with a greater value in a different unit',
      () => {
        const weight1 = new Weight(1, unit);
        const weight2 = new Weight(2 * conversionFactor, otherUnit);
        expect(weight1.compareTo(weight2)).toBe(-1);
      }
    );

    it(
      'should return 1' +
        ' when comparing to a weight with a lesser value in a different unit',
      () => {
        const weight1 = new Weight(2 * conversionFactor, otherUnit);
        const weight2 = new Weight(1, unit);
        expect(weight1.compareTo(weight2)).toBe(1);
      }
    );
  });

  describe(Weight.prototype.convertTo.name, () => {
    it('should convert weight to the same unit', () => {
      const weight = new Weight(50, unit);
      const convertedWeight = weight.convertTo(unit);
      expect(weight.equals(convertedWeight)).toBe(true);
    });

    it('should convert between units', () => {
      const weight = new Weight(1, unit);
      const convertedWeight = weight.convertTo(otherUnit);
      const expectedWeight = new Weight(1 * conversionFactor, otherUnit);
      expect(convertedWeight.equals(expectedWeight)).toBe(true);
    });
  });

  describe(Weight.prototype.equals.name, () => {
    it('should equal itself', () => {
      const weight = new Weight(1, unit);
      expect(weight.equals(weight)).toBe(true);
    });

    it('should equal another weight with the same value and unit', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(1, unit);
      expect(weight1.equals(weight2)).toBe(true);
    });

    it('should equal another weight with the same value but different unit', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(1 * conversionFactor, otherUnit);
      expect(weight1.equals(weight2)).toBe(true);
    });

    it('should not equal another weight with the same unit but different value', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(2, unit);
      expect(weight1.equals(weight2)).toBe(false);
    });

    it('should not equal another weight with the same value but different unit', () => {
      const weight1 = new Weight(1, unit);
      const weight2 = new Weight(1, otherUnit);
      expect(weight1.equals(weight2)).toBe(false);
    });
  });
});
