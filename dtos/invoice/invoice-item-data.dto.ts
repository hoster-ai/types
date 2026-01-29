import { IsDefined, IsEnum } from "class-validator";
import { InvoiceItemActionsEnum } from "../../enums/invoice/invoice-item-actions.enum";
import { ItemDataDto } from "../item-data.dto";

export class InvoiceItemDataDto extends ItemDataDto {
  @IsDefined()
  @IsEnum(InvoiceItemActionsEnum)
  action!: InvoiceItemActionsEnum;
}