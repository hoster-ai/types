# ProductCreateRequestDto

**Description:** Represents a request to create a new product item. This DTO contains all the necessary information for the creation process.

**Source:** `dtos/product/requests/product-create-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsObject, ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { Type } from 'class-transformer';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to create a new product item.
 * This DTO contains all the necessary information for the creation process.
 */
export class ProductCreateRequestDto {
  /**
   * The client's data.
   * This object holds all the relevant information about the client initiating the request.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ClientDataDto)
  @JSONSchema({
    title: 'Client Data',
    description: 'The client\'s data for the request.',
    $ref: '#/components/schemas/ClientDataDto',
  })
  clientData!: ClientDataDto;

  /**
   * The data for the new product item to be created.
   * This object contains the specific details of the product instance being provisioned.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductItemDataDto)
  @JSONSchema({
    title: 'Item Data',
    description: 'The data for the new product item to be created.',
    $ref: '#/components/schemas/ProductItemDataDto',
  })
  itemData!: ProductItemDataDto;
}
```

