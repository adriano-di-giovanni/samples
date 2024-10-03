import { KILOGRAM_TO_POUND, POUND_TO_KILOGRAM } from './constants';
import { WeightUnit } from './weight-unit.enum';

export class Weight {
  private static readonly Epsilon = 1e-5;
  constructor(
    private readonly value: number,
    private readonly unit: WeightUnit
  ) {
    if (value < 0) {
      throw new RangeError('Weight must be greater than or equal to 0');
    }
  }

  add(other: Weight): Weight {
    const convertedOther = other.convertTo(this.unit);
    return new Weight(this.value + convertedOther.value, this.unit);
  }

  compareTo(other: Weight): number {
    const convertedOther = other.convertTo(this.unit);
    const difference = this.value - convertedOther.value;
    return Math.abs(difference) < Weight.Epsilon ? 0 : Math.sign(difference);
  }

  convertTo(unit: WeightUnit): Weight {
    if (unit === this.unit) {
      return this;
    }
    const coefficient =
      this.unit === WeightUnit.Kilogram ? KILOGRAM_TO_POUND : POUND_TO_KILOGRAM;
    const newValue = this.value * coefficient;
    return new Weight(newValue, unit);
  }

  equals(other: Weight): boolean {
    const convertedOther = other.convertTo(this.unit);
    return Math.abs(this.value - convertedOther.value) < Weight.Epsilon;
  }

  isGreaterThan(other: Weight): boolean {
    return this.compareTo(other) > 0;
  }

  zero(): Weight {
    return new Weight(0, this.unit);
  }
}
