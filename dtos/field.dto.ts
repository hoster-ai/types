import { AnyFieldDto } from './fields/any-field.dto';

/**
 * @deprecated Use a concrete field DTO (`TextFieldDto`, `NumberFieldDto`, ...)
 * or the `AnyFieldDto` union directly. This alias is kept for one release while
 * downstream consumers migrate (hoster-ai/api issue #449).
 */
export type FieldDto = AnyFieldDto;
