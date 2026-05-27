import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Walk a dotted path (`'a.b.c'`) into an object. Returns undefined if any segment is missing
 * or if a non-object is encountered before the leaf.
 */
function readPath(obj: unknown, path: string): unknown {
  let current: unknown = obj;
  for (const segment of path.split('.')) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

@ValidatorConstraint({ async: false })
export class UniqueFieldInArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any[], args: ValidationArguments) {
    if (!Array.isArray(value)) return true; // Let @IsArray handle wrong type
    const path = args.constraints[0] as string;
    const seen = new Set();
    for (const obj of value) {
      const fieldValue = readPath(obj, path);
      if (fieldValue !== undefined) {
        if (seen.has(fieldValue)) {
          return false;
        }
        seen.add(fieldValue);
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const field = args.constraints[0];
    return `All objects in ${args.property} must have a unique "${field}" value`;
  }
}

export function UniqueFieldInArray(
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [field],
      validator: UniqueFieldInArrayConstraint,
    });
  };
}
