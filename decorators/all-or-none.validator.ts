import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AllOrNone', async: false })
class AllOrNoneConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;
    const input = args.constraints[0] as [string, string] | [string, string][] | string[] | string[][];

    // Normalize to an array of groups, each group being string[] (length >= 2 preferred)
    let groups: string[][] = [];
    if (Array.isArray(input)) {
      if (input.length > 0 && typeof (input as any)[0] === 'string') {
        // Single group given as string[] (could be pair or more than 2)
        groups = [input as string[]];
      } else {
        // Array of groups (pairs or larger)
        groups = (input as any[]).map((g) => g as string[]);
      }
    }

    const has = (k: string) => object[k] !== undefined && object[k] !== null;

    return groups.every((group) => {
      if (!Array.isArray(group) || group.length < 2) return true; // Ignore invalid/misconfigured groups
      const statuses = group.map((k) => has(k));
      const allPresent = statuses.every(Boolean);
      const allAbsent = statuses.every((v) => !v);
      return allPresent || allAbsent;
    });
  }

  defaultMessage(args: ValidationArguments) {
    const input = args.constraints[0] as [string, string] | [string, string][] | string[] | string[][];
    let groups: string[][] = [];
    if (Array.isArray(input)) {
      if (input.length > 0 && typeof (input as any)[0] === 'string') {
        groups = [input as string[]];
      } else {
        groups = (input as any[]).map((g) => g as string[]);
      }
    }

    if (groups.length === 1) {
      const g = groups[0];
      const list = g.join(', ');
      return `All of (${list}) must be provided together or omitted together`;
    }

    const list = groups.map((g) => `(${g.join('/')})`).join(', ');
    return `Each group must be provided together or omitted together: ${list}`;
  }
}

export function AllOrNoneProperty(
  keysOrGroups: [string, string] | [string, string][] | string[] | string[][],
  validationOptions?: ValidationOptions,
) {
  return function (constructor: Function) {
    registerDecorator({
      name: 'AllOrNone',
      target: constructor,
      propertyName: '',
      options: validationOptions,
      constraints: [keysOrGroups],
      validator: AllOrNoneConstraint,
    });
  };
}
