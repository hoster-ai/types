import { ValidatorOptions } from 'class-validator';

/**
 * Options every validator in this package passes to class-validator.
 *
 * `whitelist` + `forbidNonWhitelisted` turn any property that has no
 * validation decorator into a `whitelistValidation` error, at every nested
 * level that is validated (`@ValidateNested`). Without them undeclared keys
 * pass silently and end up stored by consumers.
 */
export const STRICT_VALIDATION_OPTIONS: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
};
