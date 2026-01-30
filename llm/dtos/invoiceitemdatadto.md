# InvoiceItemDataDto

**Description:** Order product item data sent to invoice integrations. Uses invoice-specific actions to avoid confusion with product integration actions.

**Source:** `dtos/invoice/invoice-item-data.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsEnum } from "class-validator";
import { InvoiceItemActionsEnum } from "../../enums/invoice/invoice-item-actions.enum";
import { ItemDataDto } from "../item-data.dto";

/**
 * Order product item data sent to invoice integrations.
 * Uses invoice-specific actions to avoid confusion with product integration actions.
 */
export class InvoiceItemDataDto extends ItemDataDto {
  /** Invoice-specific action type for this item */
  @IsDefined()
  @IsEnum(InvoiceItemActionsEnum)
  action!: InvoiceItemActionsEnum;
}
```

