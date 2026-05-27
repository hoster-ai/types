import { IsDefined, IsObject } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { AnyFieldDto } from './fields/any-field.dto';

/**
 * Fields defined by the seller for a product, requested during checkout setup.
 * These fields contain information relevant only to the seller, not to the integration.
 *
 * Wraps a concrete field DTO under the nested `field` property — validate the
 * union separately (see `validateAddonFieldDto`).
 */
export class AddonFieldDto {
  @IsObject()
  @IsDefined()
  @JSONSchema({
    title: 'Field',
    description:
      'The concrete field DTO (discriminated by its `type` literal).',
    $ref: '#/components/schemas/AnyFieldDto',
  })
  field!: AnyFieldDto;
}
