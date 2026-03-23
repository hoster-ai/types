import { IsDefined, IsEnum } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { InvoiceItemActionsEnum } from '../../enums/invoice/invoice-item-actions.enum';
import { ItemDataDto } from '../item-data.dto';

/**
 * Order product item data sent to invoice integrations.
 * Uses invoice-specific actions to avoid confusion with product integration actions.
 */
export class InvoiceItemDataDto extends ItemDataDto {
  /** Invoice-specific action type for this item */
  @IsDefined()
  @IsEnum(InvoiceItemActionsEnum)
  @JSONSchema({
    title: 'Action',
    description: 'Invoice-specific action type for this item.',
    type: 'string',
    enum: Object.values(InvoiceItemActionsEnum),
  })
  action!: InvoiceItemActionsEnum;
}
