import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import {
  IsEnum,
  IsISO8601,
  Matches,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to renew a product.
 * It confirms the status of the renewal operation.
 */
export class ProductRenewResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the renewal.
   */
  @IsEnum(ResponseStatusEnum)
  @JSONSchema({
    title: 'Status',
    description:
      'The status of the response, indicating the outcome of the renewal.',
    $ref: '#/components/schemas/ResponseStatusEnum',
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was renewed.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item that was renewed.',
    type: 'string',
  })
  itemId?: string;

  /**
   * The outbox action identifier, echoed verbatim from the `X-Idempotency-Key`
   * header sent by the core. Used for correlation and anti-replay when the
   * action completes synchronously or later via a pending hook.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Outbox ID',
    description:
      'The outbox action identifier, echoed verbatim from the X-Idempotency-Key header sent by the core, used for correlation and anti-replay.',
    type: 'string',
  })
  outboxId!: string;

  /**
   * The item's expiry date at the provider after the renewal, as an RFC 3339 date or date-time with a time zone.
   * Only read on a SUCCESS: when present the core stores it as the item's end date, when absent
   * the core computes the end date from the item's duration.
   * @optional
   */
  @IsOptional()
  // strict: απορρίπτει ημερομηνίες που δεν υπάρχουν (π.χ. 31 Φεβρουαρίου)
  @IsISO8601({ strict: true })
  // Μόνο RFC 3339 (ημερομηνία ή date-time με ζώνη): οι υπόλοιπες ISO μορφές δεν διαβάζονται σωστά ως Date
  @Matches(
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,9})?(Z|[+-]\d{2}:\d{2}))?$/,
    {
      message:
        'endDate must be an RFC 3339 date (YYYY-MM-DD) or date-time with a time zone',
    },
  )
  // Function form replaces the `oneOf [date, date-time]` that @IsISO8601
  // emits; `anyOf` because without format checks both branches match.
  @JSONSchema(() => ({
    title: 'End Date',
    description:
      "The item's expiry date at the provider, as an RFC 3339 date or date-time with a time zone. Read only on a success; when absent the core computes it from the item's duration.",
    anyOf: [
      { type: 'string', format: 'date' },
      { type: 'string', format: 'date-time' },
    ],
  }))
  endDate?: string;

  /**
   * Optional data associated with the renewal response.
   * @optional
   */
  @IsOptional()
  @IsObject()
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the renewal response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
