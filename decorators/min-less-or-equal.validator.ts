import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MinLessOrEqualMax', async: false })
class MinLessOrEqualMaxConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;
    const input = args.constraints[0] as [string, string] | [string, string][];

    const pairs: [string, string][] = Array.isArray(input) && typeof (input as any)[0] === 'string'
      ? [input as [string, string]]
      : (input as [string, string][]);

    return pairs.every(([minKey, maxKey]) => {
      const minVal = object[minKey];
      const maxVal = object[maxKey];

      // If one or both are missing, do not fail here; let AllOrNone or other validators handle presence
      if (minVal === undefined || minVal === null) return true;
      if (maxVal === undefined || maxVal === null) return true;

      if (typeof minVal !== 'number' || typeof maxVal !== 'number') return true; // Type guards handled elsewhere

      return minVal <= maxVal;
    });
  }

  defaultMessage(args: ValidationArguments) {
    const input = args.constraints[0] as [string, string] | [string, string][];
    const pairs: [string, string][] = Array.isArray(input) && typeof (input as any)[0] === 'string'
      ? [input as [string, string]]
      : (input as [string, string][]);

    if (pairs.length === 1) {
      const [minKey, maxKey] = pairs[0];
      return `${minKey} must be less than or equal to ${maxKey}`;
    }

    const list = pairs.map(([a, b]) => `${a}<=${b}`).join(', ');
    return `The following constraints must hold: ${list}`;
  }
}

export function MinLessOrEqualMaxProperty(
  keysOrPairs: [string, string] | [string, string][],
  validationOptions?: ValidationOptions,
) {
  return function (constructor: Function) {
    registerDecorator({
      name: 'MinLessOrEqualMax',
      target: constructor,
      propertyName: '',
      options: validationOptions,
      constraints: [keysOrPairs],
      validator: MinLessOrEqualMaxConstraint,
    });
  };
}
