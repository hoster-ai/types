# ItemDataDto

**Description:** Represents the data of a specific product item. This DTO is used to transfer detailed information about a product instance.

**Source:** `dtos/item-data.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the data of a specific product item.
 * This DTO is used to transfer detailed information about a product instance.
 */
export class ItemDataDto {
  /**
   * The unique identifier for the product item.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier for the product item.',
    type: 'string',
  })
  itemId?: string;

  /** Unique identifier for the product */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Product ID',
    description: 'Unique identifier for the product.',
    type: 'string',
  })
  productId!: string;

  /** Name of the product */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Product Name',
    description: 'Name of the product.',
    type: 'string',
  })
  productName!: string;

  /** Resource name associated with the product */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Resource Name',
    description: 'Resource name associated with the product.',
    type: 'string',
  })
  resourceName!: string;

  /**
   * A record of product-level attributes.
   * These are general attributes defined for the product type.
   */
  @IsDefined()
  @JSONSchema({
    title: 'Product Attributes',
    description: 'Product-level attributes defined for the product type.',
    type: 'object',
    additionalProperties: true,
  })
  productAttributes!: Record<string, unknown>;

  /**
   * A record of item-specific attributes.
   * These are attributes that are unique to this particular instance of the product.
   */
  @IsDefined()
  @JSONSchema({
    title: 'Item Attributes',
    description: 'Item-specific attributes unique to this product instance.',
    type: 'object',
    additionalProperties: true,
  })
  itemAttributes!: Record<string, unknown>;

  /**
   * Data returned from the creation response.
   * This field should not be present in the create request.
   * @optional
   */
  @IsOptional()
  @JSONSchema({
    title: 'Creation Response Data',
    description: 'Data returned from the creation response.',
    type: 'object',
    additionalProperties: true,
  })
  creationResponseData?: Record<string, unknown>;

  /** Start date of the product item */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Start Date',
    description: 'Start date of the product item.',
    type: 'string',
  })
  startDate!: string;

  /** End date of the product item */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'End Date',
    description: 'End date of the product item.',
    type: 'string',
  })
  endDate!: string;

  /**
   * The price of the product item without tax and discount.
   */
  @IsOptional()
  @IsNumber()
  @JSONSchema({
    title: 'Price',
    description: 'The price of the product item without tax and discount.',
    type: 'number',
  })
  price?: number;

  /**
   * The discount of the product item. The price after removing the discount
   */
  @IsOptional()
  @IsNumber()
  @JSONSchema({
    title: 'Discount Price',
    description: 'The price after removing the discount.',
    type: 'number',
  })
  discountPrice?: number;
}
```

