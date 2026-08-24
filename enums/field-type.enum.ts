/**
 * @deprecated The mega `FieldDto` was split into one concrete DTO per field type.
 * New code should use the string-literal `type` discriminator on each concrete DTO
 * (e.g. `TextFieldDto`, `NumberFieldDto`) rather than referencing this enum.
 *
 * Kept for one release for backward compatibility; will be removed once consumer
 * migration (hoster-ai/api issue #449) lands.
 */
export enum FieldTypeEnum {
  BOOLEAN = 'BOOLEAN',
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  NUMBER = 'NUMBER',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  URL = 'URL',
  COUNTRIES = 'COUNTRIES',
  CURRENCY = 'CURRENCY',
  DATE = 'DATE',
  PASSWORD = 'PASSWORD',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
}
