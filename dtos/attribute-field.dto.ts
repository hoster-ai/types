import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { AnyFieldDto } from './fields/any-field.dto';
import { AllOrNoneProperty } from '../decorators/all-or-none.validator';
import { MinLessOrEqualMaxProperty } from '../decorators/min-less-or-equal.validator';

/**
 * Wraps a concrete field DTO with product-attribute-specific options.
 *
 * The underlying field lives under the nested `field` property — its concrete
 * class is discriminated by `field.type` and must be validated separately
 * (see `validateAttributeFieldDto`).
 */
@AllOrNoneProperty(['repeatableMin', 'repeatableMax'])
@MinLessOrEqualMaxProperty(['repeatableMin', 'repeatableMax'])
export class AttributeFieldDto {
  /**
   * The concrete field DTO (one of `AnyFieldDto`). Validated separately by
   * the dispatcher in `validateAttributeFieldDto` since it is a discriminated union.
   */
  @IsObject()
  @IsDefined()
  @JSONSchema({
    title: 'Field',
    description:
      'The concrete field DTO (discriminated by its `type` literal).',
    $ref: '#/components/schemas/AnyFieldDto',
  })
  field!: AnyFieldDto;

  /**
   * Indicates if the field is visible in orders.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Visible In Order',
    description: 'Whether the field is visible in order view.',
    type: 'boolean',
  })
  visibleInOrder?: boolean;

  /**
   * Indicates if the field is visible in client panel.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Visible In Client Panel',
    description: 'Whether the field is visible in the client panel.',
    type: 'boolean',
  })
  visibleInClientPanel?: boolean;

  /**
   * Minimum repeats for repeatable fields.
   */
  @IsOptional()
  @IsNumber()
  @JSONSchema({
    title: 'Repeatable Min',
    description: 'Minimum repeats for repeatable fields.',
    type: 'number',
  })
  repeatableMin?: number;

  /**
   * Maximum repeats for repeatable fields.
   */
  @IsOptional()
  @IsNumber()
  @JSONSchema({
    title: 'Repeatable Max',
    description: 'Maximum repeats for repeatable fields.',
    type: 'number',
  })
  repeatableMax?: number;
}
